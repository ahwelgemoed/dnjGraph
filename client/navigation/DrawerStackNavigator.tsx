import React from 'react';
import { View, Platform } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {
  Header,
  MyTransition
} from '../components/NavigationComponents/Header';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerComponent from '../components/NavigationComponents/DrawerComponent';
import {
  configureFonts,
  DarkTheme,
  DefaultTheme,
  withTheme,
  Provider as PaperProvider
} from 'react-native-paper';
import {
  AllPoemsScreen,
  APoemScreen,
  CreateAPoem,
  DraftScreens,
  UserScreen
} from '../Screens';

const DrawerStack = createDrawerNavigator();
const HomeStack = createStackNavigator();
const TabsStack = createMaterialBottomTabNavigator();
const Tabs = () => (
  <TabsStack.Navigator shifting={true} sceneAnimationEnabled={false}>
    <TabsStack.Screen
      options={{
        tabBarIcon: 'message-text-outline'
      }}
      name="AllPoems"
      component={PoemsScreenStack}
    />
    <TabsStack.Screen
      options={{
        tabBarIcon: 'pencil-outline'
      }}
      name="PostPoem"
      component={CreateScreenStack}
    />
    {/* <TabsStack.Screen name="ProfileScreen" component={ProfileScreen} /> */}
  </TabsStack.Navigator>
);

const DrawerStackNavigator = () => {
  return (
    <>
      <DrawerStack.Navigator
        drawerContent={({ navigation }) => (
          <DrawerComponent navigation={navigation} />
        )}
      >
        {Platform.OS === 'web' ? (
          <>
            <DrawerStack.Screen name="Home" component={PoemsScreenStack} />
          </>
        ) : (
          <DrawerStack.Screen name="Home" component={Tabs} />
        )}
      </DrawerStack.Navigator>
    </>
  );
};

export default DrawerStackNavigator;

const PoemsScreenStack = withTheme(props => (
  <HomeStack.Navigator
    headerMode="screen"
    screenOptions={{
      header: ({ scene, previous, navigation }) => (
        <Header
          scene={scene}
          previous={previous}
          navigation={navigation}
          props={props}
        />
      ),
      cardOverlayEnabled: true,
      gestureEnabled: true,
      ...MyTransition
    }}
  >
    <HomeStack.Screen name="AllPoems" component={AllPoemsScreen} />
    <HomeStack.Screen name="Drafts" component={DraftScreens} />
    <HomeStack.Screen name="UserScreen" component={UserScreen} />
    <HomeStack.Screen name="PostPoem" component={CreateAPoem} />

    <HomeStack.Screen
      options={({ route }) => ({
        title: route.params.title
      })}
      name="APoem"
      component={APoemScreen}
    />
  </HomeStack.Navigator>
));
const CreateScreenStack = withTheme(props => (
  <HomeStack.Navigator
    headerMode="screen"
    screenOptions={{
      header: ({ scene, previous, navigation }) => (
        <Header
          scene={scene}
          previous={previous}
          navigation={navigation}
          props={props}
        />
      ),
      cardOverlayEnabled: true,
      gestureEnabled: true,
      ...MyTransition
    }}
  >
    <HomeStack.Screen name="PostPoem" component={CreateAPoem} />
  </HomeStack.Navigator>
));

// const PostPoemScreenStack = withTheme(props => (
//   <PostPoemStack.Navigator
//     headerMode="screen"
//     screenOptions={{
//       header: ({ scene, previous, navigation }) => (
//         <Header
//           scene={scene}
//           previous={previous}
//           navigation={navigation}
//           props={props}
//         />
//       ),
//       cardOverlayEnabled: true,
//       gestureEnabled: true,
//       ...MyTransition
//     }}
//   >
//     <PostPoemStack.Screen name="PostPoem" component={CreateAPoem} />
//   </PostPoemStack.Navigator>
// ));
