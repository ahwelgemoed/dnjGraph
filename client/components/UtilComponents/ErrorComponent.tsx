import React, { useEffect, useState, useContext } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../store/RootStore';
import { Updates } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
interface Props {
  handleError: () => void;
  error: object;
}
type IRetry = { number };
const ErrorComponent: React.FC<Props> = observer(({ handleError, error }) => {
  const { poemsStore, authStore } = useContext(RootStoreContext);
  const [retry, setretry] = useState<IRetry>(0);
  // console.log(error.graphQLErrors.map(({ message }, i) => message));
  useEffect(() => {
    const x = error && error.graphQLErrors.map(({ message }, i) => message);
    authStore.showSnack({ message: x[0] });
  }, [error]);

  const reAuthAndReload = () => {
    if (retry <= 1) {
      authStore.isUserAuthed();
      handleError();
      setretry(retry + 1);
    } else {
      /**
       *  This Assumes Something Is very worng And Hard Restars The app (If it works for Teams 🤷🏽‍♂️)
       */
      Updates.reload();
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text style={{ fontSize: 18, padding: 20 }}>
        Oh No Something Went Wrong
      </Text>

      <Button
        icon="exclamation"
        mode="contained"
        onPress={() => reAuthAndReload()}
      >
        {retry <= 1 ? 'RETRY' : 'RESTART THE APP'}
      </Button>
    </View>
  );
});

export default ErrorComponent;
