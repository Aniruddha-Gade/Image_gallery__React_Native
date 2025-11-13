import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasks/taskSlice';
import { saveTasksToStorage } from '../screens/task-list/utils/storage';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

let saveTimeout: any = null;

store.subscribe(() => {
  const state = store.getState();
  // debounce save
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    saveTasksToStorage(state.tasks?.list).catch(err => {
      console.log('Error saving tasks to storage ', err);
    });
  }, 800);
});

// export const startStorageSync = () => {
//   let saveTimeout: any = null;
//   store.subscribe(() => {
//     const state = store.getState();
//     if (saveTimeout) clearTimeout(saveTimeout);
//     saveTimeout = setTimeout(() => {
//       saveTasksToStorage(state.tasks.list).catch(() => {});
//     }, 800);
//   });
// };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// by react-persist logic
// const rootReducer = combineReducers({
//   tasks: taskReducer,
// });

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   whitelist: ['tasks'],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);
// export const store = configureStore({ reducer: persistedReducer });
// export const persistor = persistStore(store);
