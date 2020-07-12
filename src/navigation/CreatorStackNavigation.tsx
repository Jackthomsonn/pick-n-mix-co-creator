import { CheckoutScreen } from '../pages/checkout/Checkout';
import { CreatorScreen } from '../pages/creator/Creator';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const CreatorStack = createStackNavigator();

export function CreatorStackScreen() {
  return (
    <CreatorStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <CreatorStack.Screen name="Creator" component={CreatorScreen} />
      <CreatorStack.Screen name="Checkout" component={CheckoutScreen} />
    </ CreatorStack.Navigator >
  );
}
