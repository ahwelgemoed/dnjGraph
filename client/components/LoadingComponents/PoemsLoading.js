import React from 'react';
import { View, Text } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';

const PoemsLoading = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator animating={true} color={Colors.red800} />
    </View>
  );
};

export default PoemsLoading;
