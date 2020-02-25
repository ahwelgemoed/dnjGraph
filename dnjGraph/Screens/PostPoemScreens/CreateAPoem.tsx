import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import TitleAndBody from '../../Components/PostPoemComponents/TitleAndBody';
import ImageSelector from '../../Components/PostPoemComponents/ImageSelector';
import PoemOptions from '../../Components/PostPoemComponents/PoemOptions';
import SelectImageModal from '../../Components/PostPoemComponents/SelectImageModal';

const { width, height } = Dimensions.get('window');
const CreateAPoem = () => {
  return (
    <KeyboardAwareScrollView
      style={{
        width,
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 16
      }}
    >
      <TitleAndBody />
      <SelectImageModal>
        <ImageSelector />
      </SelectImageModal>
      <PoemOptions />
    </KeyboardAwareScrollView>
  );
};

export default CreateAPoem;
