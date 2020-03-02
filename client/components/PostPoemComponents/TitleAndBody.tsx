import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../store/RootStore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Surface, Text, TextInput } from 'react-native-paper';

const TitleAndBody = observer(() => {
  const { poemsStore } = useContext(RootStoreContext);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  useEffect(() => {
    // console.log('🔥🔥💂🏽‍♂️');
    if (poemsStore.poemTitle) {
      setTitle(poemsStore.poemTitle);
    }
    if (poemsStore.poemBody) {
      setBody(poemsStore.poemBody);
    }
  }, []);
  useEffect(() => {
    poemsStore.setPoemTitle(title);
  }, [title]);
  useEffect(() => {
    poemsStore.setPoemBody(body);
  }, [body]);
  useEffect(() => {
    /**
     * This is To Edit A Poem Cause Params DoesntSeem To Work Propper
     */
    if (title !== poemsStore.poemTitle) {
      setTitle(poemsStore.poemTitle);
    }
  }, [poemsStore.poemTitle]);
  useEffect(() => {
    /**
     * This is To Edit A Poem Cause Params DoesntSeem To Work Propper
     */
    if (body !== poemsStore.poemBody) {
      setBody(poemsStore.poemBody);
    }
  }, [poemsStore.poemBody]);

  const submitToFirebase = ({ email, password }) => {};
  return (
    // <KeyboardAwareScrollView style={{ flex: 1, margin: 0, padding: 0 }}>
    <View>
      <TextInput
        label="Poem Title"
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <TextInput
        value={body}
        multiline
        placeholder={'Poem Body'}
        style={{ maxHeight: 250, minHeight: 250, marginTop: 5 }}
        onChangeText={text => setBody(text)}
      />
    </View>
    // </KeyboardAwareScrollView>
  );
});

export default TitleAndBody;
