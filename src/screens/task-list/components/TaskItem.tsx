import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Task, SYNC_STATUS } from '../types/type';
import Color from '../../../assets/Color';
import StatusBadge from './StatusBadge';
import Typo from '../../../components/common/Typo';
import RowItem from '../../../components/common/RowItem';

type Props = {
  task: Task;
  // onToggle: (t: Task) => void;
  onEdit: (t: Task) => void;
  onDelete: (id: string) => void;
};

export default function TaskItem({ task, onEdit, onDelete }: Props) {
  return (
    <View style={styles.card}>
      {/* Completed Checkbox */}
      {/* <TouchableOpacity
        // onPress={() => onToggle(task)}
        style={styles.checkbox}
      >
        <Typo style={styles.checkboxText}>{task.completed ? '✅' : '⬜'}</Typo>
      </TouchableOpacity> */}

      {/* Content */}
      <TouchableOpacity style={styles.body} onPress={() => onEdit(task)}>
        <RowItem label="Title" value={task?.title ?? '-'} />
        <RowItem label="Description" value={task?.description ?? '-'} />
        <RowItem label="Completed" value={task.completed ? '✅' : '⬜'} />
        <RowItem
          label="Sync Status"
          value={
            <StatusBadge status={task.syncStatus ?? SYNC_STATUS.PENDING} />
          }
        />
      </TouchableOpacity>

      {/* Delete */}
      <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.delete}>
        <Typo style={styles.deleteText}>🗑️</Typo>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: Color.black_3,
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
  },
  checkbox: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
  },
  body: {
    marginTop: 10,
    gap: 5,
  },
  fieldBlock: {
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  value: {
    fontSize: 10,
    color: Color.grey,
    fontWeight: '500',
  },
  delete: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  deleteText: {
    color: Color.red,
    fontSize: 18,
  },
  checkboxText: {
    fontSize: 20,
  },
});
