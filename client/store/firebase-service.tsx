import * as firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCu119y-X_66vUOXixI9hCbTxjRx4zXPVM',
  authDomain: 'disnetons.firebaseapp.com',
  databaseURL: 'https://disnetons.firebaseio.com',
  projectId: 'disnetons',
  storageBucket: 'disnetons.appspot.com',
  messagingSenderId: '554939781321',
  appId: '1:554939781321:web:05ce7cd294e7cdd8'
};

firebase.initializeApp(config);

export default firebase;
