import { observable, action } from 'mobx';
import { createContext } from 'react';
import { RootStore } from './RootStore';
import firebase from './firebase-service';
import { AsyncStorage } from 'react-native';
import gql from 'graphql-tag';
import { persist } from 'mobx-persist';

export class AuthStateStore {
  constructor(rooteStore: RootStore) {
    this.rooteStore = rooteStore;
  }
  @observable isAuthed = false;
  @observable isAnonymous = false;
  @observable isLoading = true;
  @observable isAdmin = false;
  @observable showAuthSnack = { funcCalled: '', messageToUser: '' };
  @persist('object') @observable loacalUser;
  @observable userFirebaseUID;
  @observable firebaseUser;
  @observable userGraph = {};
  firebase = firebase;

  @observable getAUser = gql`
    query User($id: ID) {
      User(id: $id) {
        id
        name
        isAdmin
      }
    }
  `;

  @action async isUserAuthed() {
    await firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .auth()
          .currentUser.getIdToken()
          .then(() => {
            AsyncStorage.setItem('userToken', user.ma);
          });
        this.firebaseUser = {
          user
        };
        this.showAuthSnack = {
          funcCalled: 'isUserAuthed',
          messageToUser: 'isUserAuthed is Called'
        };
      }
    });
    const userToken = await AsyncStorage.getItem('userToken');
    if (userToken) {
      this.isAuthed = true;
      this.isAnonymous = false;
      this.isLoading = false;
    }
    if (!userToken) {
      this.isAuthed = false;
      this.isLoading = false;
      this.isAnonymous = false;
    }
  }
  @action async logUserInAndSetTokenInStorage({ token }) {
    await AsyncStorage.setItem('userToken', token);
    this.isUserAuthed();
  }
  @action async setUserAsAnonymous() {
    // console.log('👨🏽‍🏭');
    await AsyncStorage.setItem('userToken', 'ANON');
    this.isUserAuthed();
  }
  @action async getUserFromGraph() {
    await firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userFirebaseUID = user.uid;
      }
    });
  }
  @action async setUserFromGraph(user) {
    if (user) {
      this.userGraph = user.User;
    }
  }
  @action async setSnackBar({ funcCalled, messageToUser }) {
    this.showAuthSnack = {
      funcCalled,
      messageToUser
    };
  }
  @action async getCurrentUserData({ funcCalled, messageToUser }) {
    this.showAuthSnack = {
      funcCalled,
      messageToUser
    };
  }
  @action async setLocalUser({ state }) {
    this.loacalUser = {
      ...state
    };
    this.showAuthSnack = {
      funcCalled: 'setLocalUser',
      messageToUser: 'Profile Updated!'
    };
  }
}

// export const AuthStateContext = createContext(new AuthState()); Dont Need Cause of Root Store
