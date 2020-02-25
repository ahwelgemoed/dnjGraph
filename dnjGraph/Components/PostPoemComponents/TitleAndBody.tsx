import React from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Surface, Text, TextInput } from 'react-native-paper';

const TitleAndBody = () => {
  const submitToFirebase = ({ email, password }) => {};
  return (
    <KeyboardAwareScrollView style={{ flex: 1, margin: 0, padding: 0 }}>
      <Formik
        initialValues={{ title: '', poemBody: '' }}
        onSubmit={values => submitToFirebase(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextInput
              label="Poem Title"
              value={values.title}
              onChangeText={handleChange('title')}
            />
            <TextInput
              value={values.poemBody}
              multiline
              placeholder={'Poem Body'}
              style={{ maxHeight: 250, minHeight: 250, marginTop: 5 }}
              onChangeText={handleChange('poemBody')}
            />

            {/* <Button status="primary" onPress={handleSubmit}>
            Sign In
          </Button> */}
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

export default TitleAndBody;
