const mongoose = require('mongoose');

const tweetsSchema = new mongoose.Schema({
    msg:String,
    likes:Number,
    //tweets: mongoose.ObjectId 
});

module.exports = mongoose.model('Post', postSchema);
