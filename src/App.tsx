import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { AuthProvider } from './contexts/AuthContext';
import { Routes } from './routes/Index';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}



