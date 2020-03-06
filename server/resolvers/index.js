const {
  AuthenticationError,
  UserInputError
} = require('apollo-server-express');
const Poem = require('../models/PoemModel');
const User = require('../models/UserModel');
const moment = require('moment');
const {
  getAllActivePoems,
  getAllUserPoems,
  getAllUserDrafts,
  getAPoem,
  createNewPoem,
  updateAPoem
} = require('../services/poemsService');
const { updateUserInternally, getUser } = require('../services/userServices');

const resolvers = {
  Query: {
    poems: (parent, arg, { userToken }, info) => {
      const dtoArguments = arg;
      /**
       *  Get All Poems and Update or Create User
       */
      const { allPoems } = getAllActivePoems({ dtoArguments });
      if (userToken) {
        updateUserInternally({ userToken });
      }
      return allPoems;
    },
    poem: (obj, arg, ctx, info) => {
      const aPoemDTO = arg;
      const aPoem = getAPoem({ aPoemDTO });

      return aPoem;
    },
    User: async (obj, arg, ctx, info) => {
      const userDTO = arg;
      const { user } = await getUser({ userDTO });
      return user;
    },
    allUsersBookmarks: (obj, args, { userToken }, info) => {
      // use user Toke to get UID from Firebase -> Find User in our DB then Use that Array To find all
      const allUserBookmarksDTO = args;
    },
    myDraftPoems: async (obj, args, { userToken }, info) => {
      // use user Toke to get UID from Firebase -> Find User in our DB then Use that Array To find all
      if (!userToken) {
        throw new AuthenticationError('You are not Authenticated');
        return;
      }
      // console.log('userToken', userToken);

      const myDraftPoemsDTO = args;
      const allUsersDrafts = await getAllUserDrafts({
        dto: myDraftPoemsDTO,
        user: userToken
      });
      // console.log('allUsersDrafts', allUsersDrafts);
      return allUsersDrafts;
    },
    myPoems: async (obj, args, { userToken }, info) => {
      // use user Toke to get UID from Firebase -> Find User in our DB then Use that Array To find all
      if (!userToken) {
        throw new AuthenticationError('You are not Authenticated');
        return;
      }
      // console.log('userToken', userToken);

      const myPoemsDTO = args;
      const allUsersPoems = await getAllUserPoems({
        dto: myPoemsDTO,
        user: userToken
      });
      console.log('allUsersPoems', allUsersPoems);
      return allUsersPoems;
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
    addPoem: async (parent, { poem }, { userToken }, info) => {
      if (!poem.title) {
        throw new UserInputError('Please give your Poem a Title');
      }
      if (!poem.bodyText) {
        throw new UserInputError('Please give your Poem a Body');
      }
      if (!poem.photoURL && !poem.isDraft) {
        throw new UserInputError('Please Choose an Image');
      }

      const poemDTO = poem;
      if (poem.id) {
        /**
         * This means Update
         */
        const updatedPoem = await updateAPoem({ poemDTO, userToken });
        return updatedPoem;
      } else {
        const newPoem = await createNewPoem({ poemDTO, userToken });
        return newPoem;
      }
    }
  }
};
module.exports = resolvers;
