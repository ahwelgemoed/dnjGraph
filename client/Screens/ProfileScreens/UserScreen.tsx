import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Button,
  Surface,
  Text,
  TextInput,
  List,
  Switch
} from 'react-native-paper';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../store/RootStore';

const UserScreen = observer(() => {
  const { poemsStore, authStore } = React.useContext(RootStoreContext);
  useEffect(() => {
    setstate({ ...authStore.loacalUser });
  }, []);
  const [state, setstate] = useState({
    Instagram: '',
    seeNSFW: true
  });

  return (
    <View style={styles.mainLayout}>
      <TextInput
        label="Instagram Handle"
        value={state.Instagram}
        onChangeText={text => setstate({ ...state, Instagram: text })}
      />
      <List.Item
        title="See NSFW Posts"
        left={() => (
          <Switch
            value={state.seeNSFW}
            onValueChange={() =>
              setstate({ ...state, seeNSFW: !state.seeNSFW })
            }
          />
        )}
      />
      <Button
        // style={{ position: 'absolute', bottom: 0, justifyContent: 'center' }}
        mode="contained"
        icon="pencil"
        onPress={() => authStore.setLocalUser({ state })}
      >
        Save Changes
      </Button>
      {/* <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Button
          // style={{ position: 'absolute', bottom: 0, justifyContent: 'center' }}
          mode="contained"
          icon="pencil"
          onPress={() => saveChangesToFireBase()}
        >
          Sign Out
        </Button>
        <Button
          // style={{ position: 'absolute', bottom: 0, justifyContent: 'center' }}
          mode="contained"
          icon="pencil"
          onPress={() => saveChangesToFireBase()}
        >
          Reset Password
        </Button>
      </View> */}
    </View>
  );
});
const styles = StyleSheet.create({
  mainLayout: {
    flex: 1,
    // justifyContent: 'center',
    // justifyContent: 'space-around',
    paddingVertical: 16,
    paddingHorizontal: 16
  }
});
export default UserScreen;
