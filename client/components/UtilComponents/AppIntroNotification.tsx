import React, { useState, useEffect } from 'react';
import { AsyncStorage, View } from 'react-native';
import {
  Banner,
  Avatar,
  Headline,
  Subheading,
  Paragraph
} from 'react-native-paper';
import dnj from '../../assets/images/DNJW.png';
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
      <View>
        <Headline
          style={{
            marginTop: 20,
            fontFamily: 'raleway-boldI',
            fontWeight: 'bold'
          }}
        >
          Whats New
        </Headline>
        <Subheading style={{ fontSize: 12, fontFamily: 'raleway-bold' }}>
          🤳🏽Post Images
        </Subheading>
        <Paragraph>
          We have a selection of Stock in Black and White Images from years fon
          by Provided bt NOS - You can select from to give your poem a
          "Headline" Image
        </Paragraph>
        <Subheading style={{ fontSize: 12, fontFamily: 'raleway-bold' }}>
          ✍️Drafts
        </Subheading>
        <Paragraph>
          You can now compose Poems and save them for later - You can use this
          to Post them at a later stage or never 🤷🏽‍♂️
        </Paragraph>
      </View>
    </Banner>
  );
};

export default AppIntroNotification;
