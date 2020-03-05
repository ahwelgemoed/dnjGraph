import { useContext } from 'react';
import { RootStoreContext } from '../store/RootStore';
export const useAnonMayNotSeeHook = ({ message }) => {
  const { authStore } = useContext(RootStoreContext);
  if (authStore.isAnonymous) {
    authStore.showAuthSnack = {
      funcCalled: 'isUserAuthed',
      messageToUser: message
    };
  }
  return { isAnonUser: authStore.isAnonymous };
};
