import { useState } from 'react';
import { Task } from '../../types/type';

function useTask() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);

  const openAddModal = () => setIsAddModalVisible(true);
  const closeAddModal = () => setIsAddModalVisible(false);

  return {
    loading,
    tasks,
    isAddModalVisible,
    openAddModal,
    closeAddModal,
  };
}

export default useTask;
