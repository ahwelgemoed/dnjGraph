import { createContext } from 'react';
import { AsyncStorage } from 'react-native';
import { create } from 'mobx-persist';
import { AuthStateStore } from './AuthStateStore';
import { PoemsStore } from './PoemsStore';
const hydrate = create({
  storage: AsyncStorage,
  jsonify: true
});

export class RootStore {
  authStore = new AuthStateStore(this);
  poemsStore = new PoemsStore(this);
  constructor() {
    hydrate('poemsStore', this.poemsStore);
  }
}

export const RootStoreContext = createContext(new RootStore());
