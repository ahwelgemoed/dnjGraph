const Poem = require('../models/PoemModel');
const User = require('../models/UserModel');
const moment = require('moment');
const {
  getAllActivePoems,
  getAllUserDrafts,
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
      const aPoem = Poem.findById(arg.id);
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
      // console.log(title, bodyText, isDraft, photoURL, handle, user, date);
      console.log(poem.id);
      const poemDTO = poem;
      if (poem.id) {
        /**
         * This Means Update
         */
        const updatedPoem = await updateAPoem({ poemDTO, userToken });
        return updatedPoem;
      }
      //   const date = new Date().getTime();
      //   const newPoem = new Poem({
      //     title,
      //     bodyText,
      //     isDraft,
      //     photoURL,
      //     handle,
      //     date,
      //     user: userToken && userToken.uid
      //   });

      //   return newPoem.save().then(res => {
      //     return {
      //       message: 'Saved New Poem',
      //       success: true,
      //       poem: res
      //     };
      //   });
    }
  }
};
module.exports = resolvers;
