import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Platform,
  ScrollView,
} from "react-native";
import { FAB } from "react-native-paper";
import "@expo/match-media";
import { observer } from "mobx-react-lite";
import { useQuery } from "@apollo/react-hooks";

import { RootStoreContext } from "../../store/RootStore";
import ErrorComponent from "../../components/UtilComponents/ErrorComponent";
import LoadingComponent from "../../components/UtilComponents/LoadingComponent";
import CardPoem from "../../components/CardComponents/CardPoem";

const { width, height } = Dimensions.get("window");

interface Props {
  navigation: any;
}
type IState = {
  limit: number;
  page?: number;
};

const RandomPoem: React.FC<Props> = observer(({ navigation }) => {
  const ref = useRef();
  const { poemsStore, authStore } = React.useContext(RootStoreContext);
  const { loading, error, data, refetch } = useQuery(poemsStore.getARandomPoem);

  useEffect(() => {
    // authStore.getUserFromGraph();
    console.log("data.poems", ref.current);
    if (ref && ref.current) {
      //@ts-ignore
      ref.current.scrollTo({
        x: 0,
        y: 0,
        animated: true,
      });
    }
  }, [data]);

  if (loading) return <LoadingComponent />;
  if (error) return <ErrorComponent handleError={refetch} error={error} />;
  return (
    <>
      <>
        <FAB
          onPress={() => refetch && refetch()}
          icon="repeat"
          style={{
            position: "absolute",
            backgroundColor: "#69E6D0",
            bottom: 50,
            right: 50,
            zIndex: 9999,
          }}
        />
      </>
      <ScrollView
        ref={ref}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data && data.getRandomPoem ? (
          <CardPoem
            poem={data.getRandomPoem}
            navigation={navigation}
            view={"ONE"}
          />
        ) : (
          <LoadingComponent />
        )}
      </ScrollView>
    </>
  );
});
const styles = StyleSheet.create({
  mainLayout: {
    flex: 1,
    width,
    height,

    alignItems: "center",
    justifyContent: "center",
  },
});
export default RandomPoem;
