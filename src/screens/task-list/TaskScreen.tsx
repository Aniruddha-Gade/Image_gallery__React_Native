import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Color from '../../assets/Color';

const TaskScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text>TaskScreen</Text>
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
});
