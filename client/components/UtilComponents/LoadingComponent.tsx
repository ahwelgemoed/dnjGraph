import React from 'react';
import { View, Image } from 'react-native';
import { Text, Button, ActivityIndicator } from 'react-native-paper';

import dnj from '../../assets/images/DNJLoading.gif';

const LoadingComponent = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
      }}
    >
      <Image source={dnj} style={{ width: 300, height: 300 }} />
      {/* <ActivityIndicator />
      <Text>Loading...</Text> */}
    </View>
  );
};

export default LoadingComponent;
