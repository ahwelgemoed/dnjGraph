import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import {
  Headline,
  Subheading,
  Card,
  Surface,
  Button
} from 'react-native-paper';
import { observer } from 'mobx-react-lite';
import { useQuery } from '@apollo/react-hooks';
import ErrorComponent from '../../components/UtilComponents/ErrorComponent';
import LoadingComponent from '../../components/UtilComponents/LoadingComponent';
import { RootStoreContext } from '../../store/RootStore';
import { useAnonMayNotSeeHook } from '../../helpers/useStateHook';
import { useIsFocused } from '@react-navigation/native';

import CardPoem from '../../components/CardComponents/CardPoem.js';

interface Props {
  navigation: any;
}

const DraftScreens: React.FC<Props> = observer(({ navigation }) => {
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
  const headerCard = () => {
    return (
      <>
        <Surface
          style={{
            marginTop: 20,
            width: '60%',
            alignSelf: 'center'
          }}
        >
          <Button mode="text" onPress={() => refetch()}>
            Refresh
          </Button>
        </Surface>
      </>
    );
  };
  return (
    <View style={[styles.mainLayout]}>
      {data && data.myDraftPoems && data.myDraftPoems.totalDocs > 0 ? (
        <FlatList
          ListHeaderComponent={headerCard}
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
              <Headline>You dont have any poems in Draft</Headline>
              <Subheading>
                if you want to save a poem for later - or never post it -write
                and save it as a draft
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
