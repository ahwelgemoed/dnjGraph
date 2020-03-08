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
        label={'FOLLOW US'}
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
        label={'AVAILABLE on App Stores'}
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
