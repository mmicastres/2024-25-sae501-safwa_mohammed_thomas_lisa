import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Écrans de l'application
import HomeScreen from './src/screens/HomeScreen';
import SwipeScreen from './src/screens/SwipeUpScreen';
import LoginScreen from './src/screens/LoginScreen';

// Création du Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Swipe">
        <Stack.Screen name="Swipe" component={SwipeScreen} options={{ headerShown: false }} />
        {/* <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/> */}
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, gestureEnabled: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
