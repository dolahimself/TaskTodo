import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import CategoryCard from '../components/CategoryCard';
import Header from '../components/Header';
import TaskItem from '../components/TaskItem';
import { Colors } from '../constants/colors';
import { useTasks } from '../contexts/TaskContexts';
import { Category, RootStackParamList, Task } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const plusIcon = require('../assets/images/plus.png');

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { tasks, toggleTask } = useTasks();

  const categories: Category[] = [
    {
      id: '1',
      name: 'Health',
      type: 'health',
      count: tasks.filter(t => t.category === 'health').length,
      color: Colors.health,
      icon: 'heart',
    },
    {
      id: '2',
      name: 'Work',
      type: 'work',
      count: tasks.filter(t => t.category === 'work').length,
      color: Colors.work,
      icon: 'briefcase',
    },
    {
      id: '3',
      name: 'Mental Health',
      type: 'mentalHealth',
      count: tasks.filter(t => t.category === 'mentalHealth').length,
      color: Colors.mentalHealth,
      icon: 'meditation',
    },
    {
      id: '4',
      name: 'Others',
      type: 'others',
      count: tasks.filter(t => t.category === 'others').length,
      color: Colors.others,
      icon: 'more',
    },
  ];

  const handleToggleTask = (taskId: string) => {
    toggleTask(taskId);
  };

  const handleTaskPress = (task: Task) => {
    navigation.navigate('ViewTask', { task, mode: 'edit' });
  };

  const handleButtonPress = () => {
    navigation.navigate('ViewTask', { mode: 'create' });
  };

  const handleCategoryPress = () => {
    navigation.navigate('Calendar');
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Today" subtitle={formattedDate} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Categories Section */}
        <View style={styles.categoriesContainer}>
          {categories.map(category => {
            return (
              <CategoryCard
                key={category.id}
                category={category}
                onPress={() => handleCategoryPress()}
              />
            );
          })}
        </View>

        {/* Tasks Section */}
        <View style={styles.tasksContainer}>
          {tasks.map(task => {
            return (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggleTask}
                onPress={() => handleTaskPress(task)}
              />
            );
          })}
        </View>
      </ScrollView>

      {/* Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        activeOpacity={0.85}
        onPress={() => handleButtonPress()}
      >
        <Image source={plusIcon} style={styles.icon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 16,
  },
  tasksContainer: {
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 100,
  },
  addButton: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: Colors.floatButton,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  icon: {
    height: 32,
    width: 32,
    resizeMode: 'contain',
  },
});

export default HomeScreen;
