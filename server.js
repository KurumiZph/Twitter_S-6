// Set up the Express app and require dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const Post = require('./models/post');
const User = require('./models/user');
const bcrypt = require('bcrypt');

// Import the auth route
const authRouter = require('./routes/users/auth');

// Use the auth route
app.use('/auth', authRouter);

app.use(bodyParser.json());

// Set up a connection to MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Kurumi:cfpxl2uu1RgwrYJS@cluster69.rurhujb.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const postsRouter = require('./routes/posts');
app.use('/', postsRouter);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Set the PORT for operation
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
