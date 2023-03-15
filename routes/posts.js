const express = require('express');
const Post = require('../models/post');

const router = express.Router();

// Create a new post
router.post('/posts', async (req, res) => {
  try {
    const post = new Post({ text: req.body.text });
    await post.save();
    res.send(post);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get all posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete post
router.delete('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      res.status(404).send();
    } else {
      res.send(post);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update a post
router.put('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, { text: req.body.text });
    if (!post) {
      res.status(404).send();
    } else {
      res.send(post);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
