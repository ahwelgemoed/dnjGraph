import React from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import { Headline } from 'react-native-paper';
import { observer } from 'mobx-react-lite';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStoreContext } from '../store/RootStore';
import TitleandBody from '../components/PostPoem/TitleandBody';
import OptionsOfPoem from '../components/PostPoem/OptionsOfPoem';
import PhotoSelectorModal from '../components/PostPoem/PhotoSelectorModal';

const { width, height } = Dimensions.get('window');

const PostPoemScreen = observer(({ navigation }) => {
  const { poemsStore } = React.useContext(RootStoreContext);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <TitleandBody width={width} RootStoreContext={RootStoreContext} />
        <OptionsOfPoem
          navigation={navigation}
          width={width}
          height={height}
          poemsStore={poemsStore}
          RootStoreContext={RootStoreContext}
        />
      </ScrollView>
    </View>
  );
});

export default PostPoemScreen;
