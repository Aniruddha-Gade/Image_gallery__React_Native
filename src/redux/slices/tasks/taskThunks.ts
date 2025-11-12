import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  loadTasksFromStorage,
  saveTasksToStorage,
} from '../../../screens/task-list/utils/storage';
import {
  pushTaskToRemote,
} from '../../../screens/task-list/api/service/syncService';
import { SYNC_STATUS, Task } from '../../../screens/task-list/types/type';

export const loadTasks = createAsyncThunk<Task[]>('tasks/load', async () => {
  const local = await loadTasksFromStorage();
  return local;
});

export const syncPendingTasks = createAsyncThunk<Task[], void, { state: any }>(
  'tasks/syncPending',
  async (_, { getState }) => {
    const state = getState();
    const local: Task[] = state.tasks.list ?? [];

    const working = [...local];

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
        } catch (e) {
          // push failed, keep pending
          console.warn('push failed for', t.id);
        }
      }
    }

    // //  Handle deleted items
    // // We will attempt to delete remote (if remoteId) then remove from working list.

    // Persist final list
    await saveTasksToStorage(working);
    return working;
  },
);
