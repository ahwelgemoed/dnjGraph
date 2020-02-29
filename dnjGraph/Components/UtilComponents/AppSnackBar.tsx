import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../store/RootStore';

const AppSnackBar = observer(() => {
  const [showSnackBar, setshowSnackBar] = useState(false);
  const [messageToDisplay, setMessageToDisplay] = useState();
  const { poemsStore, authStore } = React.useContext(RootStoreContext);
  useEffect(() => {
    if (authStore.showAuthSnack.messageToUser) {
      setshowSnackBar(true);
      setMessageToDisplay(authStore.showAuthSnack.messageToUser);
    }
  }, [authStore.showAuthSnack]);
  console.log(authStore.showAuthSnack);

  return (
    <View>
      <Snackbar
        style={{ position: 'absolute', bottom: 100 }}
        visible={showSnackBar}
        onDismiss={() => setshowSnackBar(false)}
        action={{
          label: 'Undo',
          onPress: () => {
            // Do something
          }
        }}
      >
        {messageToDisplay}
      </Snackbar>
    </View>
  );
});

export default AppSnackBar;
