const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const PoemSchema = new Schema({
  title: String,
  bodyText: String,
  photoURL: String,
  user: String,
  topic: String,
  categories: String,
  isDraft: Boolean,
  date: Date,
  handle: String,
  isOld: Boolean
});

PoemSchema.plugin(mongoosePaginate);
//Model === Collection
module.exports = mongoose.model('Poem', PoemSchema);
