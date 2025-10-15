export const Colors = {
  health: 'rgba(121, 144, 248, 0.1)',
  healthDark: 'rgba(121, 144, 248, 1)',
  healthText: 'rgba(121, 144, 248, 1)',

  work: 'rgba(70, 207, 139, 0.1)',
  workDark: 'rgba(70, 207, 139, 1)',
  workText: 'rgba(70, 207, 139, 1)',

  mentalHealth: 'rgba(188, 94, 173, 0.1)',
  mentalHealthDark: 'rgba(188, 94, 173, 1)',
  mentalHealthText: 'rgba(188, 94, 173, 1)',

  others: 'rgba(144, 137, 134, 0.1)',
  othersDark: 'rgba(144, 137, 134, 1)',
  othersText: 'rgba(144, 137, 134, 1)',

  background: '#FAFAFA',
  white: '#FFFFFF',
  black: '#000000',
  text: '#1A1A1A',
  textSecondary: '#757575',
  border: '#E0E0E0',
  buttonDark: '#2C2C2C',

  calendarHighlight: '#F5F5F5',
  transparent: 'transparent',

  floatButton: 'rgba(57, 52, 51, 1)',

  blue: '#6B9FFF',
  purple: '#C77DFF',
  green: '#5DD49C',
};

export const getCategoryColor = (category: string): string => {
  switch (category.toLowerCase()) {
    case 'health':
      return Colors.health;
    case 'work':
      return Colors.work;
    case 'mentalhealth':
    case 'mental health':
      return Colors.mentalHealth;
    case 'others':
      return Colors.others;
    default:
      return Colors.others;
  }
};

export const getCategoryDarkColor = (category: string): string => {
  switch (category.toLowerCase()) {
    case 'health':
      return Colors.healthDark;
    case 'work':
      return Colors.workDark;
    case 'mentalhealth':
    case 'mental health':
      return Colors.mentalHealthDark;
    case 'others':
      return Colors.othersDark;
    default:
      return Colors.othersDark;
  }
};

export const getCategoryTextColor = (category: string): string => {
  switch (category.toLowerCase()) {
    case 'health':
      return Colors.healthText;
    case 'work':
      return Colors.workText;
    case 'mentalhealth':
    case 'mental health':
      return Colors.mentalHealthText;
    case 'others':
      return Colors.othersText;
    default:
      return Colors.othersText;
  }
};
