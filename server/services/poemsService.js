const Poem = require('../models/PoemModel');
// https://www.npmjs.com/package/mongoose-paginate-v2
const getAllActivePoems = ({ dtoArguments }) => {
  const { limit, page } = dtoArguments;
  const options = {
    page: page ? page : 1,
    limit: limit ? limit : 20,
    sort: { date: -1 },
    collation: {
      locale: 'en'
    }
  };
  const allPoems = Poem.paginate({ isDraft: false }, options, function(
    err,
    result
  ) {
    const { docs, totalDocs, limit, totalPages, nextPage } = result;
    return { poems: docs, totalDocs };
  });

  return { allPoems };
};
const getAllUserDrafts = async ({ dtoArguments, user }) => {
  if (user.uid) {
    const allUserPoems = await Poem.find({
      user: user.uid,
      isDraft: true
    });

    return { poems: allUserPoems, totalDocs: allUserPoems.length };
  }
  return;
};
const getAllUserPoems = async ({ dtoArguments, user }) => {
  if (user.uid) {
    const allUserPoems = await Poem.find({
      user: user.uid
    });

    return { poems: allUserPoems, totalDocs: allUserPoems.length };
  }
  return;
};
const updateAPoem = async ({
  poemDTO: { id, title, bodyText, isDraft, photoURL, handle },
  userToken
}) => {
  let poem = await Poem.findOneAndUpdate(
    { _id: id },
    {
      title,
      bodyText,
      isDraft,
      photoURL,
      handle,
      user: userToken && userToken.uid
    },
    {
      useFindAndModify: false,
      new: true
    }
  );
  return {
    message: 'Saved Updated Poem',
    success: true,
    poem: poem
  };
};
const createNewPoem = async ({
  poemDTO: { title, bodyText, isDraft, photoURL, handle },
  userToken
}) => {
  const poem = new Poem({
    title,
    bodyText,
    isDraft,
    photoURL,
    handle,
    data: new Date().toString(),
    user: userToken && userToken.uid
  });
  return poem.save().then(res => {
    return {
      message: 'Saved New Poem',
      success: true,
      poem: res
    };
  });
};

module.exports = {
  getAllActivePoems,
  getAllUserDrafts,
  createNewPoem,
  updateAPoem
};
