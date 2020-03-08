import React, { useState } from 'react';
import { AsyncStorage, TouchableOpacity, Platform } from 'react-native';
import { Appbar, Text, Avatar, withTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LinksTopAppStore from '../UtilComponents/LinksTopAppStore';
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

  if (scene.route.name === 'APoem') {
    return (
      <Appbar.Header
        statusBarHeight={0}
        style={{ height: 0 }}
        theme={{ colors: { primary: colors.surface } }}
      >
        <Appbar.BackAction
          style={{ position: 'absolute', top: 30 }}
          onPress={() => navigation.goBack()}
          color={colors.primary}
        />
      </Appbar.Header>
    );
  }
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
          <MaterialCommunityIcons name="menu" size={30} />
        </TouchableOpacity>
      )}
      <Appbar.Content
        title={
          previous ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Home');
              }}
            >
              <Text style={{ fontFamily: 'raleway-bold', fontSize: 22 }}>
                {title}
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={{ fontFamily: 'raleway-boldI', fontSize: 26 }}>
              DNJ
            </Text>
          )
        }
      />
      {Platform.OS === 'web' && (
        <>
          <LinksTopAppStore />
        </>
      )}
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
