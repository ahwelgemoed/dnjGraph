import React from 'react';
import { View } from 'react-native';
import { Text, Button, ActivityIndicator } from 'react-native-paper';

const LoadingComponent = () => {
  return (
    <View style={{ flex: 1 }}>
      <ActivityIndicator />
      <Text>Loading...</Text>
    </View>
  );
};

export default LoadingComponent;
