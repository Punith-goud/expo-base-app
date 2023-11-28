import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/appStack/HomeScreen';

const Tab = createBottomTabNavigator();

const AppStack = () => (
  <Tab.Navigator>
    <Tab.Screen name="HomeScreen" component={HomeScreen} />

  </Tab.Navigator>
);

export default AppStack;
