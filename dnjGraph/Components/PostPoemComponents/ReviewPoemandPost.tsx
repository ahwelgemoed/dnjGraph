import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../store/RootStore';
import { useMutation } from '@apollo/react-hooks';
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
import CardPoem from '../CardComponents/CardPoem.js';
import DraftModeSwitch from './DraftModeSwitch';

const ReviewPoemandPost = observer(({ navigation }) => {
  const { poemsStore, authStore } = useContext(RootStoreContext);
  const [addPoem, { error, loading }] = useMutation(poemsStore.addAPoem, {
    async onCompleted({ addPoem }) {
      if (addPoem.success) {
        await authStore.setSnackBar({
          funcCalled: 'poemsStore',
          messageToUser: 'Poem Posted Succsess'
        });
        await poemsStore.clearPresistPoem();

        await navigation.navigate('AllPoems');
      }
    }
  });

  const postPoemToServer = async () => {
    const tempPoem = {
      user: authStore.userGraph.id,
      id: poemsStore.poemID && poemsStore.poemID,
      title: poemsStore.poemTitle,
      bodyText: poemsStore.poemBody,
      photoURL: poemsStore.poemImage,
      isDraft: poemsStore.draftMode
    };
    await addPoem({
      variables: {
        poem: { ...tempPoem }
      }
    });
  };

  return (
    <View>
      <CardPoem
        turnOffViewWitdht={true}
        poem={{
          title: poemsStore.poemTitle,
          handle: null,
          photoURL: poemsStore.poemImage,
          bodyText: poemsStore.poemBody
        }}
      />
      <View style={styles.preference}>
        {poemsStore.draftMode ? (
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
        <DraftModeSwitch />
      </View>
      <View style={styles.bottomRow}>
        <View style={styles.section}>
          <Button mode="outlined" icon="playlist-edit">
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
    </View>
  );
});
const styles = StyleSheet.create({
  bottomRow: {
    justifyContent: 'center',
    marginTop: 20,
    flexDirection: 'row',
    paddingBottom: 80
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 16
  }
});

export default ReviewPoemandPost;
