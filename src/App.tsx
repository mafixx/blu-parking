import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { AuthProvider } from './contexts/AuthContext';
import { Routes } from './routes/Index';
import SplashScreen from './screens/SplashScreen';
import { Provider as PaperProvider } from 'react-native-paper'
import { theme } from './theme/commonStyles';

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <AuthProvider>
          <StatusBar />
          <Routes />
        </AuthProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}



