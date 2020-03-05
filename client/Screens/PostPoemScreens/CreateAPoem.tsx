import React, { useRef, useContext, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Platform
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../store/RootStore';
import {
  Surface,
  Button,
  Headline,
  Subheading,
  Title
} from 'react-native-paper';
import { useMediaQuery } from 'react-responsive';
import TitleAndBody from '../../components/PostPoemComponents/TitleAndBody';
import ImageSelector from '../../components/PostPoemComponents/ImageSelector';
import PoemOptions from '../../components/PostPoemComponents/PoemOptions';
import SelectImageModal from '../../components/PostPoemComponents/SelectImageModal';
import PoemReViewModal from '../../components/PostPoemComponents/PoemReViewModal';
import ReviewPoemandPost from '../../components/PostPoemComponents/ReviewPoemandPost';
import { ScrollView } from 'react-native-gesture-handler';
import { useAnonMayNotSeeHook } from '../../helpers/useStateHook';
import { liveEndPoint } from '../../helpers';
import { useIsFocused } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');
const CreateAPoem = observer(({ route, navigation }) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  });
  const [step, setstep] = useState(false);
  const childRefImage = useRef(null);
  const childRefReview = useRef(null);
  const { poemsStore } = useContext(RootStoreContext);
  const [state, setstate] = useState(false);
  const { isAnonUser } = useAnonMayNotSeeHook({
    message: 'You have sign in To Post a Poem'
  });
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isAnonUser && isFocused) {
      navigation.goBack();
    }
  }, [isFocused]);
  const modalState = () => {
    setstate(false);
  };
  const onOpen = () => {
    const modal = childRefImage.current;
    if (modal) {
      modal.open();
    }
  };
  const onOpenReview = () => {
    const modal = childRefReview.current;
    if (modal) {
      modal.open();
    }
  };

  return (
    <View style={{ flex: 1, alignSelf: 'center' }}>
      {Platform.OS === 'web' ? (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{
            // width,

            flex: 1,
            paddingVertical: 16,
            paddingHorizontal: 16
          }}
        >
          <View style={[styles.container]}>
            {!step ? (
              <>
                <View style={styles.item}>
                  <TitleAndBody />
                  <PoemOptions />
                </View>
                <View style={styles.item}>
                  <Surface style={{ marginTop: 20 }}>
                    {poemsStore.poemImage ? (
                      <ImageBackground
                        style={{
                          height: 200,
                          paddingTop: 10
                        }}
                        source={{
                          uri: `${liveEndPoint}/public/img/${poemsStore.poemImage}`
                        }}
                      />
                    ) : null}
                  </Surface>
                  <Title style={{ paddingLeft: 10 }}>Select Cover Image</Title>
                  <Surface style={{ marginTop: 20 }}>
                    <ImageSelector />
                  </Surface>
                </View>
                <View style={styles.fullwidth}>
                  <Surface
                    style={{
                      marginTop: 20,
                      marginBottom: 30
                    }}
                  >
                    <Button
                      mode="outlined"
                      icon="camera"
                      onPress={() => setstep(true)}
                    >
                      Review and Post
                    </Button>
                  </Surface>
                </View>
              </>
            ) : (
              <ScrollView style={{ flex: 1 }}>
                <View style={{ width: '100%', alignItems: 'center' }}>
                  <Headline>Review and Post Poem</Headline>
                  <Subheading>It's your last Chance</Subheading>
                  <ReviewPoemandPost
                    navigation={navigation}
                    handleEditClick={() => setstep(false)}
                  />
                </View>
              </ScrollView>
            )}
          </View>
        </ScrollView>
      ) : (
        <>
          <SelectImageModal
            forwardedRef={childRefImage}
            onOpenProp={state}
            modalState={modalState}
          />
          <PoemReViewModal
            navigation={navigation}
            forwardedRef={childRefReview}
            onOpenProp={state}
            modalState={modalState}
          />

          <ScrollView
            style={{
              width,
              flex: 1,
              paddingVertical: 16,
              paddingHorizontal: 16
            }}
          >
            <TitleAndBody />
            <Surface style={{ marginTop: 20 }}>
              {poemsStore.poemImage ? (
                <ImageBackground
                  style={{
                    height: 200,
                    paddingTop: 10
                  }}
                  source={{
                    uri: `${liveEndPoint}/public/img/${poemsStore.poemImage}`
                  }}
                />
              ) : null}
            </Surface>
            <Surface
              style={{
                marginTop: 5
              }}
            >
              <Button mode="outlined" icon="camera" onPress={onOpen}>
                Select Image
              </Button>
            </Surface>
            <PoemOptions />
            <Surface
              style={{
                marginTop: 20,
                marginBottom: 30
              }}
            >
              <Button
                // style={{ marginBottom: 100 }}
                mode="outlined"
                icon="pencil"
                onPress={onOpenReview}
                disabled={!poemsStore.poemTitle || !poemsStore.poemBody}
              >
                Review and Post Poem
              </Button>
            </Surface>
          </ScrollView>
        </>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 800,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start' // if you want to fill rows left to right
  },
  item: {
    width: '50%' // is 50% of container width
  },
  fullwidth: {
    width: '100%' // is 50% of container width
  }
});
export default CreateAPoem;
