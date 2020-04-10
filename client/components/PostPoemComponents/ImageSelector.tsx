import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  Platform,
  Dimensions,
} from 'react-native';
import LoadingComponent from '../UtilComponents/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../store/RootStore';
import { IconButton, List } from 'react-native-paper';
import { liveEndPoint } from '../../helpers';
import dnj from '../../assets/images/DNJICON.png';

interface Props {
  onClose: () => any;
}
const ImageSelector: React.FC<Props> = observer(({ onClose }) => {
  const { poemsStore } = React.useContext(RootStoreContext);
  const [images, setimages] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    if (poemsStore.poemImage) {
      setSelectedImage(poemsStore.poemImage);
    }
    fetch(`${liveEndPoint}/v1/getAllImages`).then((res) => {
      res.json().then((data) => setimages(data));
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

  return (
    <>
      {images ? (
        <FlatList
          maxToRenderPerBatch={1}
          initialNumToRender={2}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={10}
          data={images}
          renderItem={({ item, index }) => {
            return (
              <View
                key={index}
                onPress={() => {
                  setSelectedImage(item);
                }}
              >
                <ImageBackground
                  defaultSource={require('../../assets/images/DNJICON.png')}
                  imageStyle={{
                    // width: Dimensions.get('window').width,
                    borderRadius: 20,
                  }}
                  style={{
                    alignSelf: 'center',
                    marginTop: 16,
                    width: Dimensions.get('window').width / 1.2,
                    height: 250,
                  }}
                  source={{
                    uri: `${liveEndPoint}/public/img/${item}`,
                  }}
                >
                  <IconButton
                    onPress={() => {
                      setSelectedImage(item);
                    }}
                    value={item}
                    size={150}
                    style={{
                      opacity: selectedImage === item ? 0.8 : 0.2,
                      width: Dimensions.get('window').width / 1.2,
                      position: 'absolute',
                      left: 0,
                    }}
                    color="white"
                    icon={selectedImage === item ? 'check' : 'check-outline'}
                  />
                </ImageBackground>
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <LoadingComponent />
      )}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  padding: {
    paddingHorizontal: 16,
  },

  grid: {
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    flexWrap: 'wrap',
    padding: 2,
  },

  photo: {
    flex: 1,
    resizeMode: 'cover',
  },
  fab: {
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 9999,
    bottom: 0,
    margin: 16,
  },
});
export default ImageSelector;

// <ScrollView
//   showsHorizontalScrollIndicator={false}
//   showsVerticalScrollIndicator={false}
//   style={{ maxHeight: Platform.OS === 'web' ? 350 : '100%' }}
// >
//   <List.Section>
//     <View style={styles.grid}>
//       {images ? (
//         images.map(image => {
//           return (
//             <View
//               key={image}
//               onPress={() => {
//                 setSelectedImage(image);
//               }}
//             >
//               <ImageBackground
//                 imageStyle={{
//                   width: '100%',
//                   borderRadius: 20
//                 }}
//                 style={{
//                   marginTop: 10,
//                   width: Dimensions.get('window').width / 1.2,
//                   height: 150
//                 }}
//                 source={{
//                   uri: `${liveEndPoint}/public/img/${image}`
//                 }}
//               >
//                 <IconButton
//                   onPress={() => {
//                     setSelectedImage(image);
//                   }}
//                   value={image}
//                   size={100}
//                   style={{
//                     opacity: selectedImage === image ? 0.8 : 0.2,
//                     width: Dimensions.get('window').width / 1.2,
//                     position: 'absolute',
//                     left: 0
//                   }}
//                   color="white"
//                   icon={selectedImage === image ? 'check' : 'check-outline'}
//                 />
//               </ImageBackground>
//             </View>
//           );
//         })
//       ) : (
//         <LoadingComponent />
//       )}
//     </View>
//   </List.Section>
// </ScrollView>
