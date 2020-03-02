import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';

const ErrorComponent = ({ handleError }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text>Oh No Something Went Wrong</Text>
      <Button icon="user" mode="contained" onPress={() => handleError()}>
        RETRY
      </Button>
    </View>
  );
};

export default ErrorComponent;
