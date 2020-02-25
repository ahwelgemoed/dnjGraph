import * as React from 'react';
import { configureFonts, Provider as PaperProvider } from 'react-native-paper';
import {
  DarkTheme as PaperDarkTheme,
  Provider as PaperProvider
} from 'react-native-paper';
import { Linking } from 'expo';
import { Platform, StatusBar, StyleSheet, AsyncStorage } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloProvider } from '@apollo/react-hooks';
import { useColorScheme } from 'react-native-appearance';
// Initiate apollo client
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import useLinking from './navigation/useLinking';
import { RootNavigator } from './navigation/RootNavigator';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { RestLink } from 'apollo-link-rest';
import { RootStoreContext } from './store/RootStore';
import AuthHelper from './components/AuthHelper';
const Stack = createStackNavigator();
const prefix = Linking.makeUrl('/');
export default function App(props) {
  const { authStore } = React.useContext(RootStoreContext);
  const ref = React.useRef();
  // const colorScheme = useColorScheme();
  // const [theme, setTheme] = React.useState(
  //   colorScheme === 'dark' ? 'dark' : 'light'
  // );
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const { getInitialState } = useLinking(ref, {
    prefixes: [prefix],
    config: {
      poems: 'poems'
    }
  });
  const [isReady, setIsReady] = React.useState(false);
  const [token, setToken] = React.useState();
  const [initialState, setInitialState] = React.useState();

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();
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
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);
  React.useEffect(() => {
    const newToken = AsyncStorage.getItem('userToken');
    if (newToken !== token) {
      setToken(token);
    }
  }, [token]);

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
  // const theme = {
  //   ...DefaultTheme,
  //   fonts: configureFonts(fontConfig),
  //   roundness: 2,
  //   colors: {
  //     ...DefaultTheme.colors,
  //     primary: '#000',
  //     accent: '#000'
  //   }
  // };
  const restLink = new RestLink({ uri: 'http://localhost:4000/v1/' });
  const graphLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        authorization: `Bearer ${token}`
      }
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(graphLink),
    cache: new InMemoryCache()
  });

  if (!isLoadingComplete && !props.skipLoadingScreen && !token) {
    return null;
  } else {
    if (!isReady) {
      return null;
    }
    return (
      <PaperProvider theme={PaperDarkTheme}>
        <ApolloProvider client={client}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <NavigationContainer
            theme={theme}
            independent={true}
            initialState={initialState}
            ref={ref}
          >
            <RootNavigator />
          </NavigationContainer>
        </ApolloProvider>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

{
  /* <Stack.Navigator>
    <Stack.Screen name="Root" component={BottomTabNavigator} />
  </Stack.Navigator> */
}
