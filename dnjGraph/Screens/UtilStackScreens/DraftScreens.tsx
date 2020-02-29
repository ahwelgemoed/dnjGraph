import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useQuery } from '@apollo/react-hooks';
import { RootStoreContext } from '../../store/RootStore';

import CardPoem from '../../Components/CardComponents/CardPoem.js';
const DraftScreens = observer(({ navigation }) => {
  const { poemsStore } = React.useContext(RootStoreContext);
  // getAusersDraftPoems
  const { loading, error, data } = useQuery(poemsStore.getAusersDraftPoems);

  return (
    <View>
      {data && data ? (
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={data.myDraftPoems.poems}
          renderItem={({ item }) => (
            <CardPoem poem={item} navigation={navigation} view={'POST'} />
          )}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text>Loading</Text>
      )}
    </View>
  );
});

export { DraftScreens };
