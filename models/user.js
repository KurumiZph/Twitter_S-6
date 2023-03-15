const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age:      { type: Number, required: true },
  name:     { type: String, required: true },
  tweets:   [mongoose.ObjectId]
});

module.exports = mongoose.model('User', userSchema);
