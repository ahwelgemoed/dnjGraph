import { observable, action } from 'mobx';
import { createContext } from 'react';
import { RootStore } from './RootStore';
import firebase from './firebase-service';
import { AsyncStorage } from 'react-native';
import gql from 'graphql-tag';

export class AuthStateStore {
  constructor(rooteStore: RootStore) {
    this.rooteStore = rooteStore;
  }
  @observable isAuthed = false;
  @observable isAnonymous = true;
  @observable isLoading = true;
  @observable isAdmin = false;
  @observable userFirebaseUID;
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
      }
    });
    const userToken = await AsyncStorage.getItem('userToken');

    if (userToken && userToken !== 'ANON') {
      this.isAuthed = true;
      this.isAnonymous = false;
      this.isLoading = false;
    }
    if (userToken === 'ANON') {
      this.isAuthed = false;
      this.isLoading = false;
      this.isAnonymous = true;
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
    console.log('👨🏽‍🏭');
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
}

// export const AuthStateContext = createContext(new AuthState()); Dont Need Cause of Root Store
