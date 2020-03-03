const admin = require('./firebase-service');

const authHandler = req => {
  const tokenWithBearer = req.headers.authorization;
  // console.log(tokenWithBearer, 'tokenWithBearer');
  if (tokenWithBearer) {
    const token = tokenWithBearer.split(' ')[1];
    if (token && (token === 'ANON' || token === 'null')) {
      return null;
    }
    if (token && token !== 'ANON') {
      return veryfyAuthToken(token);
    }
    if (!token) {
      return null;
    }
  } else {
    return null;
  }
};

const veryfyAuthToken = async token => {
  try {
    const user = await admin.auth().verifyIdToken(token);
    console.log('user', user);

    return user;
  } catch (error) {
    console.log('error', error);
    throw new Error('👮🏽‍♂️ Invalid Token');
  }
};

module.exports = authHandler;
