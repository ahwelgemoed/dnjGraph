import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import {
  Surface,
  Chip,
  Button,
  Card,
  Title,
  Paragraph
} from 'react-native-paper';
import moment from 'moment';
import Markdown from 'react-native-markdown-display';
import { useMediaQuery } from 'react-responsive';
const { width, height } = Dimensions.get('window');

const CardPoem = ({ poem, navigation = null, turnOffViewWitdht }) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  });
  // console.log(poem.date);
  // <View style={{ maxWidth: isDesktopOrLaptop ? 500 : '100%' }}>
  return (
    // <View style={{ width: width, borderRadius: 30 }}>
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
        onPress={() =>
          navigation &&
          navigation.push('APoem', {
            poemId: poem.id
          })
        }
      >
        <Card.Cover
          style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
          source={{
            uri: `http://localhost:4000/public/img/${
              poem.photoURL
                ? poem.photoURL
                : 'imgdisnetjy-6fa8df10-51b5-11ea-adbe-01c007ff9125.jpg'
            }`
          }}
        />
        <Card.Title
          title={poem.title}
          subtitle={`by: ${poem.handle}`}
          titleStyle={{
            fontFamily: 'raleway-boldI',
            fontSize: 30,
            opacity: 0.8
          }}
          // style={{
          //   top: -190,
          //   left: 0,
          //   zIndex: 10
          // }}
          // left={props => <Avatar.Icon {...props} icon="folder" />}
        />
        <Card.Content>
          <Markdown>{poem.bodyText}</Markdown>
        </Card.Content>
        <Card.Actions>
          {poem.isDraft ? <Chip icon="information">Draft Mode</Chip> : null}

          {/* <Button>Cancel</Button>
          <Button>Ok</Button> */}
        </Card.Actions>
      </Card>
    </View>
  );
};

export default CardPoem;
