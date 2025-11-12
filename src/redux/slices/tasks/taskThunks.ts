import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  clearTasksFromStorage,
  loadTasksFromStorage,
  saveTasksToStorage,
} from '../../../screens/task-list/utils/storage';
import { pushTaskToRemote } from '../../../screens/task-list/api/service/syncService';
import { SYNC_STATUS, Task } from '../../../screens/task-list/types/type';
import { isArrayLength } from '../../../utils/Validations';
import { ToastAlert } from '../../../utils/helperFunctions/CustomToast';
import { LABEL } from '../../../constant/constant';
import { clearAllTasks } from './taskSlice';

export const loadTasks = createAsyncThunk<Task[]>('tasks/load', async () => {
  const local = await loadTasksFromStorage();
  return local;
});

export const syncPendingTasks = createAsyncThunk<Task[], void, { state: any }>(
  'tasks/syncPending',
  async (_, { getState }) => {
    const state = getState();
    let local: Task[] = state.tasks?.list ?? [];

    // console.log('syncPendingTasks local', local);

    // if there are no tasks from redux store, then load from storage.
    // If there are no tasks, just return local (don't override)
    if (!isArrayLength(local)) {
      // console.log('No tasks from redux store');

      const stored = await loadTasksFromStorage();
      if (isArrayLength(stored)) {
        local = stored;
      } else {
        // console.log('No tasks anywhere, skipping sync');
        return [];
      }
    }

    // If there are no pending tasks, no need to sync
    const hasPending = local?.some(t => t?.syncStatus === SYNC_STATUS.PENDING);
    if (!hasPending) {
      // console.log('No tasks anywhere, skipping sync');
      ToastAlert({ type: 'success', message: LABEL.NO_PENDING_TASKS_TO_SYNC });
      return local;
    }

    const working = [...local];
    let updated = false;

    // Push pending tasks
    for (let i = 0; i < working.length; i++) {
      const t = working[i];
      if (t.syncStatus === SYNC_STATUS.PENDING) {
        try {
          const remoteId = await pushTaskToRemote(t);
          // mark synced and store remoteId
          working[i] = {
            ...t,
            syncStatus: SYNC_STATUS.SYNCED,
            remoteId: remoteId ?? t.remoteId ?? null,
            updatedAt: new Date().toISOString(),
          };
          updated = true;
        } catch (e) {
          // push failed, keep pending
          console.warn('push failed for', t.id);
        }
      }
    }

    // Handle deleted items
    // We will attempt to delete remote (if remoteId) then remove from working list.

    // Persist final list
    // Save only if something changed
    if (updated) {
      await saveTasksToStorage(working);
      // console.log('Pending tasks synced & saved.');
      return working;
    }

    // else return original state, don’t wipe anything
    return local;
  },
);

// Clear all tasks from redux and async storage
export const clearAllTasksThunk = createAsyncThunk(
  'tasks/clearAll',
  async (_, { dispatch }) => {
    // Clear Redux and async storage
    dispatch(clearAllTasks());
    await clearTasksFromStorage();
  },
);
