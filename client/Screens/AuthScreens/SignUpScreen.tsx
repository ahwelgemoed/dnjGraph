import React from 'react';
import { RootStoreContext } from '../../store/RootStore';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Button, Surface, Avatar, TextInput } from 'react-native-paper';

const SignInScreen = observer(({ navigation }) => {
  const { authStore } = React.useContext(RootStoreContext);
  const submitToFirebase = ({ email, password }) => {
    try {
      // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() =>
      authStore.firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(({ user }) => {
          authStore.logUserInAndSetTokenInStorage({ user, token: user.ma });
        });
    } catch (error) {
      // console.log(error);
    }
  };
  const SingInForm = () => {
    return (
      <Formik
        initialValues={{
          email: 'test@test.com',
          password: '123123',
          name: '123123'
        }}
        onSubmit={values => submitToFirebase(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            {/* <Surface> */}
            <TextInput
              label="Your Name"
              value={values.name}
              onChangeText={handleChange('name')}
            />
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
            {/* </Surface> */}
            <Button
              style={{ marginTop: 20 }}
              mode="contained"
              onPress={handleSubmit}
            >
              Sign In
            </Button>
          </View>
        )}
      </Formik>
    );
  };
  return (
    <View style={styles.mainLayout}>
      <ImageBackground
        source={{
          uri:
            'https://66.media.tumblr.com/da8261c0b01bb8c0aaa14f315a4d118a/tumblr_pmjb1o7dnI1sfie3io1_1280.jpg'
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <View style={styles.formLayout}>
          <Avatar.Image
            style={{ alignSelf: 'center', position: 'absolute', top: 100 }}
            source={{
              uri: 'http://www.disnetjy.com/newlogo.png'
            }}
            size={150}
          />

          <SingInForm />
          <Surface
            style={{ marginTop: 20, alignSelf: 'center', width: '100%' }}
          >
            <Button
              // style={{ marginTop: 20 }}
              mode="text"
              onPress={() => navigation.push('CreateAccount')}
            >
              Sign Up
            </Button>
          </Surface>
          {/* <Button mode="contained" onPress={() => console.log('g')}>
        FaceBook
      </Button>
      <Button mode="contained" onPress={() => console.log('g')}>
        Apple
      </Button> */}
          <Surface
            style={{ alignSelf: 'center', position: 'absolute', bottom: 40 }}
          >
            <Button mode="text" onPress={() => authStore.setUserAsAnonymous()}>
              Sign Up Later
            </Button>
          </Surface>
        </View>
      </ImageBackground>
    </View>
  );
});
const styles = StyleSheet.create({
  mainLayout: {
    flex: 1,
    justifyContent: 'center'
    // paddingVertical: 16,
    // paddingHorizontal: 16
  },
  formLayout: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16
  }
});
export default SignInScreen;
