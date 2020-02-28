const Poem = require('../models/PoemModel');
// https://www.npmjs.com/package/mongoose-paginate-v2
const getAllActivePoems = ({ dtoArguments }) => {
  console.log('Get All Called');
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
const getAllUserDrafts = async ({ dtoArguments }) => {
  const allUserPoems = await Poem.find({
    user: 'JHJKjVGw91WEP15WhKbxHjOUcd12'
  });

  return { poems: allUserPoems, totalDocs: allUserPoems.length };
};

module.exports = {
  getAllActivePoems,
  getAllUserDrafts
};
