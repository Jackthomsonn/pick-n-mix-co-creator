import { HomeScreen } from '../pages/home/Home';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const HomeStack = createStackNavigator();

export function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </ HomeStack.Navigator >
  );
}
