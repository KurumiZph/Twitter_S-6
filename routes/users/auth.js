const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { generateToken } = require('./token');


// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate and send the access token
    const accessToken = generateToken({ userId: user._id });
    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Signup route
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const user = new User({ username, password: hashedPassword });
    await user.save();

    // Generate and send the access token
    const accessToken = generateToken({ userId: user._id });
    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
