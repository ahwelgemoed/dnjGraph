import React from 'react';
import { RootStoreContext } from '../store/RootStore';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { observer } from 'mobx-react-lite';
import TitleandBody from '../components/PostPoem/TitleandBody';
import OptionsOfPoem from '../components/PostPoem/OptionsOfPoem';
const { width, height } = Dimensions.get('window');

const PostPoemScreenWeb = observer(({ navigation }) => {
  const { poemsStore } = React.useContext(RootStoreContext);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
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

export default PostPoemScreenWeb;
