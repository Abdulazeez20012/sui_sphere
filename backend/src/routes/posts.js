const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// GET /api/posts - Get all posts
router.get('/', postController.getPosts);

// POST /api/posts - Create a new post
router.post('/', postController.createPost);

// GET /api/posts/:id - Get a single post by ID
router.get('/:id', postController.getPostById);

// POST /api/posts/:id/upvote - Upvote a post
router.post('/:id/upvote', postController.upvotePost);

// POST /api/posts/:id/comment - Add a comment to a post
router.post('/:id/comment', postController.addComment);

module.exports = router;