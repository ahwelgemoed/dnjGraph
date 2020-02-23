const User = require('../models/UserModel');
// https://www.npmjs.com/package/mongoose-paginate-v2
const updateUserInternally = async ({ userToken }) => {
  const foundUser = await User.findOne({ fireBaseId: userToken.uid });
  if (foundUser) {
    /**
     * This user has loged in Before lets just check some stuff
     */
  }
  if (!foundUser) {
    /**
     * Never Logged In Lest Handle That This is a fail safe and Should NEVER be Hit
     */
    const newUser = await new User({
      name: null,
      fireBaseId: ctx.uid,
      isAdmin: false
    });
    return newUser.save().then(res => {});
  }
  console.log(foundUser);
};

const getUser = async ({ userDTO }) => {
  const user = await User.findOne({ fireBaseId: userDTO.uid });
  return { user };
};

module.exports = {
  getUser,
  updateUserInternally
};
