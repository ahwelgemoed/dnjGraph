import React, { useState } from 'react';
import { StyleSheet, Text, Platform, AsyncStorage } from 'react-native';
import * as Font from 'expo-font';
import { Linking } from 'expo';
import { RootStoreContext } from './store/RootStore';
import { observer } from 'mobx-react-lite';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import useLinking from './navigation/useLinking';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingComponent from './components/UtilComponents/LoadingComponent';
import {
  configureFonts,
  DarkTheme,
  DefaultTheme,
  withTheme,
  Provider as PaperProvider
} from 'react-native-paper';
import AuthStackNavigator from './navigation/AuthStackNavigator';
import DrawerStackNavigator from './navigation/DrawerStackNavigator';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { RestLink } from 'apollo-link-rest';
import { ApolloProvider } from '@apollo/react-hooks';
import { Header, MyTransition } from './components/NavigationComponents/Header';
import AppSnackBar from './components/UtilComponents/AppSnackBar';
import { UserScreen } from './Screens';
import { liveEndPoint } from './helpers';
// import { useAuthHook } from './helpers/useStateHook';
const AuthStack = createStackNavigator();

const PostPoemStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const UtilStack = createStackNavigator();
const WebStack = createStackNavigator();
// const DrawerStack = createDrawerNavigator();

// const UtilScreensStack = withTheme(props => (
//   <UtilStack.Navigator
//     shifting={true}
//     sceneAnimationEnabled={false}
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
//     <UtilStack.Screen name="Drafts" component={DraftScreens} />
//     <UtilStack.Screen name="UserScreen" component={UserScreen} />
//   </UtilStack.Navigator>
// ));
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

const App = observer(() => {
  const { authStore } = React.useContext(RootStoreContext);
  const ref = React.useRef();
  const { getInitialState } = useLinking(ref);
  const [isLoading, setIsLoading] = useState(true);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const [isReady, setIsReady] = React.useState(false);
  const [isAuth, setisAuth] = useState('LOADING');
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
  async function loadResourcesAndDataAsync() {
    try {
      await setInitialNavigationState(await getInitialState());
      await Font.loadAsync({
        ...Ionicons.font,
        'raleway-extraBold': require('./assets/fonts/Raleway-ExtraBold.ttf'),
        'raleway-boldI': require('./assets/fonts/Raleway-BoldItalic.ttf'),
        'raleway-medium': require('./assets/fonts/Raleway-Medium.ttf'),
        'raleway-regular': require('./assets/fonts/Raleway-Regular.ttf'),
        'raleway-bold': require('./assets/fonts/Raleway-Bold.ttf'),
        'raleway-extralight': require('./assets/fonts/Raleway-ExtraLight.ttf'),
        PTSansCaptionBold: require('./assets/fonts/PTSansCaption-Bold.ttf'),
        PTSansCaptionRegular: require('./assets/fonts/PTSansCaption-Regular.ttf'),
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')
      });
    } catch (e) {
      console.warn(e);
    } finally {
      await authStore.isUserAuthed();
      setIsLoading(false);
      setIsReady(true);
    }
  }
  React.useEffect(() => {
    loadResourcesAndDataAsync();
  }, []);
  React.useEffect(() => {
    if (authStore.isAuthed !== 'LOADING') {
      if (authStore.isAuthed === 'AUTHED') {
        setisAuth('AUTHED');
      } else {
        setisAuth('NOTAUTHED');
      }
    }
  }, [authStore.isAuthed]);
  const client = new ApolloClient({
    link: authLink.concat(graphLink),
    cache: new InMemoryCache()
  });

  if (isLoading || !isReady || isAuth === 'LOADING') {
    return <LoadingComponent />;
  }
  return (
    <PaperProvider theme={theme}>
      <ApolloProvider client={client}>
        <NavigationContainer
          theme={theme}
          initialState={initialNavigationState}
          ref={ref}
        >
          {isAuth === 'AUTHED' && <DrawerStackNavigator />}
          {isAuth === 'NOTAUTHED' && <AuthStackNavigator />}
          {/* {isAuth ? <DrawerStackNavigator /> : } */}
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
