import React from 'react';
import { View, Text } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

const GetGraphUser = ({ authStore }) => {
  const { loading, error, data, refetch } = useQuery(authStore.getAUser, {
    variables: { id: authStore.userFirebaseUI }
  });
  React.useEffect(() => {
    authStore.setUserFromGraph(data);
  }, [data]);

  return <View>{/* <Text>GetGraphUser</Text> */}</View>;
};

export default GetGraphUser;
