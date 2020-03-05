import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Headline, Subheading, Card } from 'react-native-paper';
import { observer } from 'mobx-react-lite';
import { useQuery } from '@apollo/react-hooks';
import ErrorComponent from '../../components/UtilComponents/ErrorComponent';
import LoadingComponent from '../../components/UtilComponents/LoadingComponent';
import { RootStoreContext } from '../../store/RootStore';
import { useAnonMayNotSeeHook } from '../../helpers/useStateHook';
import { useIsFocused } from '@react-navigation/native';

import CardPoem from '../../components/CardComponents/CardPoem.js';
const DraftScreens = observer(({ navigation }) => {
  const { poemsStore } = React.useContext(RootStoreContext);
  const { isAnonUser } = useAnonMayNotSeeHook({
    message: 'You have sign in To have Drafts'
  });
  const isFocused = useIsFocused();
  React.useEffect(() => {
    if (isAnonUser && isFocused) {
      navigation.goBack();
    }
  }, [isFocused]);
  const { loading, error, data, refetch } = useQuery(
    poemsStore.getAusersDraftPoems
  );
  if (loading) return <LoadingComponent />;
  if (error) return <ErrorComponent handleError={refetch} />;

  return (
    <View style={[styles.mainLayout]}>
      {data && data.myDraftPoems && data.myDraftPoems.totalDocs > 0 ? (
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
        <View style={styles.mainLayout}>
          <Card>
            <Card.Content>
              <Headline>You have No Poems in Draft</Headline>
              <Subheading>
                if you want to save a poem for later - you never post it -write
                it as save it to your draft poems
              </Subheading>
            </Card.Content>
          </Card>
        </View>
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

export { DraftScreens };
