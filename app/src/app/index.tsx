import { View } from 'react-native';
import { useAuth } from '../context/AuthContextProvider';
import LoginForm from '../screens/LoginForm';
import Dashboard from '../screens/Dashboard';

export default function HomeScreen() {
  const { isAuthenticated } = useAuth();

  return (
    <View className="flex-1">
      {isAuthenticated ? <Dashboard /> : <LoginForm />}
    </View>
  );
}
