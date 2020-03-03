import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import {
  Surface,
  Chip,
  Button,
  Card,
  Title,
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

        return navigation && navigation.navigate('PostPoem');
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
          <Card.Title
            title={poem.title}
            subtitle={`by: ${poem.handle ? poem.handle : 'ANON'}`}
            titleStyle={{
              fontFamily: 'raleway-boldI',
              fontSize: 20,
              opacity: 0.8
            }}
          />
          <Card.Content>
            <Markdown>{poem.bodyText}</Markdown>
          </Card.Content>
          <Card.Actions>
            <Caption>{moment(poem.date).format(`MMM'YY`)}</Caption>
          </Card.Actions>
        </Card>
      </View>
    );
  }
);

export default CardPoem;
