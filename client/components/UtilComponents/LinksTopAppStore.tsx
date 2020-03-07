import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import {
  Text,
  Subheading,
  Headline,
  Portal,
  FAB,
  Surface
} from 'react-native-paper';
import { Linking } from 'expo';
import Appstore1 from '../../assets/images/Appstore1.png';
import Appstore2 from '../../assets/images/Appstore2.png';
import { Ionicons, Entypo } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');
const LinksTopAppStore = () => {
  return (
    <>
      <FAB
        onPress={() =>
          Linking.openURL(
            'https://play.google.com/store/apps/details?id=com.disnetons.googlesignin'
          )
        }
        icon={({ color, size }) => (
          <Entypo name="google-play" color={'#fff'} size={size} />
        )}
        style={{
          backgroundColor: '#689f38',
          position: 'absolute',
          bottom: 150,
          left: 50
        }}
        small
      />
      <FAB
        small
        onPress={() =>
          Linking.openURL(
            'https://apps.apple.com/us/app/dis-net-jy/id1462187171?ls=1'
          )
        }
        icon={({ color, size }) => (
          <Ionicons name="ios-apps" color={color} size={size} />
        )}
        style={{
          backgroundColor: 'rgba(0,0,0,0.8)',
          position: 'absolute',
          bottom: 100,
          left: 50
        }}
      />
    </>
  );
};

export default LinksTopAppStore;
