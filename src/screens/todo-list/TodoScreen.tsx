import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Color from '../../assets/Color';

const TodoScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text>TodoScreen</Text>
    </ScrollView>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.black,
    paddingHorizontal: 16,
    paddingTop: 50,
  },
});
