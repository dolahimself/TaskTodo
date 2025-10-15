import { Task } from '../types';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Drink 8 glasses of water',
    category: 'health',
    completed: false,
  },
  {
    id: '2',
    title: 'Edit the PDF',
    category: 'work',
    completed: false,
  },
  {
    id: '3',
    title: 'Write in a gratitude journal',
    category: 'mentalHealth',
    completed: false,
    subTasks: [
      { id: '3-1', title: 'Get a notebook', completed: false },
      { id: '3-2', title: 'Follow the youtube tutorial', completed: false },
    ],
  },
  {
    id: '4',
    title: 'Stretch everyday for 15 mins',
    category: 'health',
    completed: false,
  },
];
