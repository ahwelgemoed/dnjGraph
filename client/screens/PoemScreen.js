import React from 'react';
import { View, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useQuery } from '@apollo/react-hooks';
import { RootStoreContext } from '../store/RootStore';
import { Text, Surface } from 'react-native-paper';

import PoemsLoading from '../components/LoadingComponents/PoemsLoading';
const PoemScreen = observer(({ route, navigation }) => {
  const { poemId } = route.params;
  const { poemsStore } = React.useContext(RootStoreContext);
  React.useEffect(() => {
    // console.log('MOUNT');
  }, []);
  const { loading, error, data } = useQuery(poemsStore.getAPoem, {
    variables: { id: poemId }
  });
  // Do a Get To Get all Of The Poem poemId
  // console.log(poemId);

  if (loading || !data) return <PoemsLoading />;
  if (error) return <Text>Error</Text>;

  return (
    <View style={styles.mainLayout}>
      <Surface>
        <Text>{data.poem.title}</Text>
      </Surface>
    </View>
  );
});
const styles = StyleSheet.create({
  mainLayout: {
    flex: 1,
    // justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16
  }
});

export default PoemScreen;
