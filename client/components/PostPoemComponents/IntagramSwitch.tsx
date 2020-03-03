import React from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Text, Switch } from 'react-native-paper';
import { RootStoreContext } from '../../store/RootStore';

const IntagramSwitch = observer(() => {
  const { poemsStore } = React.useContext(RootStoreContext);
  const toggleDraftMode = () => {
    poemsStore.setPostIntaHandle(!poemsStore.postIntaHandle);
  };
  React.useEffect(() => {
    poemsStore.setPostIntaHandle(poemsStore.postIntaHandle);
  }, [poemsStore.postIntaHandle]);
  return (
    <Switch
      value={poemsStore.postIntaHandle}
      onValueChange={() => {
        toggleDraftMode();
      }}
    />
  );
});

export default IntagramSwitch;
