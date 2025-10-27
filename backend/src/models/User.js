const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true
  },
  avatarUrl: {
    type: String
  },
  suiBalance: {
    type: Number,
    default: 0
  },
  postIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  savedPostIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  badges: [{
    id: String,
    name: String,
    description: String,
    iconName: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);