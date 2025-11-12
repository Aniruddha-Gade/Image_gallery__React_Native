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
  },
});

export const { addTaskLocal } = tasksSlice.actions;

export default tasksSlice.reducer;
