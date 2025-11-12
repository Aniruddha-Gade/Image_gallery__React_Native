import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SYNC_STATUS } from '../types/type';

type Props = {
  status: SYNC_STATUS;
};

const STATUS_COLORS = {
  [SYNC_STATUS.SYNCED]: '#52c41a', // Green
  [SYNC_STATUS.PENDING]: '#fa8c16', // Orange
  [SYNC_STATUS.DELETED]: '#ff4d4f', // Red
};

export default function StatusBadge({ status }: Props) {
  return (
    <View style={[styles.badge, { backgroundColor: STATUS_COLORS[status] }]}>
      <Text style={styles.text}>{status.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
  },
  text: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
});
