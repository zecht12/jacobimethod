import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '../hooks/useColorScheme';
import { PaperProvider } from 'react-native-paper';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  import { useReducedMotion } from 'react-native-reanimated';

  function App() {
    const reduceMotion = useReducedMotion();
  
    if (reduceMotion) {
      // display static content ✨
    } else {
      // run animations ✨
    }
  
    // ...
  }

  return (
    <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index"  options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
