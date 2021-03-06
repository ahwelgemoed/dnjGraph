import React, { useState } from "react";
import { RootStoreContext } from "../../store/RootStore";
import { useMediaQuery } from "react-responsive";
import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { View, StyleSheet, Image } from "react-native";
import {
  Button,
  Surface,
  Headline,
  TextInput,
  Subheading,
  TouchableRipple,
  Checkbox,
} from "react-native-paper";
import dnj from "../../assets/images/DNJB.png";
const SignInScreen = observer(({ navigation }) => {
  const [canSubmit, setcanSubmit] = useState(false);
  const { authStore } = React.useContext(RootStoreContext);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });
  const submitToFirebase = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() =>
    authStore.firebase
      .auth()
      .signInWithEmailAndPassword(email.trim(), password)
      .then(({ user }) => {
        return authStore.logUserInAndSetTokenInStorage({
          user,
          token: user.ma,
        });
      })
      .catch((error) => {
        return authStore.showSnack({ message: error.message });
      });
  };
  const SingInForm = () => {
    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => submitToFirebase(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextInput
              style={{
                backgroundColor: "rgba(255,255,255,0.3)",
              }}
              label="Email"
              value={values.email}
              onChangeText={handleChange("email")}
            />
            <TextInput
              secureTextEntry={true}
              style={{
                backgroundColor: "rgba(255,255,255,0.3)",
              }}
              label="Password"
              value={values.password}
              onChangeText={handleChange("password")}
            />
            <Subheading
              onPress={() => navigation.push("Terms")}
              style={{
                fontSize: 10,
                textAlign: "center",
                color: "rgba(255,0,0,0.7)",
                fontFamily: "PTSansCaptionBold",
              }}
            >
              By Using DNJ you agree to our T&C's
            </Subheading>
            <Button
              style={{
                marginTop: 20,
                alignSelf: "center",
                width: isDesktopOrLaptop ? "60%" : "90%",
              }}
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
      {/* <ImageBackground
        source={{
          uri:
            'https://66.media.tumblr.com/51c32156f631013589671a46eea09d0e/tumblr_pmjb1vSPHE1sfie3io1_1280.jpg'
        }}
        style={{ width: '100%', height: '100%' }}
      > */}
      <View style={styles.formLayout}>
        <Image
          // style={{ alignSelf: 'center', position: 'absolute', top: 100 }}
          style={{
            width: 200,
            height: 150,
            alignSelf: "center",
            position: "absolute",
            top: 40,
          }}
          source={dnj}
        />
        <Surface
          style={{
            alignSelf: "center",
            width: isDesktopOrLaptop ? "60%" : "90%",
            padding: 40,
            borderRadius: 40,
          }}
        >
          <Headline>Sign In</Headline>
          <SingInForm />
          <Button
            style={{
              marginTop: 10,
              alignSelf: "center",
              width: isDesktopOrLaptop ? "60%" : "90%",
              backgroundColor: "#5AD4E6",
            }}
            mode="contained"
            onPress={() => authStore.setUserAsAnonymous()}
          >
            Use Anonymously
          </Button>
          <Button
            style={{
              marginTop: 20,
              alignSelf: "center",
              width: isDesktopOrLaptop ? "60%" : "90%",
            }}
            mode="text"
            onPress={() => navigation.push("CreateAccount")}
          >
            Sign Up
          </Button>
        </Surface>
        <Button mode="text" onPress={() => navigation.push("ResetPassword")}>
          Reset Password
        </Button>
        <Surface
          style={{
            alignSelf: "center",
            position: "absolute",
            bottom: 40,
            width: isDesktopOrLaptop ? "30%" : "90%",
          }}
        >
          {/* <TermsModal /> */}
          {/* <Button mode="text" onPress={() => authStore.setUserAsAnonymous()}>
            Sign Up Later
          </Button> */}
        </Surface>
      </View>
      {/* </ImageBackground> */}
    </View>
  );
});
const styles = StyleSheet.create({
  mainLayout: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0)",
    justifyContent: "center",
    // paddingVertical: 16,
    // paddingHorizontal: 16
  },
  formLayout: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
});
export default SignInScreen;
