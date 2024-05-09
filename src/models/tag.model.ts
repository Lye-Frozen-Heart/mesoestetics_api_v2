import * as mongoose from 'mongoose'
const tagSchema = new mongoose.Schema({
  label: String,
  color: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] 
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;