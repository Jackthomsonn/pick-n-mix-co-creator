import 'react-native-gesture-handler';

import React, { useState } from 'react';

import { CreatorStackScreen } from './src/navigation/CreatorStackNavigation';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { SplashScreen } from './src/pages/splash/Splash';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  const [ isLoading, setIsLoadingState ] = useState(false);

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: 'rgba(255, 98, 163, 1)',
          inactiveTintColor: 'rgba(255, 98, 163, 0.5)',
          inactiveBackgroundColor: '#FFF',
          activeBackgroundColor: '#FFF',
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string;

            if (route.name === 'Home') {
              iconName = 'ios-home';
            } else if (route.name === 'Creator') {
              iconName = 'ios-add-circle';
            } else if (route.name === 'Profile') {
              iconName = 'ios-person';
            } else if (route.name === 'Settings') {
              iconName = 'ios-settings';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          }
        })}>
        {
          isLoading ? (
            <Tab.Screen
              name="Splash"
              component={SplashScreen} />
          ) : <React.Fragment>
              <Tab.Screen name="Creator" component={CreatorStackScreen} />
            </React.Fragment>
        }
      </Tab.Navigator>
    </NavigationContainer>
  );
}
