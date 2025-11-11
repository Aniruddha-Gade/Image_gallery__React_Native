import { useState } from 'react';
import { FieldValue, FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ADD_TASK_INIT_VALUES } from '../../constant/constant';
import { addTaskSchema } from '../../schema/AddTaskSchema';
import { Task } from '../../types/type';

type Props = {
  closeModal: () => void;
};

function useAddTask({ closeModal }: Readonly<Props>) {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<Task>({
    resolver: yupResolver(addTaskSchema),
    defaultValues: ADD_TASK_INIT_VALUES,
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      console.log('data ==== ', data);

      closeModal?.();
    } catch (error) {
      console.log('Error adding task:', error);
    } finally {
    }
  };

  return {
    onSubmit,
    control,
    errors,
    loading,
    handleSubmit,
  };
}

export default useAddTask;
