import React, { useState } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import * as Font from 'expo-font';
import { Linking } from 'expo';
import { RootStoreContext } from './store/RootStore';
import { observer } from 'mobx-react-lite';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, useLinking } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  configureFonts,
  DarkTheme,
  DefaultTheme,
  withTheme,
  Provider as PaperProvider
} from 'react-native-paper';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { RestLink } from 'apollo-link-rest';
import { ApolloProvider } from '@apollo/react-hooks';
import { Header, MyTransition } from './components/NavigationComponents/Header';
import DrawerComponent from './components/NavigationComponents/DrawerComponent';
import AppSnackBar from './components/UtilComponents/AppSnackBar';
import {
  SignIn,
  SignInScreen,
  SignUpScreen,
  SplashScreen,
  APoemScreen,
  DraftsScreen,
  AllPoemsScreen,
  UserScreen,
  DraftScreens,
  CreateAPoem
} from './Screens';
import { liveEndPoint } from './helpers';

const AuthStack = createStackNavigator();
const TabsStack = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();
const PostPoemStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const UtilStack = createStackNavigator();
const DrawerStack = createDrawerNavigator();

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
    <HomeStack.Screen
      options={({ route }) => ({
        title: route.params.title
      })}
      name="APoem"
      component={APoemScreen}
    />
  </HomeStack.Navigator>
));
const PostPoemScreenStack = withTheme(props => (
  <PostPoemStack.Navigator
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
    <PostPoemStack.Screen name="PostPoem" component={CreateAPoem} />
  </PostPoemStack.Navigator>
));

const UtilScreensStack = withTheme(props => (
  <UtilStack.Navigator
    shifting={true}
    sceneAnimationEnabled={false}
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
    <UtilStack.Screen name="Drafts" component={DraftScreens} />
    <UtilStack.Screen name="UserScreen" component={UserScreen} />
  </UtilStack.Navigator>
));
const ProfileScreenStack = withTheme(props => (
  <ProfileStack.Navigator
    shifting={true}
    sceneAnimationEnabled={false}
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
    <ProfileStack.Screen name="UserScreen" component={UserScreen} />
  </ProfileStack.Navigator>
));

const Tabs = () => (
  <TabsStack.Navigator shifting={true} sceneAnimationEnabled={false}>
    <TabsStack.Screen
      options={{
        tabBarIcon: 'message-text-outline'
      }}
      name="Home"
      component={PoemsScreenStack}
    />
    <TabsStack.Screen
      options={{
        tabBarIcon: 'message-text-outline'
      }}
      name="PostPoem"
      component={PostPoemScreenStack}
    />
    {/* <TabsStack.Screen name="ProfileScreen" component={ProfileScreen} /> */}
  </TabsStack.Navigator>
);

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'raleway-regular',
      fontWeight: 'normal'
    },
    medium: {
      fontFamily: 'raleway-medium',
      fontWeight: 'normal'
    },
    light: {
      fontFamily: 'raleway-boldI',
      fontWeight: 'normal'
    },
    thin: {
      fontFamily: 'raleway-extralight',
      fontWeight: 'normal'
    }
  }
};
const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000',
    accent: '#000'
  }
};

const prefix = Linking.makeUrl('/');

const App = observer(() => {
  const { authStore } = React.useContext(RootStoreContext);
  const ref = React.useRef();
  const { getInitialState } = useLinking(ref, {
    prefixes: [prefix]
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();
  const [token, setToken] = React.useState();
  // liveEndPoint
  const restLink = new RestLink({ uri: `${liveEndPoint}/v1/` });
  const graphLink = new HttpLink({ uri: `${liveEndPoint}/graphql/` });
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        authorization: `Bearer ${authStore.freshUserToken}`
      }
    };
  });
  React.useEffect(() => {
    if (authStore.freshUserToken) {
      setIsLoading(false);
    }
  }, [authStore.freshUserToken]);
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // SplashScreen.preventAutoHide();
        await authStore.isUserAuthed();
        await Font.loadAsync({
          ...Ionicons.font,
          'raleway-boldI': require('./assets/fonts/Raleway-BoldItalic.ttf'),
          'raleway-medium': require('./assets/fonts/Raleway-Medium.ttf'),
          'raleway-regular': require('./assets/fonts/Raleway-Regular.ttf'),
          'raleway-bold': require('./assets/fonts/Raleway-Bold.ttf'),
          'raleway-extralight': require('./assets/fonts/Raleway-ExtraLight.ttf'),
          PTSansCaptionBold: require('./assets/fonts/PTSansCaption-Bold.ttf'),
          PTSansCaptionRegular: require('./assets/fonts/PTSansCaption-Regular.ttf'),
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')
        });
        const token = await AsyncStorage.getItem('userToken');
        setToken(token);
      } catch (e) {
        console.warn(e);
      } finally {
      }
    }

    loadResourcesAndDataAsync();
  }, []);
  React.useEffect(() => {
    getInitialState()
      .catch(() => {})
      .then(state => {
        if (state !== undefined) {
          setInitialState(state);
        }

        setIsReady(true);
      });
  }, [getInitialState]);
  const client = new ApolloClient({
    link: authLink.concat(graphLink),
    cache: new InMemoryCache()
  });

  if (isLoading || !isReady) {
    return <SplashScreen />;
  }
  // console.log(token);

  return (
    <PaperProvider theme={theme}>
      <ApolloProvider client={client}>
        <NavigationContainer
          theme={theme}
          initialState={initialState}
          ref={ref}
        >
          {authStore.isAuthed ? (
            <DrawerStack.Navigator
              drawerContent={({ navigation }) => (
                <DrawerComponent navigation={navigation} />
              )}
            >
              <DrawerStack.Screen name="Home" component={Tabs} />
              {/* <DrawerStack.Screen name="Drafts" component={DraftsScreen} /> */}
              <DrawerStack.Screen
                name="DraftStack"
                component={UtilScreensStack}
              />
              <DrawerStack.Screen
                name="ProfileStack"
                component={ProfileScreenStack}
              />
            </DrawerStack.Navigator>
          ) : (
            <AuthStack.Navigator headerMode="none">
              <AuthStack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{ title: 'Sign In' }}
              />
              <AuthStack.Screen name="CreateAccount" component={SignUpScreen} />
            </AuthStack.Navigator>
          )}
          <AppSnackBar />
        </NavigationContainer>
      </ApolloProvider>
    </PaperProvider>
  );
});
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
