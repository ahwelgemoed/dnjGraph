import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  TextInput
} from 'react-native-paper';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../store/RootStore';

const AddInstagramhandle = observer(() => {
  const { poemsStore, authStore } = React.useContext(RootStoreContext);
  const [state, setstate] = useState(false);
  const [instagram, setinstagram] = useState('');
  const submitAndSave = () => {
    authStore.setLocalUser({ state: { Instagram: instagram, seeNSFW: true } });
    setstate(false);
  };
  return (
    <View>
      <Button icon="instagram" onPress={() => setstate(true)}>
        Add Instagram Handle
      </Button>
      <Portal>
        <Dialog
          style={{ maxWidth: 800 }}
          visible={state}
          onDismiss={() => setstate(false)}
          dismissable={false}
        >
          <Dialog.Title icon="instagram">Add Instagram Handle</Dialog.Title>
          <Dialog.Content>
            <TextInput
              // style={{ width: 300 }}
              label="Instagram Handle"
              value={instagram}
              onChangeText={text => setinstagram(text)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => submitAndSave()}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
});

export default AddInstagramhandle;
