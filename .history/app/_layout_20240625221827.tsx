import { useFonts } from 'expo-font';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import { useReducedMotion } from 'react-native-reanimated';
import JacobiMethod from '@/components/JacobiMethod';
import Homepage from './index';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export default function RootLayout() {
  const reducedMotion = useReducedMotion();

  return (
    <PaperProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator
          screenOptions={{
            animationEnabled: !reducedMotion,
            headerShown: false,
          }}
        >
          <Stack.Screen
            name='Home'
            component={Homepage}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
