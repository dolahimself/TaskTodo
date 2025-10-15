import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  Colors,
  getCategoryColor,
  getCategoryDarkColor,
} from '../constants/colors';
import { Task } from '../types';

interface TimeSlotProps {
  time: string;
  task?: Task;
  onPress?: () => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ time, task, onPress }) => {
  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.timeText}>{time}</Text>
        <View style={styles.emptySlot} />
      </View>
    );
  }

  const backgroundColor = getCategoryColor(task.category);
  const indicatorColor = getCategoryDarkColor(task.category);

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{time}</Text>
      <TouchableOpacity
        style={[styles.taskSlot, { backgroundColor }]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={[styles.indicator, { backgroundColor: indicatorColor }]} />
        <View style={[styles.taskContent, {}]}>
          <Text style={styles.taskTitle} numberOfLines={1}>
            {task.title}
          </Text>
          {task.duration && (
            <Text style={styles.taskDuration}>{task.duration}</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  timeText: {
    fontSize: 12,
    color: Colors.textSecondary,
    width: 50,
    paddingTop: 4,
  },
  emptySlot: {
    flex: 1,
    height: 40,
  },
  taskSlot: {
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    minHeight: 60,
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
    marginRight: 8,
    marginTop: 2,
  },
  taskContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100%',
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  taskDuration: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});

export default TimeSlot;
