import React, { useEffect, useRef, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  PanResponder,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../components/Header';
import TimeSlot from '../components/TimeSlot';
import { Colors } from '../constants/colors';
import { RootStackParamList, Task } from '../types';

type CalendarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Calendar'
>;

interface CalendarScreenProps {
  navigation: CalendarScreenNavigationProp;
}

const CalendarScreen: React.FC<CalendarScreenProps> = ({ navigation }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const dayScrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<Array<any>>([]);
  const timeScrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentDate = new Date(year, month, i);
      days.push({
        day: currentDate
          .toLocaleDateString('en-US', { weekday: 'short' })
          .toUpperCase(),
        date: i,
        fullDate: currentDate,
      });
    }

    return days;
  };

  const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(currentMonth));

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  const scheduledTasks: Task[] = [
    {
      id: '1',
      title: 'Drink 8 glasses of water',
      category: 'health',
      completed: false,
      time: '06:00',
      duration: '1h',
    },
    {
      id: '2',
      title: 'Get a notebook',
      category: 'mentalHealth',
      completed: false,
      time: '09:00',
      duration: '1h',
    },
    {
      id: '3',
      title: 'Work',
      category: 'work',
      completed: false,
      time: '10:00',
      duration: '4h',
    },
  ];

  const getTaskForTime = (time: string): Task | undefined => {
    return scheduledTasks.find(task => task.time === time);
  };

  const handleTaskPress = (task: Task) => {
    navigation.navigate('ViewTask', { task, mode: 'edit' });
  };

  useEffect(() => {
    const today = new Date();
    const todayIndex = daysInMonth.findIndex(
      day => day.date === today.getDate(),
    );

    if (todayIndex !== -1 && dayScrollRef.current) {
      setTimeout(() => {
        dayScrollRef.current?.scrollTo({
          x: todayIndex * 70 - 150,
          animated: true,
        });
      }, 100);
    }
  }, [daysInMonth]);

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (timeScrollRef.current) {
      setTimeout(() => {
        timeScrollRef.current?.scrollTo({
          y: currentHour * 68 - 100,
          animated: true,
        });
      }, 200);
    }
  }, []);

  const handleMonthChange = (direction: 'left' | 'right') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'left') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
    setDaysInMonth(getDaysInMonth(newMonth));
    setSelectedDate(new Date(newMonth.getFullYear(), newMonth.getMonth(), 1));
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 30 && Math.abs(gestureState.dy) < 50;
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < -50) {
          handleMonthChange('right');
        } else if (gestureState.dx > 50) {
          handleMonthChange('left');
        }
      },
    }),
  ).current;

  const formattedMonth = currentMonth.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const getCurrentTimePosition = () => {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const slotHeight = 68;
    return hours * slotHeight + (minutes / 60) * slotHeight;
  };

  const isToday = isSameDay(selectedDate, new Date());

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Calendar" subtitle={formattedMonth} />

      <View style={styles.container}>
        {/* Scrollable Days */}
        <ScrollView
          ref={dayScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.weekContainer}
          contentContainerStyle={styles.weekContent}
        >
          {daysInMonth.map((item, index) => (
            <TouchableOpacity
              ref={(el: any) => (itemsRef.current[index] = el)}
              key={index}
              style={[
                styles.dayContainer,
                isSameDay(selectedDate, item.fullDate) &&
                  styles.dayContainerSelected,
              ]}
              onPress={() => {
                const selected = itemsRef.current[index];
                selected?.measure((x: number) => {
                  dayScrollRef.current?.scrollTo({
                    x: x - 10,
                    y: 0,
                    animated: true,
                  });
                });
                setSelectedDate(item.fullDate);
              }}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.dayText,
                  isSameDay(selectedDate, item.fullDate) &&
                    styles.dayTextSelected,
                ]}
              >
                {item.day}
              </Text>
              <Text
                style={[
                  styles.dateText,
                  isSameDay(selectedDate, item.fullDate) &&
                    styles.dateTextSelected,
                ]}
              >
                {item.date}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 24-Hour Time Slots */}
        <ScrollView
          ref={timeScrollRef}
          style={styles.scheduleContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.timelineContainer}>
            {timeSlots.map(time => {
              const task = getTaskForTime(time);
              return (
                <TimeSlot
                  key={time}
                  time={time}
                  task={task}
                  onPress={task ? () => handleTaskPress(task) : undefined}
                />
              );
            })}
            {/* Current Time Indicator */}
            {isToday && (
              <View
                style={[
                  styles.currentTimeIndicator,
                  { top: getCurrentTimePosition() },
                ]}
              >
                <View style={styles.currentTimeDot} />
                <View style={styles.currentTimeLine} />
              </View>
            )}
          </View>
          <View style={styles.bottomPadding} />
        </ScrollView>
      </View>
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
  weekContainer: {
    backgroundColor: Colors.white,
    marginLeft: 20,
    marginTop: 16,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    maxHeight: 100,
  },
  weekContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    minWidth: 58,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    rowGap: 10,
  },
  dayContainerSelected: {
    borderColor: Colors.buttonDark,
    backgroundColor: Colors.background,
  },
  dayText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  dayTextSelected: {
    color: Colors.text,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  dateTextSelected: {
    color: Colors.text,
  },
  scheduleContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  timelineContainer: {
    position: 'relative',
  },
  currentTimeIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  currentTimeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF6B6B',
    marginLeft: 45,
    marginRight: 8,
  },
  currentTimeLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#FF6B6B',
  },
  bottomPadding: {
    height: 20,
  },
  monthNavigation: {
    flexDirection: 'row',
    gap: 8,
  },
  monthButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  monthButtonText: {
    fontSize: 20,
    color: Colors.text,
  },
});

export default CalendarScreen;
