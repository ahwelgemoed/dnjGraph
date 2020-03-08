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
import { MaterialCommunityIcons } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');
const LinksTopAppStore = () => {
  return (
    <>
      <FAB
        onPress={() => {
          Linking.openURL('http://instagram.com/disnetjy');
        }}
        icon={({ color, size }) => (
          <MaterialCommunityIcons name="instagram" color={color} size={size} />
        )}
        label={'Follow Us'}
        style={{
          shadowColor: '#fff',
          backgroundColor: '#fff'
        }}
        small
      />
      <FAB
        icon={({ color, size }) => (
          <MaterialCommunityIcons name="play" color={color} size={size} />
        )}
        label={'Availabile on App Stores'}
        style={{
          shadowColor: '#fff',
          backgroundColor: '#fff'
          // position: 'absolute',
          // bottom: 50,
          // left: 50
        }}
        small
      />
    </>
  );
};

export default LinksTopAppStore;
