import { observable, action } from "mobx";
import { createContext } from "react";
import { RootStore } from "./RootStore";
import firebase from "./firebase-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import gql from "graphql-tag";
import { persist } from "mobx-persist";

export class AuthStateStore {
  constructor(rooteStore: RootStore) {
    this.rooteStore = rooteStore;
  }
  @observable isAuthed: string = "LOADING";
  @observable freshUserToken: string;
  @observable isAnonymous: boolean = false;
  @observable isLoading: boolean = true;
  @observable isAdmin: boolean = false;
  @observable showAuthSnack = { funcCalled: "", messageToUser: "" };
  @persist("object") @observable loacalUser;
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
    const INITIALTOKEN = await AsyncStorage.getItem("userToken");
    const ISFIRSTSEASON3 = await AsyncStorage.getItem("ISFIRSTSEASON3");
    if (!ISFIRSTSEASON3) {
      this.signUserOutStart3();
    }

    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .auth()
          .currentUser.getIdToken()
          .then(() => {
            this.freshUserToken = user.ma;
            AsyncStorage.setItem("userToken", user.ma);
          });
        this.isAuthed = "AUTHED";
        this.isAnonymous = false;
        this.isLoading = false;
        this.firebaseUser = {
          user,
        };
      }

      if (!user) {
        if (INITIALTOKEN === "ANON") {
          this.isAuthed = "AUTHED";
          this.isLoading = false;
          this.isAnonymous = true;
        } else {
          this.isAuthed = "NOTAUTHED";
          this.isLoading = false;
          this.isAnonymous = false;
        }
      }
    });
  }
  @action async logUserInAndSetTokenInStorage({ token }) {
    await AsyncStorage.setItem("userToken", token);
    await this.isUserAuthed();
  }
  @action async setUserAsAnonymous() {
    await AsyncStorage.setItem("userToken", "ANON");
    await this.isUserAuthed();
  }
  @action async getUserFromGraph() {
    await firebase.auth().onAuthStateChanged((user) => {
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
      messageToUser,
    };
  }
  @action async getCurrentUserData({ funcCalled, messageToUser }) {
    this.showAuthSnack = {
      funcCalled,
      messageToUser,
    };
  }
  @action async setLocalUser({ state }) {
    this.loacalUser = {
      ...state,
    };
    this.showAuthSnack = {
      funcCalled: "setLocalUser",
      messageToUser: "Profile Updated!",
    };
  }
  @action async showSnack({ message }) {
    this.showAuthSnack = {
      funcCalled: "showSnack",
      messageToUser: message,
    };
  }
  @action signUserOutAndClear() {
    this.showSnack({ message: "Signing You Out..." });
    firebase.auth().signOut();
    AsyncStorage.clear();
    setTimeout(() => {
      this.isAuthed = false;
      AsyncStorage.setItem("ISFIRSTSEASON3", "true");
    }, 3000);
  }
  @action signUserOutStart3() {
    this.showSnack({ message: "Season 3..." });
    firebase.auth().signOut();
    AsyncStorage.clear();
    setTimeout(() => {
      this.isAuthed = false;
      AsyncStorage.setItem("ISFIRSTSEASON3", "true");
    }, 3000);
  }
}

// export const AuthStateContext = createContext(new AuthState()); Dont Need Cause of Root Store
