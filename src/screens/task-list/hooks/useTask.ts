import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { AppDispatch, RootState } from '../../../redux/store';
import {
  clearAllTasksThunk,
  loadTasks,
  syncPendingTasks,
} from '../../../redux/slices/tasks/taskThunks';
import useInternet from '../../../hooks/useInternet';
import { notEmpty } from '../../../utils/Validations';
import { LABEL } from '../constant/constant';
import { removeTaskById } from '../../../redux/slices/tasks/taskSlice';
import { ToastAlert } from '../../../utils/helperFunctions/CustomToast';

const PAGE_SIZE = 10;

export default function useTask() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    list: tasks,
    loading,
    syncing,
  } = useSelector((s: RootState) => s.tasks);
  const { isInternet, offlineToast } = useInternet();

  const [refreshing, setRefreshing] = useState(false);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  // Load from storage on mount
  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

  // auto sync when back online
  useEffect(() => {
    const sub = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        dispatch(syncPendingTasks());
      }
    });
    return () => sub();
  }, [dispatch]);

  // Refresh handler
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(loadTasks());

    // try sync if online
    if (isInternet) {
      await dispatch(syncPendingTasks());
    }
    setRefreshing(false);
  }, [dispatch, isInternet]);

  // Manual sync button handler
  const syncNow = useCallback(async () => {
    if (!isInternet) {
      offlineToast();
      return;
    }
    await dispatch(syncPendingTasks());
  }, [dispatch, isInternet, offlineToast]);

  // Search + pagination
  const filtered = useMemo(() => {
    // if (!searchQuery?.trim()) return tasks;
    if (!notEmpty(searchQuery)) return tasks;
    const q = searchQuery?.toLowerCase();
    return tasks?.filter(t =>
      (t?.title + ' ' + (t?.description ?? ''))?.toLowerCase()?.includes?.(q),
    );
  }, [tasks, searchQuery]);

  const paginated = useMemo(() => {
    const start = 0;
    const end = page * PAGE_SIZE;
    return filtered.slice(start, end);
  }, [filtered, page]);

  // load more for infinite scroll
  const loadMore = useCallback(() => {
    if (paginated.length < filtered.length) {
      setPage(prev => prev + 1);
    }
  }, [paginated, filtered]);

  const resetPagination = useCallback(() => setPage(1), []);

  // modal controls
  const openAddModal = () => {
    setSelectedTask(null);
    setAddModalVisible(true);
  };

  const openEditModal = (task: any) => {
    setSelectedTask(task);
    setAddModalVisible(true);
  };

  const closeAddModal = () => {
    setSelectedTask(null);
    setAddModalVisible(false);
  };

  const handleClearAll = () => {
    Alert.alert(LABEL.CLEAR_ALL, LABEL.CLEAT_ALL_CONFIRMATION, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: LABEL.YES_CLEAR_ALL,
        style: 'destructive',
        onPress: () => dispatch(clearAllTasksThunk()),
      },
    ]);
  };

  // Delete Task
  const deleteTask = useCallback(
    (id: string) => {
      Alert.alert(LABEL.DELETE, LABEL.DELETE_CONFIRMATION, [
        { text: 'Cancel' },
        {
          text: 'OK',
          onPress: () => {
            dispatch(removeTaskById(id));
            ToastAlert({
              message: LABEL.TASK_DELETED,
              type: 'success',
            });
          },
        },
      ]);
    },
    [dispatch],
  );

  return {
    tasks: paginated,
    fullCount: filtered?.length,
    loading,
    syncing,
    refreshing,
    onRefresh,
    syncNow,
    searchQuery,
    setSearchQuery,
    loadMore,
    resetPagination,
    openAddModal,
    closeAddModal,
    isAddModalVisible,
    page,
    PAGE_SIZE,
    openEditModal,
    selectedTask,
    handleClearAll,
    deleteTask,
  };
}
