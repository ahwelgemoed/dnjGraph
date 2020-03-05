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
const UserPoemScreen = observer(({ navigation }) => {
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
  const { loading, error, data, refetch } = useQuery(poemsStore.getAusersPoems);
  if (loading) return <LoadingComponent />;
  if (error) return <ErrorComponent handleError={refetch} />;

  return (
    <View style={[styles.mainLayout]}>
      {data && data.myPoems && data.myPoems.totalDocs > 0 ? (
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={data.myPoems.poems}
          renderItem={({ item }) => (
            <CardPoem poem={item} navigation={navigation} view={'NONE'} />
          )}
          keyExtractor={item => item.id}
        />
      ) : (
        <View style={styles.mainLayout}>
          <Card>
            <Card.Content>
              <Headline>You have No Poems Posted</Headline>
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

export { UserPoemScreen };
