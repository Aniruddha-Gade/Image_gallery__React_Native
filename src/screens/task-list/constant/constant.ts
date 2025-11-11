import { Task } from "../types/type";

export const LABEL = {
  ADD_TASK: 'Add Task',
  TASK_LIST: 'Task List',
  NO_DATA: 'No task found \n Please add task',
  TASK_TITLE: 'Task Name',
  ENTER_TASK_TITLE: 'Enter task name',
  TASK_DESCRIPTION: 'Description',
  ENTER_TASK_DESCRIPTION: 'Enter task description',
  TASK_STATUS: 'Completion Status',
  SUBMIT: 'Add Task',
};

export const ADD_TASK_INIT_VALUES: Task = {
  title: '',
  description: '',
  status: false,
  date: new Date(),
};
