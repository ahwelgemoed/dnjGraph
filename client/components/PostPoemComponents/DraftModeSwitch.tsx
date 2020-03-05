import React from 'react';
import { observer } from 'mobx-react-lite';
import { Text, Switch } from 'react-native-paper';
import { RootStoreContext } from '../../store/RootStore';
const DraftModeSwitch = observer(() => {
  const { poemsStore } = React.useContext(RootStoreContext);
  const toggleDraftMode = () => {
    poemsStore.setDraftMode(!poemsStore.draftMode);
  };
  React.useEffect(() => {
    poemsStore.setDraftMode(poemsStore.draftMode);
  }, [poemsStore.draftMode]);
  return (
    <Switch
      value={poemsStore.draftMode}
      onValueChange={() => {
        toggleDraftMode();
      }}
    />
  );
});

export default DraftModeSwitch;
