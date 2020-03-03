import React from 'react';
import { View } from 'react-native';
import { Divider, List, Switch, Surface } from 'react-native-paper';

import DraftModeSwitch from './DraftModeSwitch';
const PoemOptions = () => {
  const [handle, sethandle] = React.useState(false);
  return (
    <Surface style={{ marginTop: 20 }}>
      <List.Section>
        <List.Subheader>Options Before Posting</List.Subheader>
        <List.Item
          title="Post With Handle"
          left={() => (
            <Switch
              value={handle}
              onValueChange={() => {
                sethandle(!handle);
              }}
            />
          )}
        />
        <Divider />
        <List.Item title="Draft Mode" left={() => <DraftModeSwitch />} />
      </List.Section>
    </Surface>
  );
};

export default PoemOptions;
