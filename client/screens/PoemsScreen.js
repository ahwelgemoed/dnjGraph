import React from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Text, Surface } from 'react-native-paper';

import { observer } from 'mobx-react-lite';
import { useQuery } from '@apollo/react-hooks';
import { RootStoreContext } from '../store/RootStore';

import PoemsLoading from '../components/LoadingComponents/PoemsLoading';
import CardPoem from '../components/CardComponents/CardPoem';
import GetGraphUser from '../components/User/GetGraphUser';
import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';
const { width, height } = Dimensions.get('window');
const PoemsScreen = observer(({ navigation }) => {
  const { poemsStore, authStore } = React.useContext(RootStoreContext);
  const [pagination, setpagination] = React.useState({
    limit: 10,
    page: 1
  });

  React.useEffect(async () => {
    await authStore.getUserFromGraph();
  }, []);
  const { loading, error, data, refetch, fetchMore } = useQuery(
    poemsStore.getAllPoems,
    {
      variables: { limit: 10, page: pagination.page }
    }
  );
  React.useEffect(() => {
    refetch();
  }, [error]);
  if (loading) return <PoemsLoading />;
  if (error) return <Text onPress={() => refetch()}>Error</Text>;
  const _handleLoadMore = () => {
    if (data.poems) {
      fetchMore({
        variables: {
          limit: pagination.limit + 2
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return Object.assign({}, prev, {
            poems: fetchMoreResult.poems
          });
        }
      });
      setpagination({ limit: pagination.limit + 10 });
    }
  };
  return (
    <View style={styles.mainLayout}>
      <GetGraphUser authStore={authStore} />
      {data && data.poems ? (
        <FlatList
          onEndReached={_handleLoadMore}
          onEndReachedThreshold={200}
          data={data.poems.poems}
          renderItem={({ item }) => (
            <CardPoem poem={item} navigation={navigation} />
          )}
          keyExtractor={item => item.id}
        />
      ) : (
        <PoemsLoading />
      )}
    </View>
  );
});
const styles = StyleSheet.create({
  mainLayout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default PoemsScreen;
