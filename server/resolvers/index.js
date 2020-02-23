const Poem = require('../models/PoemModel');
const User = require('../models/UserModel');

const { getAll } = require('../services/poemsService');
const { updateUserInternally, getUser } = require('../services/userServices');

const resolvers = {
  Query: {
    poems: (parent, arg, { userToken }, info) => {
      const dtoArguments = arg;
      const { allPoems } = getAll({ dtoArguments });
      if (userToken) {
        updateUserInternally({ userToken });
      }
      return allPoems;
    },
    poem: (obj, arg, ctx, info) => {
      const aPoem = Poem.findById(arg.id);
      return aPoem;
    },
    User: async (obj, arg, ctx, info) => {
      const userDTO = arg;
      const { user } = await getUser({ userDTO });
      return user;
    }
  },
  Poem: {
    user: (parent, args, ctx, info) => {
      console.log('parent.user', parent.user);

      // const foundUser = User.findById(parent.user);
      // return foundUser;
    }
  },
  Mutation: {
    addUser: (parent, { user: { name } }, ctx, info) => {
      const newUser = new User({
        name,
        isAdmin: false
      });
      return newUser.save().then(res => {
        return {
          message: 'Saved New User',
          success: true,
          user: res
        };
      });
    },
    addPoem: (
      parent,
      { poem: { title, bodyText, isDraft, photoURL, handle, user } },
      ctx,
      info
    ) => {
      // console.log(title, bodyText, isDraft, photoURL, handle, user, date);
      const date = Date.now();

      const newPoem = new Poem({
        title,
        bodyText,
        isDraft,
        photoURL,
        handle,
        date,
        user
      });

      return newPoem.save().then(res => {
        return {
          message: 'Saved New Poem',
          success: true,
          poem: res
        };
      });
    }
  }
};
module.exports = resolvers;
