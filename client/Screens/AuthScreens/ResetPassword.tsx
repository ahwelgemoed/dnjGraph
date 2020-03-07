import React, { useState } from 'react';
import { RootStoreContext } from '../../store/RootStore';
import { useMediaQuery } from 'react-responsive';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { View, StyleSheet, Image } from 'react-native';
import {
  Button,
  Surface,
  Headline,
  TextInput,
  Subheading,
  TouchableRipple,
  Checkbox
} from 'react-native-paper';
import dnj from '../../assets/images/DNJB.png';
const ResetPassword = observer(({ navigation }) => {
  const [canSubmit, setcanSubmit] = useState(false);
  const { authStore } = React.useContext(RootStoreContext);
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  });
  const submitToFirebase = ({ email }) => {
    if (!email) {
      return;
    }
    authStore.firebase
      .auth()
      .sendPasswordResetEmail(email.trim())
      .then(() => {
        return authStore.showSnack({
          message: '🚀 Email Sent (Check your Spam)'
        });
      })
      .catch(error => {
        return authStore.showSnack({ message: error.message });
      });
  };
  const SingInForm = () => {
    return (
      <Formik
        initialValues={{ email: '' }}
        onSubmit={values => submitToFirebase(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextInput
              style={{
                backgroundColor: 'rgba(255,255,255,0.3)'
              }}
              label="Email"
              value={values.email}
              onChangeText={handleChange('email')}
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
              Reset Password
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
            padding: 40,
            borderRadius: 40
          }}
        >
          <Headline>Reset Your Password</Headline>
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
export default ResetPassword;
