import React from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useQuery } from '@apollo/react-hooks';
import { RootStoreContext } from '../../store/RootStore';
import { Text, Surface } from 'react-native-paper';

const APoemScreen = observer(({ route, navigation }) => {
  const { poemId } = route.params;
  const { poemsStore } = React.useContext(RootStoreContext);
  React.useEffect(() => {
    console.log('MOUNT');
  }, []);
  const { loading, error, data } = useQuery(poemsStore.getAPoem, {
    variables: { id: poemId }
  });
  if (loading) {
    return <Text>Loading</Text>;
  }
  return (
    <View>
      <Surface>
        <Text>{data.poem.title}</Text>
      </Surface>
    </View>
  );
});

export default APoemScreen;
