import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, Dimensions, Platform } from 'react-native';
import { Text, Subheading, Headline, Portal, FAB } from 'react-native-paper';

import { observer } from 'mobx-react-lite';
import { useQuery } from '@apollo/react-hooks';
import { RootStoreContext } from '../../store/RootStore';
import ErrorComponent from '../../components/UtilComponents/ErrorComponent';
import LoadingComponent from '../../components/UtilComponents/LoadingComponent';
import CardPoem from '../../components/CardComponents/CardPoem';
import '@expo/match-media';
import AppIntroNotification from '../../components/UtilComponents/AppIntroNotification';
const { width, height } = Dimensions.get('window');
const PoemsScreen = observer(({ navigation }) => {
  const { poemsStore, authStore } = React.useContext(RootStoreContext);
  const [pagination, setpagination] = React.useState({
    limit: 10,
    page: 1
  });

  useEffect(() => {
    authStore.getUserFromGraph();
  }, []);
  const { loading, error, data, refetch, fetchMore } = useQuery(
    poemsStore.getAllPoems,
    {
      variables: { limit: 10, page: pagination.page }
    }
  );

  useEffect(() => {
    poemsStore.reFetchPoem && refetch();
  }, [poemsStore.reFetchPoem]);
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
  if (loading) return <LoadingComponent />;
  if (error) return <ErrorComponent handleError={refetch} error={error} />;
  const headerCard = () => {
    return (
      <>
        <Headline>WELCOME</Headline>
        <Subheading>BE BETTER</Subheading>
      </>
    );
  };
  return (
    <>
      <AppIntroNotification />
      <View style={[styles.mainLayout]}>
        {Platform.OS === 'web' && (
          <>
            <FAB
              onPress={() => navigation.navigate({ name: 'PostPoem' })}
              icon="feather"
              style={{
                position: 'absolute',
                bottom: 50,
                right: 50
              }}
            />
          </>
        )}
        {data && data.poems ? (
          <FlatList
            maxToRenderPerBatch={1}
            initialNumToRender={2}
            // ListHeaderComponent={headerCard}
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
    </>
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
