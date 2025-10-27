const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET /api/user/:id - Get user by ID (wallet address)
router.get('/:id', userController.getUserById);

// POST /api/user - Create or update user
router.post('/', userController.createUser);

// POST /api/user/:userId/save - Save a post for user
router.post('/:userId/save', userController.savePost);

module.exports = router;