import React from 'react';
import { View, Dimensions, ImageBackground, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useQuery } from '@apollo/react-hooks';
import { RootStoreContext } from '../../store/RootStore';
import { Text, Surface, Card } from 'react-native-paper';
import { useMediaQuery } from 'react-responsive';
import { BlurView } from 'expo-blur';
import Markdown from 'react-native-markdown-display';
const { width, height } = Dimensions.get('window');
import LoadingComponent from '../../Components/LoadingComponent';
import { ScrollView } from 'react-native-gesture-handler';

const APoemScreen = observer(({ route, navigation }) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  });
  const { poemId } = route.params;
  const { poemsStore } = React.useContext(RootStoreContext);
  React.useEffect(() => {
    console.log('MOUNT');
  }, []);
  const { loading, error, data } = useQuery(poemsStore.getAPoem, {
    variables: { id: poemId }
  });
  if (loading) {
    return <Text>Loading</Text>;
  }
  console.log(data.poem);

  return (
    <View
      style={{
        flex: 1,
        width: isDesktopOrLaptop ? 500 : width,
        borderRadius: 30,
        justifyContent: 'center'

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
          uri: `http://localhost:4000/public/img/${
            data.poem.photoURL
              ? data.poem.photoURL
              : 'imgdisnetjy-6fb1dfc0-51b5-11ea-adbe-01c007ff9125.jpg'
          }`
        }}
      />

      {/* <BlurView tint="light" intensity={50} style={styles.notBlurred}> */}
      <Card
        style={{
          backgroundColor: 'rgba(255,255,255,0.9)',
          position: 'absolute',
          top: height * 0.2,
          height: height * 0.6,
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
        <ScrollView
          style={{ flex: 1 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
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
          <Card.Content>
            <Markdown>{data.poem.bodyText}</Markdown>
          </Card.Content>
          <Card.Actions></Card.Actions>
        </ScrollView>
      </Card>
      {/* </BlurView> */}
    </View>
  );
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
  }
});

export default APoemScreen;
