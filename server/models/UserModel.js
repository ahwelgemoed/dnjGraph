const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  fireBaseId: String,
  isAdmin: Boolean,
  bookmarks: [String]
});
//Model === Collection
module.exports = mongoose.model('User', UserSchema);
