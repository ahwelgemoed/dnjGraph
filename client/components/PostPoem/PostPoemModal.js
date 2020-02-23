import React, { useRef, useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  AsyncStorage,
  Dimensions
} from 'react-native';
import {
  Button,
  IconButton,
  ActivityIndicator,
  Caption,
  TouchableRipple,
  Surface,
  Paragraph,
  Switch
} from 'react-native-paper';
import { useMutation } from '@apollo/react-hooks';
import { Modalize } from 'react-native-modalize';

import DraftModeSwitch from './DraftModeSwitch';
import CardPoem from '../CardComponents/CardPoem';
import gql from 'graphql-tag';

const PostPoem = ({ height, poemsStore, navigation, authStore }) => {
  const modalRefPost = useRef(null);
  const [addPoem, { error, loading }] = useMutation(poemsStore.addAPoem, {
    async onCompleted({ addPoem }) {
      const modal = modalRefPost.current;
      if (addPoem.success) {
        await poemsStore.clearPresistPoem();
        // await AsyncStorage.removeItem('poemsStore');

        if (modal) {
          modal.close();
        }
        await navigation.navigate('Poems');
      }
    }
  });
  const [draftMode, setDraftMode] = React.useState(false);
  const [poem, setPoem] = useState({});
  const onOpen = () => {
    const modal = modalRefPost.current;
    if (modal) {
      const tempPoem = poemsStore.readyToPostPoem();
      setPoem(tempPoem);
      modal.open();
    }
  };
  const onClose = () => {
    const modal = modalRefPost.current;
    if (modal) {
      modal.close();
    }
  };
  React.useEffect(() => {
    setDraftMode(poemsStore.draftMode);
  }, [poemsStore.draftMode]);

  const setDraftModeLocally = () => {
    setDraftMode(!draftMode);
    poemsStore.setDraftMode(!draftMode);
  };

  const postPoemToServer = async () => {
    const tempPoem = {
      user: authStore.userGraph.id,
      title: poem.poemTitle,
      bodyText: poem.poemBody,
      photoURL: poem.poemImage,
      isDraft: poemsStore.draftMode
    };
    await addPoem({
      variables: {
        poem: { ...tempPoem }
      }
    });
  };

  return (
    <>
      <Surface
        style={{
          marginTop: 10
        }}
      >
        <Button icon="pencil" mode="contained" onPress={onOpen}>
          Preview & Post Poem
        </Button>
      </Surface>

      <Modalize
        ref={modalRefPost}
        modalStyle={{
          height: height * 0.7,
          alignSelf: 'center',
          width: Dimensions.get('window').width
        }}
      >
        <ScrollView>
          <View style={styles.topRow}>
            <Paragraph style={[styles.paragraph, styles.caption]}>
              Preview Poem
            </Paragraph>
          </View>
          <CardPoem
            poem={{
              title: poem.poemTitle,
              bodyText: poem.poemBody,
              handle: poem.poemImage,
              photoURL: poem.poemImage
            }}
          />
          <TouchableRipple
            onPress={() => {
              setDraftModeLocally();
            }}
          >
            <View style={styles.preference}>
              {draftMode ? (
                <>
                  <Paragraph style={[styles.paragraph, { width: '70%' }]}>
                    Draft Mode On{' '}
                    <Caption style={{ width: '70%' }}>
                      and Wont be posted for All to See
                    </Caption>
                  </Paragraph>
                </>
              ) : (
                <Paragraph style={[styles.paragraph, { width: '70%' }]}>
                  Draft Mode Off{' '}
                  <Caption style={{ width: '70%' }}>All will see it</Caption>
                </Paragraph>
              )}
              <View pointerEvents="none">
                <DraftModeSwitch />
              </View>
            </View>
          </TouchableRipple>
          <View style={styles.bottomRow}>
            <View style={styles.section}>
              <Button mode="outlined" icon="playlist-edit" onPress={onClose}>
                Edit
              </Button>
            </View>
            <View style={styles.section}>
              <Button
                disabled={loading}
                mode="contained"
                icon="pencil"
                onPress={() => postPoemToServer()}
              >
                Post
              </Button>
            </View>
          </View>
        </ScrollView>
      </Modalize>
    </>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1
  },
  userInfoSection: {
    paddingLeft: 20
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold'
  },
  caption: {
    fontSize: 14,
    lineHeight: 14
  },
  topRow: {
    justifyContent: 'center',
    marginTop: 20,
    flexDirection: 'row'
  },
  bottomRow: {
    justifyContent: 'center',
    marginTop: 20,
    flexDirection: 'row',
    paddingBottom: 80
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3
  },
  drawerSection: {
    marginTop: 15
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16
  }
});

export default PostPoem;
