const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feedController');

// GET /api/feed/trending - Get trending posts
router.get('/trending', feedController.getTrendingFeed);

// GET /api/feed/sui - Get Sui ecosystem posts
router.get('/sui', feedController.getSuiFeed);

module.exports = router;