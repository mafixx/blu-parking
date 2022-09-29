import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { GuestRoutes } from './routes/GuestRoutes';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar />
      <GuestRoutes />
    </NavigationContainer>
  );
}



