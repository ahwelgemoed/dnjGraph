import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../store/RootStore';

interface Props {
  handleError: () => void;
  error: object;
}

const ErrorComponent: React.FC<Props> = observer(({ handleError, error }) => {
  const { poemsStore, authStore } = React.useContext(RootStoreContext);
  // console.log(error.graphQLErrors.map(({ message }, i) => message));
  useEffect(() => {
    const x = error && error?.graphQLErrors.map(({ message }, i) => message);
    authStore.showSnack({ message: x[0] });
  }, [error]);

  const reAuthAndReload = () => {
    authStore.isUserAuthed();
    handleError();
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text>Oh No Something Went Wrong</Text>
      <Button icon="user" mode="contained" onPress={() => reAuthAndReload()}>
        RETRY
      </Button>
    </View>
  );
});

export default ErrorComponent;
