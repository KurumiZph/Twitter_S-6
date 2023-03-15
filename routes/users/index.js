const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const Joi = require('joi');

//---------------------------------------------------------------------------------//

// Create validdation schema for users

const userValidationSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  age: Joi.number().min(13).required(),
  name: Joi.string().min(3).required()
});

router.post('/', (req, res, next) => {
  const { error } = userValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
});

//---------------------------------------------------------------------------------//

// Route to create a user

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  // Hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  // Create new user object
  const user = new User({ username, password: hashedPassword });

  try {
    // Save the user
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//---------------------------------------------------------------------------------//

// Route to retrieve all users

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
