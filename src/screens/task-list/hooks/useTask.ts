import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { AppDispatch, RootState } from '../../../app/store';
import {
  loadTasks,
  syncPendingTasks,
} from '../../../redux/slices/tasks/taskThunks';
import useInternet from '../../../hooks/useInternet';
import { notEmpty } from '../../../utils/Validations';

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

  return {
    tasks,
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
  };
}
