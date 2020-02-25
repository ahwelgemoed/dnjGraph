import React from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import { Button, Surface, Text, TextInput } from 'react-native-paper';

const TitleAndBody = () => {
  const submitToFirebase = ({ email, password }) => {};
  return (
    <Formik
      initialValues={{ title: 'test@test.com', poemBody: '123123' }}
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
            style={{ maxHeight: 250, minHeight: 250 }}
            onChangeText={handleChange('poemBody')}
          />

          {/* <Button status="primary" onPress={handleSubmit}>
            Sign In
          </Button> */}
        </View>
      )}
    </Formik>
  );
};

export default TitleAndBody;
