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

const { width, height } = Dimensions.get('window');

const SelectImageModal = props => {
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
      {/* <Surface style={{ marginTop: 10 }} onPress={onOpen}>
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
      </Surface> */}

      <Modalize
        ref={modalRef}
        scrollViewProps={{
          showsVerticalScrollIndicator: false
          // stickyHeaderIndices: [0]
        }}
        modalStyle={{
          position: 'absolute',
          // bottom: 0,
          // height: height * 0.7,
          alignSelf: 'center',
          width: Dimensions.get('window').width * 0.94
        }}
      >
        {props.children}
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

export default SelectImageModal;
