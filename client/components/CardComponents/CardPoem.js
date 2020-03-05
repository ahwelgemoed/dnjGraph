import React from 'react';
import {
  View,
  Linking,
  Dimensions,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import {
  Surface,
  Chip,
  Button,
  Subheading,
  Card,
  Headline,
  Caption,
  Paragraph
} from 'react-native-paper';
import moment from 'moment';
import Markdown from 'react-native-markdown-display';
import { useMediaQuery } from 'react-responsive';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../store/RootStore';
import { liveEndPoint } from '../../helpers';
const { width, height } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
// ReenieBeanie
const CardPoem = observer(
  ({ poem, navigation = null, turnOffViewWitdht, view }) => {
    const { poemsStore } = React.useContext(RootStoreContext);
    const isDesktopOrLaptop = useMediaQuery({
      query: '(min-device-width: 1224px)'
    });
    // console.log(poem.date);
    // <View style={{ maxWidth: isDesktopOrLaptop ? 500 : '100%' }}>
    // console.log(poem);
    const whereToNavigate = () => {
      if (view === 'ONE') {
        console.log('ONE');

        return (
          navigation &&
          navigation.push('APoem', {
            poemId: poem.id,
            title: poem.title
          })
        );
      }
      if (view === 'POST') {
        console.log('POST');
        poemsStore.fromDraftToEdit({ poem });
        return navigation && navigation.navigate({ name: 'PostPoem' });
      }
    };
    return (
      <View
        style={{
          width: isDesktopOrLaptop ? 500 : turnOffViewWitdht ? null : width,
          borderRadius: 30
        }}
      >
        {/* http://localhost:4000/public/img/imgdisnetjy-6fa8df10-51b5-11ea-adbe-01c007ff9125.jpg */}
        <Card
          style={{
            alignSelf: 'center',
            width: isDesktopOrLaptop ? 480 : width * 0.9,
            marginTop: 10,
            marginBottom: 10,
            borderRadius: 20,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            elevation: 7
          }}
          onPress={() => whereToNavigate()}
        >
          {poem.photoURL ? (
            <Card.Cover
              style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
              source={{
                uri: `${liveEndPoint}/public/img/${
                  poem.photoURL
                    ? poem.photoURL
                    : 'imgdisnetjy-6fa8df10-51b5-11ea-adbe-01c007ff9125.jpg'
                }`
              }}
            />
          ) : null}
          {poem.isDraft ? (
            <Chip
              onPress={() => {
                poemsStore.fromDraftToEdit({ poem });
                return navigation && navigation.navigate({ name: 'PostPoem' });
              }}
              style={{
                position: 'absolute',
                top: 10,
                left: 10,
                backgroundColor: 'rgb(255, 121, 198)'
              }}
              icon="information"
            >
              Draft Mode
            </Chip>
          ) : null}
          <>
            <Headline
              style={{
                paddingLeft: 12,
                paddingTop: 8,
                fontSize: poemsStore.handDrawnFont ? 26 : 22,
                fontFamily: poemsStore.handDrawnFont
                  ? 'Reenie-Beanie'
                  : 'raleway-extraBold',

                opacity: 0.9
              }}
            >
              {poem.title}
            </Headline>
            {/* <TouchableHighlight
              onPress={() => {
                poem.handle &&
                  Linking.openURL(`https://instagram.com/${poem.handle}`);
              }}
            > */}
            <Subheading
              style={{
                paddingLeft: 12,
                fontSize: poemsStore.handDrawnFont ? 16 : 12,
                fontFamily: poemsStore.handDrawnFont
                  ? 'Reenie-Beanie'
                  : 'raleway-extraBold',

                opacity: 0.9
              }}
            >
              {`by: ${poem.handle ? poem.handle : 'ANON'}`}
            </Subheading>
            {/* </TouchableHighlight> */}
          </>
          <Card.Content>
            <Markdown
              style={{
                text: {
                  fontSize: poemsStore.handDrawnFont ? 20 : 14,
                  fontFamily: poemsStore.handDrawnFont
                    ? 'Reenie-Beanie'
                    : 'raleway-regular'
                }
              }}
            >
              {poem.bodyText}
            </Markdown>
          </Card.Content>
          <Card.Actions>
            <View style={styles.actionView}>
              <View style={styles.preference}>
                <Caption
                  style={{
                    fontFamily: poemsStore.handDrawnFont
                      ? 'Reenie-Beanie'
                      : 'raleway-extraBold'
                  }}
                >
                  {moment(poem.date).format(`MMM'YY`)}
                </Caption>
                <View pointerEvents="none">
                  <Caption
                    style={{
                      fontFamily: poemsStore.handDrawnFont
                        ? 'Reenie-Beanie'
                        : 'raleway-extraBold'
                    }}
                  >
                    Open Poem
                  </Caption>
                </View>
              </View>
            </View>
          </Card.Actions>
        </Card>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  actionView: {
    flex: 1,
    fontFamily: 'raleway-extraBold'
  },

  preference: {
    fontFamily: 'raleway-extraBold',
    fontSize: 12,
    opacity: 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16
  }
});

export default CardPoem;
