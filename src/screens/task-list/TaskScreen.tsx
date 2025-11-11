import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Color from '../../assets/Color';
import IconButton from '../../components/common/IconButton';
import useTask from './components/hooks/useTask';
import OverlayModal from '../../components/common/OverlayModal';
import { LABEL } from './constant/constant';
import AddTaskForm from './components/AddTaskForm';

const TaskScreen = () => {
  const { loading, tasks, isAddModalVisible, openAddModal, closeAddModal } =
    useTask();

  return (
    <ScrollView style={styles.container}>
      {/* Add Image Button */}
      <IconButton
        onPress={openAddModal}
        name="plus"
        icon="AntDesign"
        customStyles={styles.addBtn}
      />

      <OverlayModal
        title={LABEL.ADD_TASK}
        visibility={isAddModalVisible}
        onClose={closeAddModal}
        InnerContent={<AddTaskForm closeModal={closeAddModal} />}
      />
    </ScrollView>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.black,
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  addBtn: {
    position: 'absolute',
    right: 0,
    bottom: '1%',
  },
});
