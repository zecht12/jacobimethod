import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import { withDelay, withTiming } from 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  sv1.value = withTiming(0, { reduceMotion: ReduceMotion.System });
  sv2.value = withDelay(
    1000,
    withTiming(toValue, { duration }),
    ReduceMotion.System
  );

  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen name="index"  options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}
