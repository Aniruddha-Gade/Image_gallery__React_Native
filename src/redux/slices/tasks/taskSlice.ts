import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadTasks, syncPendingTasks } from './taskThunks';
import { SYNC_STATUS, Task } from '../../../screens/task-list/types/type';

interface TasksState {
  list: Task[];
  loading: boolean;
  syncing: boolean;
  lastSync?: string | null;
  error?: string | null;
}

const initialState: TasksState = {
  list: [],
  loading: false,
  syncing: false,
  lastSync: null,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // add local task (offline-first)
    addTaskLocal: (state, action: PayloadAction<Task>) => {
      state.list.unshift(action.payload);
    },

    // edit local task (mark pending)
    editTaskLocal: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Task> }>,
    ) => {
      const idx = state.list.findIndex(t => t.id === action.payload?.id);
      if (idx >= 0) {
        const current = state.list?.[idx];
        const updated = action.payload?.updates;

        state.list[idx] = {
          ...current,
          ...updated,
          updatedAt: updated?.updatedAt ?? new Date().toISOString(),
          syncStatus: SYNC_STATUS.PENDING,
        } as Task;
      }
    },

    // mark as deleted (soft delete)
    deleteTaskLocal: (state, action: PayloadAction<string>) => {
      const idx = state.list?.findIndex(t => t?.id === action.payload);
      if (idx >= 0) {
        state.list[idx].syncStatus = SYNC_STATUS.DELETED;
        state.list[idx].updatedAt = new Date().toISOString();
      }
    },

    // remove fully (used after successful remote delete)
    removeTaskById: (state, action: PayloadAction<string>) => {
      state.list = state.list?.filter(t => t?.id !== action.payload);
    },

    // mark task as synced and set remoteId if provided
    
});

export const {
  addTaskLocal,
  editTaskLocal,
  deleteTaskLocal,
  removeTaskById,
} = tasksSlice.actions;

export default tasksSlice.reducer;
