import React, { useState } from 'react';
import { RootStoreContext } from '../../store/RootStore';
import { useMediaQuery } from 'react-responsive';
import { Formik, Field } from 'formik';
import { observer } from 'mobx-react-lite';
import { View, StyleSheet, Image } from 'react-native';
import {
  Button,
  Surface,
  Headline,
  TextInput,
  List,
  Subheading,
  RadioButton,
  Checkbox
} from 'react-native-paper';
import dnj from '../../assets/images/DNJB.png';
const SignUpScreen = observer(({ navigation }) => {
  const [canSubmit, setcanSubmit] = useState(false);
  const { authStore } = React.useContext(RootStoreContext);
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  });
  const submitToFirebase = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    authStore.firebase
      .auth()
      .createUserWithEmailAndPassword(email.trim(), password)
      .then(({ user }) => {
        return authStore.logUserInAndSetTokenInStorage({
          user,
          token: user.ma
        });
      })
      .catch(error => {
        return authStore.showSnack({ message: error.message });
      });
  };
  const SingInForm = () => {
    return (
      <Formik
        initialValues={{ email: '', password: '', name: '', terms: false }}
        onSubmit={values => submitToFirebase(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextInput
              style={{
                backgroundColor: 'rgba(255,255,255,0.3)'
              }}
              label="Name"
              value={values.name}
              onChangeText={handleChange('name')}
            />

            <TextInput
              style={{
                backgroundColor: 'rgba(255,255,255,0.3)'
              }}
              label="Email"
              value={values.email}
              onChangeText={handleChange('email')}
            />
            <TextInput
              style={{
                backgroundColor: 'rgba(255,255,255,0.3)'
              }}
              label="Password"
              secureTextEntry={true}
              value={values.password}
              onChangeText={handleChange('password')}
            />
            <Subheading
              onPress={() => navigation.push('Terms')}
              style={{
                fontSize: 10,
                textAlign: 'center',
                color: 'rgba(255,0,0,0.7)',
                fontFamily: 'PTSansCaptionBold'
              }}
            >
              By Using DNJ you agree to our T&C's
            </Subheading>
            <Button
              style={{
                marginTop: 20,
                alignSelf: 'center',
                width: isDesktopOrLaptop ? '60%' : '90%'
              }}
              mode="contained"
              onPress={handleSubmit}
            >
              Sign Up
            </Button>
          </View>
        )}
      </Formik>
    );
  };
  return (
    <View style={styles.mainLayout}>
      <View style={styles.formLayout}>
        <Image
          style={{
            width: 200,
            height: 150,
            alignSelf: 'center',
            position: 'absolute',
            top: 40
          }}
          source={dnj}
        />
        <Surface
          style={{
            alignSelf: 'center',
            width: isDesktopOrLaptop ? '60%' : '90%',
            padding: 20,
            borderRadius: 20
          }}
        >
          <Headline>Sign Up</Headline>
          <SingInForm />
          <Button
            style={{
              marginTop: 20,
              alignSelf: 'center',
              width: isDesktopOrLaptop ? '60%' : '90%'
            }}
            mode="text"
            onPress={() => navigation.goBack()}
          >
            Back
          </Button>
        </Surface>
        <Surface
          style={{
            alignSelf: 'center',
            position: 'absolute',
            bottom: 40,
            width: isDesktopOrLaptop ? '30%' : '90%'
          }}
        >
          <Button mode="text" onPress={() => authStore.setUserAsAnonymous()}>
            Sign Up Later
          </Button>
        </Surface>
      </View>
      {/* </ImageBackground> */}
    </View>
  );
});
const styles = StyleSheet.create({
  mainLayout: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
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
export default SignUpScreen;
