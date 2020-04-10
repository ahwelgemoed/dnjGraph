const admin = require('firebase-admin');
const serviceAccount = require('./disnetons-firebase-adminsdk-y24ky-1fc2332ab4.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://disnetons.firebaseio.com',
  storageBucket: 'disnetons.appspot.com',
});

module.exports = admin;
