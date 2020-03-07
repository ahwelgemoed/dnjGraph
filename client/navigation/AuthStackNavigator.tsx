import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  SignInScreen,
  SignUpScreen,
  TermScreen,
  ResetPassword
} from '../Screens';
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
        <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
        <AuthStack.Screen name="Terms" component={TermScreen} />
      </AuthStack.Navigator>
    </>
  );
};

export default AuthStackNavigator;
