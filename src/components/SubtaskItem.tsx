import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/colors';
import { SubTask } from '../types';

interface SubTaskItemProps {
  subtask: SubTask;
  onToggle: (subtaskId: string) => void;
  editable?: boolean;
}

const SubTaskItem: React.FC<SubTaskItemProps> = ({
  subtask,
  onToggle,
  editable = false,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.checkbox, subtask.completed && styles.checkboxChecked]}
        onPress={() => onToggle(subtask.id)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        {subtask.completed && <View style={styles.checkmark} />}
      </TouchableOpacity>
      <Text style={[styles.text, subtask.completed && styles.textCompleted]}>
        {subtask.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: Colors.white,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: Colors.border,
    borderColor: Colors.border,
  },
  checkmark: {
    width: 10,
    height: 10,
    borderRadius: 2.5,
    backgroundColor: Colors.white,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: Colors.textSecondary,
  },
});

export default SubTaskItem;
