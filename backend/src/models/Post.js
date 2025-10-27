const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  source: {
    type: String,
    enum: ['twitter', 'github', 'reddit', 'discussion'],
    required: true
  },
  author: {
    type: String,
    required: true
  },
  authorAddress: {
    type: String,
    required: true
  },
  authorHandle: {
    type: String,
    required: true
  },
  avatarUrl: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  tags: [{
    type: String
  }],
  stats: {
    upvotes: {
      type: Number,
      default: 0
    },
    comments: {
      type: Number,
      default: 0
    },
    shares: {
      type: Number,
      default: 0
    }
  },
  imageUrl: {
    type: String
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Post', postSchema);