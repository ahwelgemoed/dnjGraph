const User = require('../models/UserModel');
const admin = require('../firebase-service');
// https://www.npmjs.com/package/mongoose-paginate-v2
const updateUserInternally = async ({ userToken }) => {
  const foundUser = await User.findOne({ fireBaseId: userToken.uid });
  // const foundUser = false;

  if (foundUser) {
    /**
     * This user has loged in Before lets just check some stuff
     */
  }
  if (!foundUser) {
    /**
     * Never Logged In Lest Handle That This is a fail safe and Should NEVER be Hit
     */
    // let db = admin.firestore();
    // const fireStoreUser = await db.collection('users').get();

    // console.log('fireStoreUser', fireStoreUser);

    const newUser = await new User({
      name: null,
      email: userToken.email,
      fireBaseId: userToken.uid,
      isAdmin: false,
    });
    return newUser.save().then((res) => {});
  }
};

const getUser = async ({ userDTO }) => {
  const user = await User.findOne({ fireBaseId: userDTO.uid });
  return { user };
};

module.exports = {
  getUser,
  updateUserInternally,
};
