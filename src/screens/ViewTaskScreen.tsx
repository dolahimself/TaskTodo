import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, SubTask } from '../types';
import { Colors } from '../constants/colors';
import SubTaskItem from '../components/SubtaskItem';
import { useTasks } from '../contexts/TaskContexts';

type ViewTaskScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ViewTask'
>;
type ViewTaskScreenRouteProp = RouteProp<RootStackParamList, 'ViewTask'>;

interface ViewTaskScreenProps {
  navigation: ViewTaskScreenNavigationProp;
  route: ViewTaskScreenRouteProp;
}

const closeIcon = require('../assets/images/close.png');

const ViewTaskScreen: React.FC<ViewTaskScreenProps> = ({
  navigation,
  route,
}) => {
  const { addTask, updateTask } = useTasks();
  const { task, mode = 'edit' } = route.params;

  const [taskTitle, setTaskTitle] = useState(task?.title || '');
  const [subtasks, setSubtasks] = useState<SubTask[]>(task?.subTasks || []);
  const [newSubtaskText, setNewSubtaskText] = useState('');

  const isCreateMode = mode === 'create';

  const handleToggleSubtask = (subtaskId: string) => {
    setSubtasks(prevSubtasks =>
      prevSubtasks.map(st =>
        st.id === subtaskId ? { ...st, completed: !st.completed } : st,
      ),
    );
  };

  const handleAddSubtask = () => {
    if (newSubtaskText.trim()) {
      const newSubtask: SubTask = {
        id: Date.now().toString(),
        title: newSubtaskText.trim(),
        completed: false,
      };
      setSubtasks([...subtasks, newSubtask]);
      setNewSubtaskText('');
    }
  };

  const handleSave = () => {
    if (!taskTitle.trim()) {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    if (isCreateMode) {
      // Create new task
      const newTask = {
        id: Date.now().toString(),
        title: taskTitle.trim(),
        category: 'others' as const,
        completed: false,
        subTasks: subtasks.length > 0 ? subtasks : undefined,
      };
      addTask(newTask);
    } else {
      // Update existing task
      if (task) {
        updateTask(task.id, {
          title: taskTitle.trim(),
          subTasks: subtasks.length > 0 ? subtasks : undefined,
        });
      }
    }

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.closeButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Image source={closeIcon} style={styles.closeIcon} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <TextInput
            style={styles.title}
            value={taskTitle}
            onChangeText={setTaskTitle}
            placeholder="Task title"
            placeholderTextColor={Colors.textSecondary}
            multiline
          />

          {/* Subtasks List */}
          <View style={styles.subtasksContainer}>
            {subtasks.map(subtask => (
              <SubTaskItem
                key={subtask.id}
                subtask={subtask}
                onToggle={handleToggleSubtask}
                editable={true}
              />
            ))}

            {/* Add Subtask Input */}
            <View style={styles.addSubtaskContainer}>
              <View style={styles.emptyCheckbox} />
              <TextInput
                style={styles.addSubtaskInput}
                placeholder="Add subtask"
                placeholderTextColor={Colors.textSecondary}
                value={newSubtaskText}
                onChangeText={setNewSubtaskText}
                onSubmitEditing={handleAddSubtask}
                returnKeyType="done"
              />
            </View>
          </View>
        </ScrollView>

        {/* Save Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    height: 36,
    width: 36,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 32,
    lineHeight: 36,
  },
  subtasksContainer: {
    marginBottom: 24,
  },
  addSubtaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginTop: 8,
  },
  emptyCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.border,
    marginRight: 12,
  },
  addSubtaskInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
    color: Colors.text,
    padding: 0,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 40 : 16,
  },
  saveButton: {
    backgroundColor: Colors.buttonDark,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
});

export default ViewTaskScreen;
