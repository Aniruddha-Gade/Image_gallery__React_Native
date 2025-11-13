import { View, Modal, ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';
import Color from '../../assets/Color';

function ScreenLoader({ loader }: { loader: boolean }) {
  return (
    <Modal transparent visible={loader} animationType="fade">
      <View style={styles.container}>
        <ActivityIndicator color={Color.primary} size="large" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.light_grey_2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ScreenLoader;
