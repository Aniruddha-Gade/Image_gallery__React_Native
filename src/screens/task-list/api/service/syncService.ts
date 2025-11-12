import axios from 'axios';
import { Task } from '../../types/type';
import { removeEmptyKeys } from '../../../../utils/helperFunctions/functions';

// Todo: add this URL in env file
const API_BASE = 'https://jsonplaceholder.typicode.com/todos';

export const pushTaskToRemote = async (task: Task): Promise<number | null> => {
  try {
    const body = {
      title: task?.title,
      completed: task?.completed,
      userId: task?.id,
    };

    const cleanTask = removeEmptyKeys(body);

    const res = await axios.post(API_BASE, cleanTask, {
      headers: { 'Content-Type': 'application/json' },
    });

    console.log('pushTaskToRemote res', res);
    return res?.data?.id ?? null;
  } catch (e) {
    console.warn('pushTaskToRemote error', e);
    throw e;
  }
};

export const deleteRemoteTask = async (remoteId: number) => {
  try {
    const res = await axios.delete(`${API_BASE}/${remoteId}`, {
      headers: { 'Content-Type': 'application/json' },
    });

    return res ?? null;
  } catch (e) {
    console.warn('deleteRemoteTask error', e);
    throw e;
  }
};
