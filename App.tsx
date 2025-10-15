import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { TaskProvider } from './src/contexts/TaskContexts';

function App() {
  return (
    <SafeAreaProvider>
      <TaskProvider>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#FAFAFA'} />
        <AppNavigator />
      </TaskProvider>
    </SafeAreaProvider>
  );
}

export default App;
