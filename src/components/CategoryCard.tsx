import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  Colors,
  getCategoryColor,
  getCategoryTextColor,
} from '../constants/colors';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  onPress?: () => void;
}

const workIcon = require('../assets/images/work.png');
const healthIcon = require('../assets/images/health.png');
const mentalHealthIcon = require('../assets/images/mental-health.png');
const othersIcon = require('../assets/images/others.png');

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onPress }) => {
  const backgroundColor = getCategoryColor(category.type);
  const textColor = getCategoryTextColor(category.type);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'heart':
        return healthIcon;
      case 'briefcase':
        return workIcon;
      case 'meditation':
        return mentalHealthIcon;
      case 'more':
        return othersIcon;
      default:
        return othersIcon;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Image source={getIconComponent(category.icon)} style={styles.icon} />
      </View>
      <View style={styles.categoryTextWrapper}>
        <Text style={[styles.count, { color: Colors.text }]}>
          {category.count}
        </Text>
        <Text style={[styles.name, { color: Colors.text }]}>
          {category.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    aspectRatio: 1.75,
    borderRadius: 16,
    padding: 16,
    paddingVertical: 14,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
  },
  icon: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
  count: {
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 18,
  },
  name: {
    fontSize: 14.5,
    fontWeight: '400',
    lineHeight: 18,
  },
  categoryTextWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    columnGap: 4,
  },
});

export default CategoryCard;
