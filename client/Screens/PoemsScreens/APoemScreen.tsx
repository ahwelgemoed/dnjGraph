import React from 'react';
import { View, Dimensions, ImageBackground, StyleSheet } from 'react-native';
import moment from 'moment';
import { useQuery } from '@apollo/react-hooks';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../store/RootStore';
import { Text, Caption, Card } from 'react-native-paper';
import { useMediaQuery } from 'react-responsive';
import { BlurView } from 'expo-blur';
import Markdown from 'react-native-markdown-display';
const { width, height } = Dimensions.get('window');
import LoadingComponent from '../../components/LoadingComponent';
import { ScrollView } from 'react-native-gesture-handler';
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
    <View
      style={{
        flex: 1,
        alignItems: 'center'
      }}
    >
      <View
        style={{
          flex: 1,
          // alignItems: 'center',
          justifyContent: 'center',
          width: isDesktopOrLaptop ? 800 : width,
          borderRadius: 30
          // alignItems: 'center'
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
              data.poem.photoURL
                ? data.poem.photoURL
                : 'imgdisnetjy-6fb1dfc0-51b5-11ea-adbe-01c007ff9125.jpg'
            }`
          }}
        />

        {/* <BlurView tint="light" intensity={50} style={styles.notBlurred}> */}
        <View
          style={{
            backgroundColor: 'rgba(255,255,255,0.9)',
            position: 'absolute',
            top: height * 0.2,
            height: height * 0.56,
            width: isDesktopOrLaptop ? 480 : width * 0.9,
            alignContent: 'center',
            alignSelf: 'center',
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
        >
          <Card.Title
            title={data.poem.title}
            subtitle={`by: ${data.poem.handle}`}
            titleStyle={{
              fontFamily: 'raleway-boldI',
              fontSize: 20,
              opacity: 0.8
            }}
          />
          <ScrollView
            style={{ flex: 1 }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <Card.Content style={{ marginBottom: 60 }}>
              <Markdown style={markDownStyles}>{data.poem.bodyText}</Markdown>
              <Text>{data.poem.bodyText}</Text>
            </Card.Content>
          </ScrollView>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              backgroundColor: 'rgba(255,255,255,0.9)',
              width: '100%',
              borderRadius: 20
            }}
          >
            <View style={styles.actionView}>
              <View style={styles.preference}>
                <Caption>{moment(data.poem.date).format(`MMM'YY`)}</Caption>
                <View pointerEvents="none">
                  <Caption>
                    Coming Soon
                    <MaterialCommunityIcons name="bookmark-outline" size={12} />
                  </Caption>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* </BlurView> */}
      </View>
    </View>
  );
});

const markDownStyles = StyleSheet.create({
  text: {
    fontFamily: 'raleway-medium'
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
