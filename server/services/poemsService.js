const Poem = require('../models/PoemModel');
const admin = require('../firebase-service');
// https://www.npmjs.com/package/mongoose-paginate-v2
const getAllActivePoems = ({ dtoArguments }) => {
  const { limit, page } = dtoArguments;
  const options = {
    page: page ? page : 1,
    limit: limit ? limit : 20,
    sort: { date: -1 },
    collation: {
      locale: 'en',
    },
  };
  const allPoems = Poem.paginate({ isDraft: false }, options, function (
    err,
    result
  ) {
    const { docs, totalDocs, limit, totalPages, nextPage } = result;
    //  Limit Char Here.slice(0,10)
    return { poems: docs, totalDocs };
  });

  return { allPoems };
};
const getAPoem = ({ aPoemDTO }) => {
  if (aPoemDTO) {
    const aPoem = Poem.findById(aPoemDTO.id);
    return aPoem;
  }
  return;
};
const getAllUserDrafts = async ({ dtoArguments, user }) => {
  if (user.uid) {
    const allUserPoems = await Poem.find(
      {
        user: user.uid,
        isDraft: true,
      },
      null,
      { sort: { date: -1 } }
    );

    return { poems: allUserPoems, totalDocs: allUserPoems.length };
  }
  return;
};
const getAllUserPoems = async ({ dtoArguments, user }) => {
  if (user.uid) {
    const allUserPoems = await Poem.find(
      {
        user: user.uid,
      },
      null,
      { sort: { date: -1 } }
    );

    return { poems: allUserPoems, totalDocs: allUserPoems.length };
  }
  return;
};
const updateAPoem = async ({
  poemDTO: { id, title, bodyText, isDraft, photoURL, handle },
  userToken,
}) => {
  let poem = await Poem.findOneAndUpdate(
    { _id: id },
    {
      title,
      bodyText,
      isDraft,
      photoURL,
      isOld: false,
      handle,
      date: new Date().toISOString(),
      user: userToken && userToken.uid,
    },
    {
      useFindAndModify: false,
      new: true,
    }
  );
  return {
    message: 'Saved Updated Poem',
    success: true,
    poem: poem,
  };
};
const createNewPoem = async ({
  poemDTO: { title, bodyText, isDraft, photoURL, handle },
  userToken,
}) => {
  const poem = new Poem({
    title,
    bodyText,
    isDraft,
    photoURL,
    isOld: !photoURL ? true : false,
    handle,
    date: new Date().toISOString(),
    user: userToken && userToken.uid,
  });
  return poem.save().then((res) => {
    return {
      message: 'Saved New Poem',
      success: true,
      poem: res,
    };
  });
};

const getAllImagesFromFireBase = async () => {
  // const storageRef = await admin.storage().bucket('activeImages');
  const files = await admin.storage();

  console.log(files);
  // console.log('admin');
  return;
};

module.exports = {
  getAllActivePoems,
  getAllImagesFromFireBase,
  getAllUserDrafts,
  getAllUserPoems,
  createNewPoem,
  getAPoem,
  updateAPoem,
};
