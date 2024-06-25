import { useFonts } from 'expo-font';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import { BounceIn, ReduceMotion } from 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function RootLayout() {
  const entering = BounceIn.reduceMotion(ReduceMotion.System);
  return (
    <PaperProvider>
      <Stack>
        <Stack.Navigator>
        <Stack.Screen name='Login' component={Index} />
        </Stack.Navigator>
      </Stack>
    </PaperProvider>
  );
}
