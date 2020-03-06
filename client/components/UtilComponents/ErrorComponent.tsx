import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../store/RootStore';

const ErrorComponent = observer(({ handleError, error }) => {
  const { poemsStore, authStore } = React.useContext(RootStoreContext);
  // console.log(error.graphQLErrors.map(({ message }, i) => message));
  useEffect(() => {
    const x = error.graphQLErrors.map(({ message }, i) => message);
    authStore.showSnack({ message: x[0] });
  }, [error]);
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
});

export default ErrorComponent;
