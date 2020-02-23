import React, { useRef, useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { Button, IconButton, List, FAB, Surface } from 'react-native-paper';
import { Modalize } from 'react-native-modalize';

const PhotoSelectorModal = ({ height, poemsStore }) => {
  const [images, setimages] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  useEffect(() => {
    setSelectedImage(null);
    fetch('http://localhost:4000/v1/getAllImages').then(res => {
      res.json().then(data => setimages(data));
    });
  }, []);

  useEffect(() => {
    if (!selectedImage) {
      setSelectedImage(poemsStore.poemImage);
    }
  }, [poemsStore.poemImage]);
  useEffect(() => {
    poemsStore.setPoemImage(selectedImage);
  }, [selectedImage]);

  useEffect(() => {
    const modal = modalRef.current;
    if (modal) {
      modal.close();
    }
  }, [selectedImage]);
  const modalRef = useRef(null);

  const onOpen = () => {
    const modal = modalRef.current;

    if (modal) {
      modal.open();
    }
  };

  return (
    <>
      <Surface
        style={{
          marginTop: 10
        }}
      >
        <Button mode="outlined" icon="camera" onPress={onOpen}>
          Select Image
        </Button>
      </Surface>
      <Surface style={{ marginTop: 10 }} onPress={onOpen}>
        {selectedImage ? (
          <ImageBackground
            style={{
              // width: Dimensions.get('window').width,
              height: 200,
              position: 'relative',
              paddingTop: 10
            }}
            source={{
              uri: `http://localhost:4000/public/img/${selectedImage}`
            }}
          />
        ) : null}
      </Surface>

      <Modalize
        ref={modalRef}
        modalStyle={{
          height: height * 0.7,
          alignSelf: 'center',
          width: Dimensions.get('window').width * 0.94
        }}
      >
        <ScrollView>
          <List.Section title="Select Header Image">
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
                        style={{
                          width: Dimensions.get('window').width / 2,
                          height: 200,
                          margin: 0
                        }}
                        source={{
                          uri: `http://localhost:4000/public/img/${image}`
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
                          icon={
                            selectedImage === image ? 'check' : 'check-outline'
                          }
                        />
                      </ImageBackground>
                    </View>
                  );
                })
              ) : (
                <Text>No Img</Text>
              )}
            </View>
          </List.Section>
        </ScrollView>
      </Modalize>
    </>
  );
};

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

export default PhotoSelectorModal;
