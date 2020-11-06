import React, { useState, useEffect, useContext } from "react";
import { View, TextInput } from "react-native";
import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../store/RootStore";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Surface, Text } from "react-native-paper";

const TitleAndBody = observer(() => {
  const { poemsStore } = useContext(RootStoreContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  useEffect(() => {
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
      <Surface
        style={{
          borderRadius: 20,
        }}
      >
        <TextInput
          label="Poem Title"
          placeholder={"Title"}
          value={title}
          style={{ fontSize: 18, fontFamily: "raleway-regular", padding: 16 }}
          onChangeText={(text) => setTitle(text)}
        />
      </Surface>
      <View style={{ height: 250, marginBottom: 20 }}>
        <Surface
          style={{
            marginTop: 10,
            marginBottom: 10,
            borderRadius: 20,
          }}
        >
          <TextInput
            value={body}
            multiline
            placeholder={"Body"}
            style={{
              height: 250,
              fontSize: 16,
              fontFamily: "raleway-regular",
              padding: 20,
              marginTop: 10,
            }}
            onChangeText={(text) => setBody(text)}
          />
          <Text
            style={{
              textAlign: "right",
              fontSize: 12,
              // paddingTop: 5,
              // marginBottom: 20,
              paddingRight: 20,
              paddingBottom: 10,
              color: "rgba(0, 0, 0, 0.54)",
            }}
          >
            Use Markdown for Styling (Like Whatsapp)
          </Text>
        </Surface>
      </View>
    </View>
    // </KeyboardAwareScrollView>
  );
});

export default TitleAndBody;
