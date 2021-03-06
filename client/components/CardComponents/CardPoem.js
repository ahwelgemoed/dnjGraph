import React, { useRef } from "react";
import {
  View,
  Linking,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Surface,
  Chip,
  Text,
  Button,
  Subheading,
  Card,
  Headline,
  Caption,
  Paragraph,
} from "react-native-paper";
import moment from "moment";
import Markdown from "react-native-markdown-display";
import { useMediaQuery } from "react-responsive";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../store/RootStore";
import { liveEndPoint } from "../../helpers";
import { useHover, useFocus, useActive } from "react-native-web-hooks";
const { width, height } = Dimensions.get("window");
// ReenieBeanie
const CardPoem = observer(
  ({ poem, navigation = null, turnOffViewWitdht, view }) => {
    const { poemsStore } = React.useContext(RootStoreContext);
    const ref = useRef(null);
    const isHovered = useHover(ref);
    const isDesktopOrLaptop = useMediaQuery({
      query: "(min-device-width: 1224px)",
    });

    const whereToNavigate = () => {
      if (poem.isOld) {
        return;
      }
      if (view === "ONE") {
        return (
          navigation &&
          navigation.push("APoem", {
            poemId: poem.id,
            title: poem.title,
          })
        );
      }
      if (view === "POST") {
        poemsStore.fromDraftToEdit({ poem });
        return navigation && navigation.navigate({ name: "PostPoem" });
      }
    };
    return (
      <View
        style={{
          width: isDesktopOrLaptop ? 500 : turnOffViewWitdht ? null : width,
          borderRadius: 30,
        }}
      >
        {/* http://localhost:4000/public/img/imgdisnetjy-6fa8df10-51b5-11ea-adbe-01c007ff9125.jpg */}
        {/* TODO
  There must be a beter way to do this hover  */}

        <Card
          ref={ref}
          style={[
            {
              alignSelf: "center",
              width: isDesktopOrLaptop ? 480 : width * 0.9,
              marginTop: 10,
              marginBottom: 30,
              borderRadius: 20,
              shadowColor: "rgba(0,0,0,0.8)",
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.29,
              shadowRadius: 4.65,
              elevation: 7,
            },
            isHovered && {
              shadowColor: "rgba(0,0,0,0.8)",
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,
              elevation: 10,
            },
          ]}
          onPress={() => whereToNavigate()}
        >
          {poem.photoURL ? (
            <Card.Cover
              style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
              source={{
                uri: `${liveEndPoint}/public/img/${
                  poem.photoURL
                    ? poem.photoURL
                    : "imgdisnetjy-6fa8df10-51b5-11ea-adbe-01c007ff9125.jpg"
                }`,
              }}
            />
          ) : null}
          {poem.isDraft ? (
            <Chip
              onPress={() => {
                poemsStore.fromDraftToEdit({ poem });
                return navigation && navigation.navigate({ name: "PostPoem" });
              }}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                backgroundColor: "#f8981c",
              }}
              icon="information"
            >
              Draft
            </Chip>
          ) : null}
          <>
            <Headline
              style={{
                paddingLeft: 12,
                paddingTop: 8,
                fontSize: poemsStore.handDrawnFont ? 30 : 22,
                fontFamily: poemsStore.handDrawnFont
                  ? "Reenie-Beanie"
                  : "raleway-extraBold",

                opacity: 0.9,
              }}
            >
              {poem.title}
            </Headline>
            <TouchableWithoutFeedback
              onPress={() => {
                poem.handle &&
                  Linking.openURL(
                    `https://instagram.com/${poem.handle
                      .replace(/[@]/g, "")
                      .trim()}`
                  );
              }}
            >
              <Subheading
                style={{
                  paddingLeft: 12,
                  fontSize: poemsStore.handDrawnFont ? 16 : 12,
                  fontFamily: poemsStore.handDrawnFont
                    ? "Reenie-Beanie"
                    : "raleway-extraBold",

                  opacity: 0.9,
                }}
              >
                {`by: ${poem.handle ? poem.handle : "ANON"}`}
              </Subheading>
            </TouchableWithoutFeedback>
          </>
          <Card.Content>
            <Markdown
              style={{
                text: {
                  fontSize: poemsStore.handDrawnFont ? 20 : 14,
                  fontFamily: poemsStore.handDrawnFont
                    ? "Reenie-Beanie"
                    : "raleway-regular",
                },
              }}
            >
              {poem.bodyText}
            </Markdown>
          </Card.Content>
          <Card.Actions>
            <View style={styles.actionView}>
              <View style={styles.preference}>
                <Caption
                  style={{
                    fontFamily: poemsStore.handDrawnFont
                      ? "Reenie-Beanie"
                      : "raleway-extraBold",
                  }}
                >
                  {moment(poem.date).format(`MMMM'YYYY`)}
                </Caption>
                <View pointerEvents="none"></View>
              </View>
            </View>
          </Card.Actions>
        </Card>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  actionView: {
    flex: 1,
    fontFamily: "raleway-extraBold",
  },

  preference: {
    fontFamily: "raleway-extraBold",
    fontSize: 12,
    opacity: 0.8,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default CardPoem;
