import React, { useState, useEffect } from 'react';
import { AsyncStorage, View, Dimensions, Platform } from 'react-native';
import {
  Banner,
  Avatar,
  Headline,
  Subheading,
  Paragraph
} from 'react-native-paper';

const AppIntroNotification = () => {
  const [showNotification, setshowNotification] = useState(false);
  const hideNotification = () => {
    AsyncStorage.setItem('appIntro', 'HIDDEN');
    setshowNotification(false);
  };
  const getItem = async () => {
    const x = await AsyncStorage.getItem('appIntro');
    if (x !== 'HIDDEN') {
      await setshowNotification(true);
    }
  };
  useEffect(() => {
    getItem();
  }, []);

  const message = () => <></>;

  return (
    <Banner
      visible={showNotification}
      actions={[
        {
          label: '👍🏽 Thanks Got It',
          onPress: () => hideNotification()
        }
      ]}
    >
      {Platform.OS === 'web' ? (
        <View>
          <Headline
            style={{
              marginTop: 20,
              fontFamily: 'raleway-boldI',
              fontWeight: 'bold'
            }}
          >
            Season 3
          </Headline>
          <Subheading style={{ fontSize: 12, fontFamily: 'raleway-bold' }}>
            🤳🏽Post Images
          </Subheading>
          <Paragraph>
            We have a selection of old black and white images from years ago
            provided to us by nos.twnsnd.co - You have the choice to select an
            image or not when you post a poem.
          </Paragraph>
          <Subheading style={{ fontSize: 12, fontFamily: 'raleway-bold' }}>
            ✍️Drafts
          </Subheading>
          <Paragraph>
            You can now compose Poems and save them for later - You can use this
            to Post them at a later stage or save them for the Zine or Post them
            never.🤷🏽‍♂️ (Also a poem is saved so you will never lose it while
            typing)
          </Paragraph>
        </View>
      ) : (
        <>
          <Headline
            style={{
              marginTop: 20,
              fontFamily: 'raleway-boldI',
              fontWeight: 'bold'
            }}
          >
            Season 3
          </Headline>
          <Subheading style={{ fontSize: 12, fontFamily: 'raleway-bold' }}>
            🤳🏽Post Images:
          </Subheading>
          <Paragraph>
            We have a selection of old black and white images from years ago
            provided to us by nos.twnsnd.co - You have the choice to select an
            image or not when you post a poem.
          </Paragraph>
          <Subheading style={{ fontSize: 12, fontFamily: 'raleway-bold' }}>
            ✍️Drafts:
          </Subheading>
          <Paragraph>
            You can now compose Poems and save them for later - You can use this
            to Post them at a later stage or save them for the Zine or Post them
            never.🤷🏽‍♂️
          </Paragraph>
        </>
      )}
    </Banner>
  );
};

export default AppIntroNotification;
