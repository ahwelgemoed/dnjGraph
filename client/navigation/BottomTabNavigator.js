import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import PoemsScreen from '../screens/PoemsScreen';
import PostPoemScreen from '../screens/PostPoemScreen';

const Tab = createMaterialBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="poems"
      shifting={true}
      sceneAnimationEnabled={false}
    >
      <Tab.Screen
        name="Poems"
        component={PoemsScreen}
        options={{
          tabBarIcon: 'home-account'
        }}
      />
      <Tab.Screen
        name="PostPoem"
        component={PostPoemScreen}
        options={{
          tabBarIcon: 'message-text-outline'
        }}
      />
    </Tab.Navigator>
  );
};
