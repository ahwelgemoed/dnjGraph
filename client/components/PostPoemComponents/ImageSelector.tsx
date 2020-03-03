import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  Platform,
  Dimensions
} from 'react-native';
import LoadingComponent from '../UtilComponents/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../store/RootStore';
import { IconButton, List } from 'react-native-paper';
import { liveEndPoint } from '../../helpers';

const ImageSelector = observer(({ onClose }) => {
  const { poemsStore } = React.useContext(RootStoreContext);
  const [images, setimages] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    if (poemsStore.poemImage) {
      setSelectedImage(poemsStore.poemImage);
    }
    fetch(`${liveEndPoint}/v1/getAllImages`).then(res => {
      res.json().then(data => setimages(data));
    });
  }, []);
  useEffect(() => {
    if (selectedImage && selectedImage !== poemsStore.poemImage) {
      poemsStore.setPoemImage(selectedImage);
      if (onClose) {
        onClose();
      }
    }
  }, [selectedImage]);
  // console.log(poemsStore.poemImage);
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={{ maxHeight: Platform.OS === 'web' ? 350 : '100%' }}
    >
      <List.Section>
        <View style={styles.grid}>
          {images ? (
            images.map(image => {
              return (
                <View
                  key={image}
                  onPress={() => {
                    setSelectedImage(image);
                  }}
                >
                  <ImageBackground
                    imageStyle={{
                      resizeMode: 'cover',
                      alignSelf: 'flex-end'
                    }}
                    style={{
                      width: Dimensions.get('window').width / 2,
                      height: 200,
                      margin: 0
                    }}
                    source={{
                      uri: `${liveEndPoint}/public/img/${image}`
                    }}
                  >
                    <IconButton
                      onPress={() => {
                        setSelectedImage(image);
                      }}
                      value={image}
                      size={150}
                      style={{
                        opacity: selectedImage === image ? 0.8 : 0.2,
                        width: Dimensions.get('window').width / 2,
                        position: 'absolute',
                        right: 0
                      }}
                      color="white"
                      icon={selectedImage === image ? 'check' : 'check-outline'}
                    />
                  </ImageBackground>
                </View>
              );
            })
          ) : (
            <LoadingComponent />
          )}
        </View>
      </List.Section>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  padding: {
    paddingHorizontal: 16
  },

  grid: {
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    flexWrap: 'wrap'
    // padding: 2
  },

  photo: {
    flex: 1,
    resizeMode: 'cover'
  },
  fab: {
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 9999,
    bottom: 0,
    margin: 16
  }
});
export default ImageSelector;
