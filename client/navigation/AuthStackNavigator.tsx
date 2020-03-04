import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { SignInScreen, SignUpScreen } from '../Screens';
const AuthStackNavigator = () => {
  const AuthStack = createStackNavigator();
  return (
    <>
      <AuthStack.Navigator headerMode="none">
        <AuthStack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ title: 'Sign In' }}
        />
        <AuthStack.Screen name="CreateAccount" component={SignUpScreen} />
      </AuthStack.Navigator>
    </>
  );
};

export default AuthStackNavigator;
