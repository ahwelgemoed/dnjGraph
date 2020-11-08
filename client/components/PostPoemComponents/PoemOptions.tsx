import React, { useContext } from "react";
import { View } from "react-native";
import { Divider, List, Switch, Surface } from "react-native-paper";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../store/RootStore";
import AddInstagramhandle from "../UtilComponents/AddInstagramhandle";
import DraftModeSwitch from "./DraftModeSwitch";
import IntagramSwitch from "./IntagramSwitch";
const PoemOptions = observer(() => {
  const { poemsStore, authStore } = useContext(RootStoreContext);
  const [handle, sethandle] = React.useState(false);

  return (
    <Surface style={{ marginTop: 40, borderRadius: 20, padding: 10 }}>
      <List.Section>
        <List.Subheader>Options Before Posting</List.Subheader>
        {authStore.loacalUser && authStore.loacalUser.Instagram ? (
          <List.Item
            title={`Post as:  ${authStore.loacalUser.Instagram}`}
            left={() => <IntagramSwitch />}
          />
        ) : (
          <AddInstagramhandle />
        )}
        <Divider />
        <List.Item title="Draft Mode" left={() => <DraftModeSwitch />} />
      </List.Section>
    </Surface>
  );
});

export default PoemOptions;
