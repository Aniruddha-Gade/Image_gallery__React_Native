import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/type';
import { TASKS_KEY } from '../constant/constant';

// Save full task list
export const saveTasksToStorage = async (tasks: Task[]) => {
  try {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks ?? []));
  } catch (e) {
    console.warn('saveTasksToStorage error', e);
    throw e;
  }
};

// Load full task list
export const loadTasksFromStorage = async (): Promise<Task[]> => {
  try {
    const raw = await AsyncStorage.getItem(TASKS_KEY);
    return raw ? (JSON.parse(raw) as Task[]) : [];
  } catch (e) {
    console.warn('loadTasksFromStorage error', e);
    return [];
  }
};
