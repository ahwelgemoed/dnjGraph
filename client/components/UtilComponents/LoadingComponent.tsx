import React from 'react';
import { View, Image } from 'react-native';

import dnj from '../../assets/images/DNJLOADING.gif';
import splash from '../../assets/images/splash.gif';

interface Props {
  initialApp?: boolean;
}
const LoadingComponent: React.FC<Props> = ({ initialApp }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: initialApp ? '#000' : '#fff',
      }}
    >
      <Image
        source={initialApp ? splash : dnj}
        style={{ width: 300, height: 300 }}
      />
    </View>
  );
};

export default LoadingComponent;
