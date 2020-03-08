import React from 'react';
import {
  View,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Linking
} from 'react-native';
import moment from 'moment';
import { useQuery } from '@apollo/react-hooks';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../store/RootStore';
import { Text, Caption, Card, Headline, Subheading } from 'react-native-paper';
import { useMediaQuery } from 'react-responsive';
import Markdown from 'react-native-markdown-display';
const { width, height } = Dimensions.get('window');
import LoadingComponent from '../../components/UtilComponents/LoadingComponent';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { liveEndPoint } from '../../helpers';

import { MaterialCommunityIcons } from '@expo/vector-icons';
const APoemScreen = observer(({ route, navigation }) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  });
  const { poemId } = route.params;
  const { poemsStore } = React.useContext(RootStoreContext);
  React.useEffect(() => {
    // console.log('MOUNT');
  }, []);
  const { loading, error, data } = useQuery(poemsStore.getAPoem, {
    variables: { id: poemId }
  });
  if (loading) {
    return <LoadingComponent />;
  }
  // console.log(route.params);

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center' }}
      style={{
        flex: 1
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          width: isDesktopOrLaptop ? 800 : width,
          borderRadius: 30
        }}
      >
        <ImageBackground
          style={{
            flex: 1,
            paddingTop: 10,
            height: height * 0.6
          }}
          source={{
            uri: `${liveEndPoint}/public/img/${
              data.poem.photoURL ? data.poem.photoURL : null
            }`
          }}
        />

        <View
          style={{
            backgroundColor: 'rgba(255,255,255,0.95)',
            marginTop: isDesktopOrLaptop ? height * 0.45 : -height * 0.15,

            width: isDesktopOrLaptop ? 480 : width * 0.9,
            alignContent: 'center',
            alignSelf: 'center',

            marginBottom: 10,
            borderRadius: 20,
            shadowColor: 'rgba(0,0,0,0.8)',
            shadowOffset: {
              width: 0,
              height: 3
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            elevation: 7
          }}
        >
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
              {data.poem.title}
            </Headline>
            <TouchableHighlight
              onPress={() => {
                data.poem.handle &&
                  Linking.openURL(`https://instagram.com/${data.poem.handle}`);
              }}
            >
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
                {`by: ${data.poem.handle ? data.poem.handle : 'ANON'}`}
              </Subheading>
            </TouchableHighlight>
          </>
          {/* <ScrollView
            style={{ flex: 1 }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          > */}
          <Card.Content style={{ marginBottom: 60 }}>
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
              {data.poem.bodyText}
            </Markdown>
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
              {data.poem.bodyText}
            </Markdown>
          </Card.Content>
          {/* </ScrollView> */}
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              backgroundColor: 'rgba(255,255,255,0.95)',
              width: '100%',
              borderRadius: 20
            }}
          >
            <View style={styles.actionView}>
              <View style={styles.preference}>
                <Caption
                  style={{
                    fontSize: poemsStore.handDrawnFont ? 20 : 10,
                    fontFamily: poemsStore.handDrawnFont
                      ? 'Reenie-Beanie'
                      : 'raleway-regular'
                  }}
                >
                  {moment(data.poem.date).format(`MMM'YY`)}
                </Caption>
                <View pointerEvents="none">
                  <Caption
                    style={{
                      fontSize: poemsStore.handDrawnFont ? 20 : 12,
                      fontFamily: poemsStore.handDrawnFont
                        ? 'Reenie-Beanie'
                        : 'raleway-regular'
                    }}
                  >
                    Coming Soon
                    <MaterialCommunityIcons name="bookmark-outline" size={12} />
                  </Caption>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
});

const markDownStyles = StyleSheet.create({
  text: {
    fontFamily: 'raleway-regular'
  }
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  notBlurred: {
    ...StyleSheet.absoluteFillObject,
    top: height * 0.3,
    width: width * 0.8,
    alignSelf: 'center',
    backgroundColor: 'transparent'
  },
  actionView: {
    flex: 1
  },

  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16
  }
});

export default APoemScreen;
