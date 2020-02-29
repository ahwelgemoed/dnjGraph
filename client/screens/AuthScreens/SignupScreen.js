import React from 'react';
import { RootStoreContext } from '../../store/RootStore';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { View, StyleSheet } from 'react-native';
import { Button, Surface, Text, TextInput } from 'react-native-paper';

const SignupScreen = observer(({ navigation }) => {
  const { authStore } = React.useContext(RootStoreContext);
  const submitToFirebase = ({ email, password }) => {
    try {
      // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() =>
      authStore.firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(({ user }) => {
          // console.log(user);

          authStore.logUserInAndSetTokenInStorage({ user, token: user.ma });
        });
    } catch (error) {
      // console.log(error);
    }
  };
  const SingInForm = () => {
    return (
      <Formik
        initialValues={{ email: 'test@test.com', password: '123123' }}
        onSubmit={values => submitToFirebase(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextInput
              label="Email"
              value={values.email}
              onChangeText={handleChange('email')}
            />
            <TextInput
              label="Password"
              value={values.password}
              onChangeText={handleChange('password')}
            />

            <Button status="primary" onPress={handleSubmit}>
              Sign Up
            </Button>
          </View>
        )}
      </Formik>
    );
  };
  return (
    <View style={styles.mainLayout}>
      <Surface>
        <SingInForm />
      </Surface>

      <Button
        mode="text"
        onPress={() => console.log('g')}
        style={{ alignSelf: 'center', position: 'absolute', bottom: 40 }}
      >
        Sign Up Later
      </Button>
    </View>
  );
});
const styles = StyleSheet.create({
  mainLayout: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16
  }
});
export default SignupScreen;
