import { StyleSheet, View } from 'react-native';
import React from 'react';
import Color from '../../assets/Color';
import TaskListing from './components/TaskListing';

const TaskScreen = () => {
  return (
    <View style={styles.container}>
      <TaskListing />
    </View>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.black,
  },
  addBtn: {
    position: 'absolute',
    right: 0,
    bottom: '1%',
  },
});
