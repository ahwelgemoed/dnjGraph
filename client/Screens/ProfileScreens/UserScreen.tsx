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
import { useIsFocused } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../store/RootStore';
import { useAnonMayNotSeeHook } from '../../helpers/useStateHook';

interface Props {
  navigation: any;
}
const UserScreen: React.FC<Props> = observer(({ navigation }) => {
  const { poemsStore, authStore } = React.useContext(RootStoreContext);
  const { isAnonUser } = useAnonMayNotSeeHook({
    message: 'You have sign in To have a Profile'
  });
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isAnonUser && isFocused) {
      navigation.goBack();
    }
  }, [isFocused]);
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
        mode="contained"
        icon="pencil"
        onPress={() => authStore.setLocalUser({ state })}
      >
        Save Changes
      </Button>
    </View>
  );
});
const styles = StyleSheet.create({
  mainLayout: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16
  }
});
export default UserScreen;
