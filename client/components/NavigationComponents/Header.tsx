import React, { useState } from 'react';
import { AsyncStorage, TouchableOpacity, Platform } from 'react-native';
import { Appbar, Avatar, withTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TransitionSpecs } from '@react-navigation/stack';

const Header = ({ scene, previous, navigation, props }) => {
  const { colors } = props.theme;
  const { options } = scene.descriptor;

  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <Appbar.Header theme={{ colors: { primary: colors.surface } }}>
      {previous ? (
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          color={colors.primary}
        />
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <MaterialCommunityIcons name="menu" size={40} />
        </TouchableOpacity>
      )}
      <Appbar.Content
        title={previous ? title : <Avatar.Text size={24} label="DNJ" />}
      />
      <TouchableOpacity
        onPress={() => {
          AsyncStorage.clear();
        }}
      >
        <MaterialCommunityIcons name="user" size={40} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AllPoems');
        }}
      >
        <MaterialCommunityIcons name="menu" size={20} />
      </TouchableOpacity>
    </Appbar.Header>
  );
};

const MyTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec
  },

  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height * 1.2, 0]
            })
          },
          // {
          //   rotate: current.progress.interpolate({
          //     inputRange: [0, 1],
          //     outputRange: [1, 0]
          //   })
          // },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.8]
                })
              : 1
          }
        ]
      }
      // overlayStyle: {
      //   opacity: current.progress.interpolate({
      //     inputRange: [0, 1],
      //     outputRange: [0, 0]
      //   })
      // }
    };
  }
};

export { Header, MyTransition };
