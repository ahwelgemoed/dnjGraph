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
import { Header, MyTransition } from './Components/NavigationComponents/Header';
import DrawerComponent from './Components/NavigationComponents/DrawerComponent';
import AppSnackBar from './Components/UtilComponents/AppSnackBar';
import {
  SignIn,
  SignInScreen,
  CreateAccount,
  SplashScreen,
  APoemScreen,
  DraftsScreen,
  AllPoemsScreen,
  ProfileScreen,
  DraftScreens,
  CreateAPoem
} from './Screens';

const AuthStack = createStackNavigator();
const TabsStack = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();
const PostPoemStack = createStackNavigator();
const ProfileStack = createStackNavigator();
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
    <ProfileStack.Screen name="Drafts" component={DraftScreens} />
    {/* <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} /> */}
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
  const restLink = new RestLink({ uri: 'http://localhost:4000/v1/' });
  const graphLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        authorization: `Bearer ${token}`
      }
    };
  });
  React.useEffect(() => {
    // console.log('isAuthed', authStore.isAuthed);
    // console.log('isAnonymous', authStore.isAnonymous);
    authStore.isUserAuthed();
  }, [authStore.isAuthed, authStore.isAnonymous]);
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // SplashScreen.preventAutoHide();
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
        setIsLoading(false);
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
            </DrawerStack.Navigator>
          ) : (
            <AuthStack.Navigator>
              <AuthStack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{ title: 'Sign In' }}
              />
              <AuthStack.Screen
                name="CreateAccount"
                component={CreateAccount}
              />
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
