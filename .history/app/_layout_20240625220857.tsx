import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import { BounceIn, ReduceMotion } from 'react-native-reanimated';
import { createStackNavigator } from '@react-navigation/stack';

SplashScreen.preventAutoHideAsync();
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

export default function RootLayout() {
  const entering = BounceIn.reduceMotion(ReduceMotion.System);
  return (
    <PaperProvider>
      <Stack>
        <Stack.Navigator>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack.Navigator>
      </Stack>
    </PaperProvider>
  );
}
