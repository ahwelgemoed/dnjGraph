import React from 'react';
import {
  Avatar,
  Button,
  Card,
  Headline,
  Surface,
  TextInput
} from 'react-native-paper';
import { observer } from 'mobx-react-lite';
// import { TextInput } from 'react-native-paper';
import { View, StyleSheet, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const TitleandBody = observer(({ width, RootStoreContext }) => {
  const { poemsStore } = React.useContext(RootStoreContext);
  const [poemTitle, setpoemTitle] = React.useState('');
  const [poemBody, setpoemBody] = React.useState('');

  React.useEffect(() => {
    poemsStore.setPoemTitle(poemTitle);
  }, [poemTitle]);
  React.useEffect(() => {
    poemsStore.setPoemBody(poemBody);
  }, [poemBody]);
  React.useEffect(() => {
    if (!poemTitle) {
      setpoemTitle(poemsStore.poemTitle);
    }
    if (!poemBody) {
      setpoemBody(poemsStore.poemBody);
    }
  }, [poemsStore.poemTitle, poemsStore.poemBody]);
  React.useEffect(() => {
    if (!poemsStore.poemTitle && poemTitle) {
      setpoemTitle('');
    }
    if (!poemsStore.poemBody && poemBody) {
      // console.log('poemsStore.poemBody', poemsStore.poemBody);
      setpoemBody(poemsStore.poemBody);
    }
  }, [poemsStore.poemTitle, poemsStore.poemBody]);
  return (
    <KeyboardAwareScrollView
      style={{
        width,
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 16
      }}
    >
      <Headline style={{}}>Compose Thy Poem</Headline>
      <Surface>
        <TextInput
          label="Poem Title"
          value={poemTitle}
          onChangeText={text => setpoemTitle(text)}
        />
        <TextInput
          value={poemBody}
          onChangeText={text => setpoemBody(text)}
          multiline
          placeholder={'Poem Body'}
          style={{ maxHeight: 250, minHeight: 250 }}
        />
      </Surface>
    </KeyboardAwareScrollView>
  );
});
const styles = StyleSheet.create({
  hover: {
    marginTop: 20,
    shadowOpacity: 0.35,
    shadowRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,

    shadowOffset: {
      width: 2,
      height: 0
    }
  }
});
export default TitleandBody;
