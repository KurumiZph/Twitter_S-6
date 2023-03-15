// Set up the Express app and require dependencies
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Post = require('./models/post');
const postsRouter = require('./routes/posts');
const User = require('./models/user');
const bcrypt = require('bcrypt');


app.use(bodyParser.json());

// Set up a connection to MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Kurumi:M0NaGsGqPqpSTFFovPnV@cluster0.a72baeo.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/', postsRouter);

//Set the PORT for operation
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const usersRouter = require('./routes/users');

app.use('/users', usersRouter);
