import React, { useRef, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Button, IconButton, List, FAB, Surface } from 'react-native-paper';

import { Modalize } from 'react-native-modalize';
import ReviewPoemandPost from './ReviewPoemandPost';

const { width, height } = Dimensions.get('window');

const SelectImageModal = props => {
  const modalRef = useRef(null);

  const onClose = () => {
    const modal = props.forwardedRef.current;
    if (modal) {
      modal.close();
    }
  };

  return (
    <>
      <Modalize
        ref={props.forwardedRef}
        scrollViewProps={{
          showsVerticalScrollIndicator: false
        }}
        modalStyle={{
          height: height * 0.7,
          alignSelf: 'center',
          width: Dimensions.get('window').width * 0.94
        }}
      >
        <ReviewPoemandPost navigation={props.navigation} />
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
