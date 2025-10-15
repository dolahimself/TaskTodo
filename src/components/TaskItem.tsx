import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  Colors,
  getCategoryColor,
  getCategoryTextColor,
} from '../constants/colors';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
  onPress?: () => void;
  showSubtasks?: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onPress,
  showSubtasks = true,
}) => {
  const categoryColor = getCategoryTextColor(task.category);
  const backgroundColor = getCategoryColor(task.category);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <TouchableOpacity
          style={[styles.checkbox, task.completed && styles.checkboxChecked]}
          onPress={() => onToggle(task.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          {task.completed && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={[styles.title, task.completed && styles.titleCompleted]}>
            {task.title}
          </Text>
          <View
            style={[
              styles.categoryWrapper,
              { backgroundColor: backgroundColor },
            ]}
          >
            <Text style={[styles.category, { color: categoryColor }]}>
              {task.category.toUpperCase()}
            </Text>
          </View>

          {showSubtasks && task.subTasks && task.subTasks.length > 0 && (
            <View style={styles.subtasksContainer}>
              {task.subTasks.map(subtask => (
                <View key={subtask.id} style={styles.subtaskItem}>
                  <View
                    style={[
                      styles.subtaskCheckbox,
                      subtask.completed && styles.subtaskCheckboxChecked,
                    ]}
                  />
                  <Text
                    style={[
                      styles.subtaskText,
                      subtask.completed && styles.subtaskTextCompleted,
                    ]}
                  >
                    {subtask.title}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.transparent,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginBottom: 12,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: Colors.buttonDark,
    borderColor: Colors.buttonDark,
  },
  checkmark: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 4,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: Colors.textSecondary,
  },
  category: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  subtasksContainer: {
    marginTop: 8,
  },
  subtaskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  subtaskCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.border,
    marginRight: 8,
  },
  subtaskCheckboxChecked: {
    backgroundColor: Colors.textSecondary,
    borderColor: Colors.textSecondary,
  },
  subtaskText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  subtaskTextCompleted: {
    textDecorationLine: 'line-through',
    color: Colors.textSecondary,
    opacity: 0.6,
  },
  categoryWrapper: {
    alignSelf: 'flex-start',
    marginBottom: 8,
    paddingVertical: 3,
    paddingHorizontal: 4,
    borderRadius: 3,
  },
});

export default TaskItem;
