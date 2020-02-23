import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Divider,
  Text,
  RadioButton,
  List,
  Switch,
  Button,
  Surface
} from 'react-native-paper';
import PhotoSelectorModal from './PhotoSelectorModal';
import DraftModeSwitch from './DraftModeSwitch';
import PostPoemModal from './PostPoemModal';

const OptionsOfPoem = ({ width, height, RootStoreContext, navigation }) => {
  const { poemsStore, authStore } = React.useContext(RootStoreContext);
  const [handle, sethandle] = React.useState(false);
  const [photo, setPhoto] = React.useState(true);

  React.useEffect(() => {
    if (poemsStore.poemImage) {
      setPhoto(false);
    }
    if (!poemsStore.poemImage) {
      setPhoto(false);
    }
  }, [poemsStore.poemImage]);
  return (
    <View
      style={{
        width,
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 16
      }}
    >
      <Surface>
        <List.Section>
          <List.Subheader>Options Before Posting</List.Subheader>
          <List.Item
            title="Post With Handle"
            left={() => (
              <Switch
                value={handle}
                onValueChange={() => {
                  sethandle(!handle);
                }}
              />
            )}
          />
          <Divider />
          <List.Item title="Draft Mode" left={() => <DraftModeSwitch />} />
          <Divider />
          <List.Item
            title={`Auto Select Photo : ${photo ? 'Yes' : 'No'}`}
            icon="camera"
            left={() => (
              <Switch
                value={photo}
                onValueChange={() => {
                  setPhoto(!photo);
                }}
              />
            )}
          />
        </List.Section>
      </Surface>
      {!photo && (
        <PhotoSelectordModal
          width={width}
          height={height}
          poemsStore={poemsStore}
          authStore={authStore}
        />
      )}
      {!authStore.isAnonymous ? (
        <PostPoemModal
          height={height}
          authStore={authStore}
          poemsStore={poemsStore}
          navigation={navigation}
        />
      ) : (
        <Button
          icon="user"
          mode="contained"
          // onPress={() => }
        >
          Sign In To Post
        </Button>
      )}
    </View>
  );
};
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
export default OptionsOfPoem;
