import React from 'react';
import { Text, View } from 'react-native';
import { DarkTheme } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeRootsNavigator from './HomeRootsNavigator';
import { BottomTabs } from './BottomTabNavigator';
import { useTheme } from 'react-native-paper';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../store/RootStore';
import { ActivityIndicator, Colors } from 'react-native-paper';

import LoginScreen from '../screens/AuthScreens/LoginScreen';
import SignupScreen from '../screens/AuthScreens/SignupScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerContent() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
      }}
    >
      <Text>Drawer content</Text>
    </View>
  );
}
function LoadingScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator animating={true} color={Colors.red800} />
    </View>
  );
}

export const RootNavigator = observer(() => {
  const { authStore } = React.useContext(RootStoreContext);
  React.useEffect(() => {
    authStore.isUserAuthed();
  }, []);
  React.useEffect(() => {
    authStore.isUserAuthed();
  }, [
    authStore.isUserAuthed,
    authStore.isAnonymous,
    authStore.isAuthed,
    authStore.isLoading
  ]);
  console.log('authStore.isAuthed', authStore.isAuthed);
  console.log('authStore.isLoading', authStore.isLoading);
  console.log('authStore.isAnonymous', authStore.isAnonymous);
  //https://reactnavigation.org/docs/en/auth-flow.html
  if (authStore.isLoading) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      </Stack.Navigator>
    );
  }
  if (authStore.isAuthed || authStore.isAnonymous) {
    return (
      <Drawer.Navigator drawerContent={() => <DrawerContent />}>
        <Drawer.Screen name="home" component={HomeRootsNavigator} />
      </Drawer.Navigator>
    );
  }
  if (!authStore.isAuthed && !authStore.isAnonymous && !authStore.isLoading) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignupScreen} />
      </Stack.Navigator>
    );
  }
});
