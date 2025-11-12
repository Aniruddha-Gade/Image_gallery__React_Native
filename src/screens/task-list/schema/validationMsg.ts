export const ERR = {
  name: {
    required: 'Task name is required',
    min: 'Task name must be at least 3 characters long',
    max: 'Task name can be up to 50 characters',
  },
  description: {
    required: 'Description is required',
    max: 'Description can be up to 200 characters',
    min: 'Description must be at least 3 characters long',
  },
  status: {
    required: 'Completion status is required',
  },
  date: {
    required: 'Date is required',
    type: 'Please select a valid date',
  },
};
