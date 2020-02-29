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

module.exports = {
  getAllActivePoems,
  getAllUserDrafts
};
