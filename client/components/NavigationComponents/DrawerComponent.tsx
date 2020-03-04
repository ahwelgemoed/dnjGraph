import React from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../store/RootStore';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch
} from 'react-native-paper';

import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DrawerContent(props) {
  const { authStore } = React.useContext(RootStoreContext);
  // console.log(props.navigation);

  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: 'rgba(255,255,255, 0.95);' }}
    >
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <Avatar.Image
            source={{
              uri: 'http://www.disnetjy.com/newlogo.png'
            }}
            size={50}
          />
          <Title style={styles.title}>Dis Net Jy</Title>
          <Caption style={styles.caption}>
            soms was dit ek en nou is dit net jy
          </Caption>
          {/* <View style={styles.row}>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                202
              </Paragraph>
              <Caption style={styles.caption}>Following</Caption>
            </View>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                159
              </Paragraph>
              <Caption style={styles.caption}>Followers</Caption>
            </View>
          </View> */}
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="account-outline"
                color={color}
                size={size}
              />
            )}
            label="Home"
            onPress={() => {
              props.navigation.navigate('Home');
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="account-outline"
                color={color}
                size={size}
              />
            )}
            label="Your Drafts"
            onPress={() => {
              props.navigation.navigate('DraftStack');
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="account-outline"
                color={color}
                size={size}
              />
            )}
            label="Your Posted Poems"
            onPress={() => {
              props.navigation.navigate('DraftStack');
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="tune" color={color} size={size} />
            )}
            label="Profile"
            onPress={() => {
              props.navigation.navigate({ name: 'ProfileStack' });
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="tune" color={color} size={size} />
            )}
            label="Post a Poem"
            onPress={() => {
              props.navigation.navigate({ name: 'PostPoem' });
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="bookmark-outline"
                color={color}
                size={size}
              />
            )}
            label="Bookmarks (Coming Soon)"
            onPress={() => {}}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="bookmark-outline"
                color={color}
                size={size}
              />
            )}
            label="Sign Out (Coming Back Soon)"
            onPress={() => {
              authStore.firebase
                .auth()
                .signOut()
                .then(function() {
                  AsyncStorage.clear();
                });
            }}
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1
  },
  userInfoSection: {
    paddingLeft: 20
  },
  title: {
    marginTop: 20,
    fontFamily: 'raleway-boldI',
    fontWeight: 'bold'
  },
  caption: {
    fontSize: 14,
    lineHeight: 14
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3
  },
  drawerSection: {
    marginTop: 15
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16
  }
});