import React, { useRef, useContext, useState } from 'react';
import { View, Text, Dimensions, ImageBackground } from 'react-native';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../store/RootStore';
import { Surface, Button } from 'react-native-paper';

import TitleAndBody from '../../Components/PostPoemComponents/TitleAndBody';
import ImageSelector from '../../Components/PostPoemComponents/ImageSelector';
import PoemOptions from '../../Components/PostPoemComponents/PoemOptions';
import SelectImageModal from '../../Components/PostPoemComponents/SelectImageModal';
import PoemReViewModal from '../../Components/PostPoemComponents/PoemReViewModal';
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const CreateAPoem = observer(() => {
  const childRefImage = useRef(null);
  const childRefReview = useRef(null);
  const { poemsStore } = useContext(RootStoreContext);
  const [state, setstate] = useState(false);
  // console.log(selectedImage);
  // console.log(poemsStore.poemImage);
  const modalState = () => {
    console.log('modalStatemodalState');

    setstate(false);
  };
  const onOpen = () => {
    const modal = childRefImage.current;
    if (modal) {
      modal.open();
    }
  };
  const onOpenReview = () => {
    const modal = childRefReview.current;
    if (modal) {
      modal.open();
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <SelectImageModal
        forwardedRef={childRefImage}
        onOpenProp={state}
        modalState={modalState}
      />
      <PoemReViewModal
        forwardedRef={childRefReview}
        onOpenProp={state}
        modalState={modalState}
      />
      <ScrollView
        style={{
          width,
          flex: 1,
          paddingVertical: 16,
          paddingHorizontal: 16
        }}
      >
        <TitleAndBody />
        <Surface style={{ marginTop: 20 }}>
          {poemsStore.poemImage ? (
            <ImageBackground
              style={{
                height: 200,
                paddingTop: 10
              }}
              source={{
                uri: `http://localhost:4000/public/img/${poemsStore.poemImage}`
              }}
            />
          ) : null}
        </Surface>
        <Surface
          style={{
            marginTop: 5
          }}
        >
          <Button mode="outlined" icon="camera" onPress={onOpen}>
            Select Image
          </Button>
        </Surface>
        <PoemOptions />

        <Surface
          style={{
            marginTop: 20
          }}
        >
          <Button mode="outlined" icon="pencil" onPress={onOpenReview}>
            Review and Post Poem
          </Button>
        </Surface>
      </ScrollView>
    </View>
  );
});

export default CreateAPoem;
