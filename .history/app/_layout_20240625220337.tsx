import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import { View, Text } from 'react-native';
import { Easing } from 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

function HomeScreen() {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
}

export default function RootLayout() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            transitionSpec: {
              open: {
                animation: 'timing',
                config: {
                  duration: 500,
                  easing: Easing.bounce,
                },
              },
              close: {
                animation: 'timing',
                config: {
                  duration: 500,
                  easing: Easing.bounce,
                },
              },
            },
          }}
        >
          <Stack.Screen name="index" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
