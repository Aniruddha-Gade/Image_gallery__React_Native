import { SYNC_STATUS, Task } from '../types/type';

export const LABEL = {
  ADD_TASK: 'Add Task',
  EDIT_TASK: 'Edit Task',
  TASK_LIST: 'Task List',
  NO_DATA: 'No task found \n Please add task',
  TASK_TITLE: 'Task Name',
  ENTER_TASK_TITLE: 'Enter task name',
  TASK_DESCRIPTION: 'Description',
  ENTER_TASK_DESCRIPTION: 'Enter task description',
  TASK_STATUS: 'Completion Status',
  SUBMIT: 'Add Task',
  UPDATE_TASK: 'Update Task',
  ADD_TASK_SUCCESS: 'Task added successfully',
  UPDATE_TASK_SUCCESS: 'Task updated successfully',
};

export const ADD_TASK_INIT_VALUES: Task = {
  title: '',
  description: '',
  status: false,
  completed: false,
  createdAt: '',
  updatedAt: '',
  syncStatus: SYNC_STATUS.PENDING,
  remoteId: null,
  id: '',
};

export const TASKS_KEY = 'MYAPP_TASKS_V1';
