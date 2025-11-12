import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Color from '../../assets/Color';

type Props = {
  label: string;
  value: string | number | React.ReactElement;
};

function RowItem({ label, value }: Readonly<Props>) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label ?? '-'}</Text>
      <Text style={styles.value}>{value ?? '-'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  label: {
    color: Color.white,
    fontSize: 12,
    width: '50%',
  },
  value: {
    color: Color.white_1,
    fontSize: 12,
    width: '50%',
  },
});

export default RowItem;
