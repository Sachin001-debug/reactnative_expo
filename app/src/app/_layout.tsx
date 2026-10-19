
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthContextProvider } from '../context/AuthContextProvider';
import '../global.css';

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="games/rock-paper-scissors"
          options={{ title: 'Rock Paper Scissors' }}
        />
      </Stack>

      <StatusBar style="auto" />
    </AuthContextProvider>
  );
}
