import { useFonts } from 'expo-font';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import { BounceIn, ReduceMotion } from 'react-native-reanimated';
import index from '.';
import JacobiMethod from '@/components/JacobiMethod';
import Homepage from './';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export default function RootLayout() {
  const entering = BounceIn.reduceMotion(ReduceMotion.System);
  return (
    <PaperProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={Homepage} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
