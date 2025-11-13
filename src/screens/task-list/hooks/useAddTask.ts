import { useForm } from 'react-hook-form';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { v4 as uuidv4 } from 'uuid';
import { SYNC_STATUS, Task } from '../types/type';
import {
  addTaskLocal,
  editTaskLocal,
  markTaskSynced,
} from '../../../redux/slices/tasks/taskSlice';
import { addTaskSchema } from '../schema/AddTaskSchema';
import { ADD_TASK_INIT_VALUES, LABEL } from '../constant/constant';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastAlert } from '../../../utils/helperFunctions/CustomToast';
import { removeEmptyKeys } from '../../../utils/helperFunctions/functions';
import useInternet from '../../../hooks/useInternet';
import { pushTaskToRemote } from '../api/service/syncService';

type FormValues = {
  title: string;
  description?: string;
  completed: boolean;
};

type Props = {
  closeModal: () => void;
  existingTask?: Task | null;
};

export default function useAddTask({
  closeModal,
  existingTask,
}: Readonly<Props>) {
  const dispatch = useDispatch<AppDispatch>();
  const { isInternet } = useInternet();
  const [loading, setLoading] = useState<boolean>(false);

  // const TASK_INIT_VALUES = useMemo(
  //   () => (existingTask ? existingTask : ADD_TASK_INIT_VALUES),
  //   [existingTask],
  // );

  const TASK_INIT_VALUES = useMemo(
    () => existingTask || ADD_TASK_INIT_VALUES,
    [existingTask],
  );

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<Task>({
    resolver: yupResolver(addTaskSchema),
    defaultValues: TASK_INIT_VALUES,
  });

  // handle add task
  const onSubmit = useCallback(
    async (data: FormValues) => {
      try {
        setLoading(true);
        const isEdit = !!existingTask;

        // ========================== EDIT TASK ==========================
        if (isEdit) {
          const updatedTask: Task = {
            ...existingTask,
            title: data?.title?.trim(),
            description: data?.description?.trim() ?? '',
            completed: data?.completed ?? false,
            updatedAt: new Date().toISOString(),
            syncStatus: SYNC_STATUS.PENDING, // mark as pending
          };

          const cleanedTask = removeEmptyKeys(updatedTask);
          dispatch(
            editTaskLocal({ id: existingTask.id, updates: cleanedTask }),
          );

          // Todo: It should call PUT API to update task
          // Sync task to remote if online
          if (isInternet) {
            const remoteId = await pushTaskToRemote(cleanedTask);

            dispatch(
              markTaskSynced({
                id: cleanedTask?.id,
                remoteId: remoteId ?? null,
              }),
            );
          }

          ToastAlert({ type: 'success', message: LABEL.UPDATE_TASK_SUCCESS });
        } else {
          // ========================== ADD NEW TASK ==========================
          const newTask: Task = {
            id: uuidv4(),
            title: data?.title?.trim(),
            description: data?.description?.trim() ?? '',
            completed: data?.completed ?? false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            syncStatus: SYNC_STATUS.PENDING,
            remoteId: null,
          };

          const cleanedTask = removeEmptyKeys(newTask);
          dispatch(addTaskLocal(cleanedTask));

          // Sync task to remote if online
          if (isInternet) {
            const remoteId = await pushTaskToRemote(cleanedTask);
            console.log('remoteId', remoteId);

            dispatch(
              markTaskSynced({
                id: cleanedTask?.id,
                remoteId: remoteId ?? null,
              }),
            );
          }
          ToastAlert({ type: 'success', message: LABEL.ADD_TASK_SUCCESS });
        }

        // Close modal and show success toast
        closeModal?.();
      } catch (error) {
        console.log(
          `Error while ${existingTask ? 'editing' : 'adding'} task`,
          error,
        );
      } finally {
        setLoading(false);
      }
    },
    [dispatch, closeModal, existingTask, isInternet],
  );

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
    loading,
  };
}
