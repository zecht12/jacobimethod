import { useFonts } from 'expo-font';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import { BounceIn, useReducedMotion } from 'react-native-reanimated';
import JacobiMethod from '@/components/JacobiMethod';
import Homepage from './index';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export default function RootLayout() {
  const reducedMotion = useReducedMotion();

  const entering = reducedMotion ? undefined : BounceIn;

  return (
    <PaperProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator
          screenOptions={{
            animationTypeForReplace: 'push',
            animationEnabled: !reducedMotion,
          }}
        >
          <Stack.Screen
            name='Home'
            component={Homepage}
            options={{
              animation: entering,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
