import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Task } from '../types/type';
import Color from '../../../assets/Color';

type Props = {
  task: Task;
  onToggle: (t: Task) => void;
  onEdit: (t: Task) => void;
  onDelete: (id: string) => void;
};

export default function TaskItem({ task, onToggle, onEdit, onDelete }: Props) {
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => onToggle(task)} style={styles.checkbox}>
        <Text>{task.completed ? '✅' : '⬜'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.body} onPress={() => onEdit(task)}>
        <Text style={[styles.title, task.completed && styles.done]}>
          {task.title}
        </Text>
        {task.description ? (
          <Text style={styles.desc}>{task.description}</Text>
        ) : null}
        {/* {task.syncStatus !== SYNC_STATUS.SYNCED && (
          <Text style={styles.pending}>• Pending</Text>
        )} */}

        <Text style={styles.pending}>• {task.syncStatus}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.delete}>
        <Text style={{ color: Color.red }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  checkbox: {
    width: 36,
    alignItems: 'center',
  },
  body: {
    flex: 1,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  desc: {
    color: '#555',
    marginTop: 4,
  },
  delete: {
    paddingHorizontal: 8,
  },
  done: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  pending: {
    marginTop: 6,
    color: '#fa8c16',
    fontSize: 12,
  },
});
