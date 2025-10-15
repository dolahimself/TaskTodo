export type CategoryType = 'health' | 'work' | 'mentalHealth' | 'others';

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  category: CategoryType;
  completed: boolean;
  time?: string;
  duration?: string;
  date?: Date;
  subTasks?: SubTask[];
}

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  count: number;
  color: string;
  icon: string;
}

export type RootStackParamList = {
  Home: undefined;
  Calendar: undefined;
  ViewTask: { task?: Task; mode?: 'create' | 'edit' };
};
