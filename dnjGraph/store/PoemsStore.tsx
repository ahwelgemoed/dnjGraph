import { observable, action, computed } from 'mobx';
import { createContext } from 'react';
import { RootStore } from './RootStore';
import { AsyncStorage } from 'react-native';
import gql from 'graphql-tag';
import { persist } from 'mobx-persist';

export class PoemsStore {
  constructor(rooteStore: RootStore) {
    this.rooteStore = rooteStore;
  }
  @persist @observable poemTitle;
  @persist @observable poemBody;
  @persist @observable poemImage;
  @observable draftMode = true;
  @observable readyPoem = {};

  @observable allPoems = [];

  @observable getAllPoems = gql`
    query poems($limit: Int, $page: Int) {
      poems(limit: $limit, page: $page) {
        poems {
          id
          title
          bodyText
          photoURL
          handle
          date
          isDraft
        }
        totalDocs
      }
    }
  `;

  @observable getAPoem = gql`
    query poem($id: ID!) {
      poem(id: $id) {
        title
        id
        title
        photoURL
        handle
        bodyText
        date
        handle
      }
    }
  `;
  @observable getAusersDraftPoems = gql`
    query myDraftPoems {
      myDraftPoems {
        poems {
          id
          title
          bodyText
          photoURL
          handle
          date
          isDraft
        }
        totalDocs
      }
    }
  `;
  @observable addAPoem = gql`
    mutation AddPoem($poem: PoemInput) {
      addPoem(poem: $poem) {
        success
        message
        poem {
          title
        }
      }
    }
  `;
  @action setPoemTitle(poemTitle) {
    this.poemTitle = poemTitle;
  }
  @action setPoemBody(poemBody) {
    this.poemBody = poemBody;
  }
  @action setPoemImage(poemImage) {
    if (poemImage) {
      this.poemImage = poemImage;
    }
  }
  @action setDraftMode(draftMode) {
    this.draftMode = draftMode;
  }
  @action readyToPostPoem() {
    const poem = {
      poemTitle: this.poemTitle,
      poemBody: this.poemBody,
      poemImage: this.poemImage,
      isDraft: this.draftMode
    };
    return poem;
  }
  @action clearPresistPoem() {
    AsyncStorage.removeItem('poemsStore');
    this.poemTitle = '';
    this.poemBody = '';
    this.poemImage = '';
    this.draftMode = true;
    this.readyPoem = {};
  }
  @action fromDraftToEdit({ poem }) {
    console.log('👳🏽‍♂️', 'fromDraftToEdit');

    this.clearPresistPoem();

    this.poemTitle = poem.title;
    this.poemBody = poem.bodyText;
    this.poemImage = poem.photoURL;
    this.draftMode = true;
    this.readyPoem = {};
  }
}

// export const AuthStateContext = createContext(new AuthState()); Dont Need Cause of Root Store
