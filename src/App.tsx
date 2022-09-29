import { StatusBar, StyleSheet } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

export default function App() {
  return (
    <>
    <StatusBar/>
    <LoginScreen/>
    <SignUpScreen/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


