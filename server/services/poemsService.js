const Poem = require('../models/PoemModel');
// https://www.npmjs.com/package/mongoose-paginate-v2
const getAll = ({ dtoArguments }) => {
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
  const allPoems = Poem.paginate({}, options, function(err, result) {
    const { docs, totalDocs, limit, totalPages, nextPage } = result;
    return { poems: docs, totalDocs };
  });

  return { allPoems };
};

module.exports = {
  getAll
};
