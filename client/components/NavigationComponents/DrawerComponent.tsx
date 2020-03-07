import React from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { observer } from 'mobx-react-lite';
import { Linking } from 'expo';
import { RootStoreContext } from '../../store/RootStore';
import {
  useTheme,
  Avatar,
  Title,
  Subheading,
  Caption,
  Text,
  Drawer,
  Chip,
  TouchableRipple,
  Switch
} from 'react-native-paper';
import dnj from '../../assets/images/DNJW.png';

import { MaterialCommunityIcons } from '@expo/vector-icons';

const DrawerContent = observer(props => {
  const { poemsStore, authStore } = React.useContext(RootStoreContext);
  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: 'rgba(255,255,255, 0.95);' }}
    >
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <Avatar.Image source={dnj} size={70} />
          <MaterialCommunityIcons
            onPress={() => {
              setTimeout(() => {
                props.navigation.closeDrawer();
              }, 100);
            }}
            style={{ position: 'absolute', right: 20, top: 20 }}
            name="close"
            size={20}
          />
          <Title style={styles.title}>Dis Net Jy</Title>
          <Subheading style={styles.subtitle}>POST THYSELF</Subheading>
          {authStore.isAnonymous && (
            <Chip
              style={{ width: '90%' }}
              mode="outlined"
              icon="information"
              onPress={() => console.log('Pressed')}
            >
              Browsing Anonymously
            </Chip>
          )}
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="heart-outline"
                color={color}
                size={size}
              />
            )}
            label="KLYNTJI"
            onPress={() => {
              Linking.openURL('https://klyntji.com/');
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="instagram"
                color={color}
                size={size}
              />
            )}
            label="Follow Us"
            onPress={() => {
              Linking.openURL('http://instagram.com/disnetjy');
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="message-text-outline"
                color={color}
                size={size}
              />
            )}
            label="All Poems"
            onPress={() => {
              props.navigation.navigate('AllPoems');
              setTimeout(() => {
                props.navigation.closeDrawer();
              }, 100);
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="pencil-outline"
                color={color}
                size={size}
              />
            )}
            label="Post a Poem"
            onPress={() => {
              props.navigation.navigate({ name: 'PostPoem' });
              setTimeout(() => {
                props.navigation.closeDrawer();
              }, 100);
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="message-draw"
                color={color}
                size={size}
              />
            )}
            label="Drafts"
            onPress={() => {
              props.navigation.navigate('Drafts');
              setTimeout(() => {
                props.navigation.closeDrawer();
              }, 100);
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="message-bulleted"
                color={color}
                size={size}
              />
            )}
            label="Posted Poems"
            onPress={() => {
              props.navigation.navigate('UserPoems');
              setTimeout(() => {
                props.navigation.closeDrawer();
              }, 100);
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
            label="Profile"
            onPress={() => {
              props.navigation.navigate({ name: 'UserScreen' });
              setTimeout(() => {
                props.navigation.closeDrawer();
              }, 100);
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
                name={authStore.isAnonymous ? 'login' : 'logout'}
                color={color}
                size={size}
              />
            )}
            label={authStore.isAnonymous ? 'Sign In' : 'Sing Out'}
            onPress={() => {
              authStore.signUserOutAndClear();
              setTimeout(() => {
                props.navigation.closeDrawer();
              }, 100);
            }}
          />
        </Drawer.Section>
        <TouchableRipple
          onPress={() => {
            poemsStore.changeFont();
            setTimeout(() => {
              props.navigation.closeDrawer();
            }, 100);
          }}
        >
          <View style={styles.preference}>
            <Text>Hand Drawn Font</Text>
            <View pointerEvents="none">
              <Switch
                onValueChange={() => poemsStore.changeFont()}
                value={poemsStore.handDrawnFont}
              />
            </View>
          </View>
        </TouchableRipple>
      </View>
    </DrawerContentScrollView>
  );
});
export default DrawerContent;
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
  subtitle: {
    fontSize: 12,
    fontFamily: 'raleway-bold'
    // fontWeight: 'bold'
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
