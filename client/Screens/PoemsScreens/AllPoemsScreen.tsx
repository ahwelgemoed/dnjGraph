import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, Dimensions, Platform } from 'react-native';
import { Text, Subheading, Headline, Chip, FAB } from 'react-native-paper';
import '@expo/match-media';
import { observer } from 'mobx-react-lite';
import { useQuery } from '@apollo/react-hooks';

import { RootStoreContext } from '../../store/RootStore';
import ErrorComponent from '../../components/UtilComponents/ErrorComponent';
import LoadingComponent from '../../components/UtilComponents/LoadingComponent';
import CardPoem from '../../components/CardComponents/CardPoem';
import AppIntroNotification from '../../components/UtilComponents/AppIntroNotification';

interface Props {
  navigation: any;
}
type IState = {
  limit: number;
  page?: number;
};

const PoemsScreen: React.FC<Props> = observer(({ navigation }) => {
  const { poemsStore, authStore } = React.useContext(RootStoreContext);
  const [pagination, setpagination] = React.useState<IState>({
    limit: 10,
    page: 1,
  });

  useEffect(() => {
    authStore.getUserFromGraph();
  }, []);
  const { loading, error, data, refetch, fetchMore } = useQuery(
    poemsStore.getAllPoems,
    {
      variables: { limit: 10, page: pagination.page },
    }
  );

  useEffect(() => {
    poemsStore.reFetchPoem && refetch();
  }, [poemsStore.reFetchPoem]);
  const _handleLoadMore = () => {
    if (data.poems) {
      fetchMore({
        variables: {
          limit: pagination.limit + 2,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return Object.assign({}, prev, {
            poems: fetchMoreResult.poems,
          });
        },
      });
      setpagination({ limit: pagination.limit + 10 });
    }
  };
  if (loading) return <LoadingComponent />;
  if (error) return <ErrorComponent handleError={refetch} error={error} />;
  // console.log(data?.poems?.totalDocs);
  const headerCard = () => {
    return (
      <View
        style={{
          paddingVertical: 16,
          paddingHorizontal: 16,
        }}
      >
        <Chip
          textStyle={{ textAlign: 'center' }}
          icon="heart"
          onPress={() => console.log('Pressed')}
        >
          {data && data.poems && data.poems.totalDocs} poems since 2018 - Dankie
          👏🏽🥳👏🏽
        </Chip>
      </View>
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
                right: 50,
              }}
            />
          </>
        )}
        {data && data.poems ? (
          <FlatList
            maxToRenderPerBatch={4}
            initialNumToRender={4}
            ListHeaderComponent={headerCard}
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
            keyExtractor={(item) => item.id}
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
    justifyContent: 'center',
  },
});
export default PoemsScreen;
