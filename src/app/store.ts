import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../redux/slices/tasks/taskSlice';
import { saveTasksToStorage } from '../screens/task-list/utils/storage';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

// let saveTimeout: any = null;

// store.subscribe(() => {
//   const state = store.getState();
//   // debounce writes to avoid excessive AsyncStorage calls
//   if (saveTimeout) clearTimeout(saveTimeout);
//   saveTimeout = setTimeout(() => {
//     saveTasksToStorage(state.tasks.list).catch(() => {});
//   }, 800);
// });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
