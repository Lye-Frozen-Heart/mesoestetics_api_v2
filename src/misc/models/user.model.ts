import * as mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  created_at: Date
});

const User = mongoose.model('User', userSchema);

module.exports = User;
