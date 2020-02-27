import React from 'react';
import { View, Text, Button, AsyncStorage } from 'react-native';

import SignInScreen from './AuthScreens/SignInScreen';

/**
 * Display Screens
 */
import AllPoemsScreen from './PoemsScreens/AllPoemsScreen';
import APoemScreen from './PoemsScreens/APoemScreen';

/**
 * Create Screens
 */
import CreateAPoem from './PostPoemScreens/CreateAPoem';

export { SignInScreen, AllPoemsScreen, APoemScreen, CreateAPoem };

export const SignIn = ({ navigation }) => {
  return (
    <View>
      <Text>SignIn</Text>
      <Button
        title="Create Account"
        onPress={() => navigation.push('CreateAccount')}
      />
    </View>
  );
};
export const CreateAccount = () => {
  return (
    <View>
      <Text>CreateAccount</Text>
    </View>
  );
};
export const ProfileScreen = () => {
  return (
    <View>
      <Text>ProfileLekkerProfileLekkerProfileLekkerProfileLekker</Text>
    </View>
  );
};

export const PostPoem = () => {
  return (
    <View>
      <Text>PostPoem</Text>
    </View>
  );
};
export const SplashScreen = () => {
  return (
    <View>
      <Text>PostPoem</Text>
    </View>
  );
};
export const DraftsScreen = () => {
  return (
    <View>
      <Text>DraftsScreen</Text>
    </View>
  );
};
