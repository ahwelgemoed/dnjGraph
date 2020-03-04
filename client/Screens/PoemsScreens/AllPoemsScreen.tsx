import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Text, Surface } from 'react-native-paper';

import { observer } from 'mobx-react-lite';
import { useQuery } from '@apollo/react-hooks';
import { RootStoreContext } from '../../store/RootStore';
import ErrorComponent from '../../components/UtilComponents/ErrorComponent';
import LoadingComponent from '../../components/UtilComponents/LoadingComponent';
import CardPoem from '../../components/CardComponents/CardPoem';
import '@expo/match-media';
const { width, height } = Dimensions.get('window');
const PoemsScreen = observer(({ navigation }) => {
  const { poemsStore, authStore } = React.useContext(RootStoreContext);
  const [pagination, setpagination] = React.useState({
    limit: 10,
    page: 1
  });

  useEffect(async () => {
    await authStore.getUserFromGraph();
  }, []);
  const { loading, error, data, refetch, fetchMore } = useQuery(
    poemsStore.getAllPoems,
    {
      variables: { limit: 10, page: pagination.page }
    }
  );
  useEffect(() => {
    refetch();
  }, [error]);
  const _handleLoadMore = () => {
    console.log('🔥 : _handleLoadMore was Called');
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
  if (loading) return <LoadingComponent />;
  if (error) return <ErrorComponent handleError={refetch} />;
  return (
    <View style={[styles.mainLayout]}>
      {data && data.poems ? (
        <FlatList
          onRefresh={() => refetch()}
          refreshing={loading}
          onEndReached={_handleLoadMore}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={10}
          data={data.poems.poems}
          renderItem={({ item }) => (
            <CardPoem poem={item} navigation={navigation} view={'ONE'} />
          )}
          keyExtractor={item => item.id}
        />
      ) : (
        <LoadingComponent />
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