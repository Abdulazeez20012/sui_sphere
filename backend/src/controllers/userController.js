const User = require('../models/User');

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ address: req.params.id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create or update user
exports.createUser = async (req, res) => {
  try {
    let user = await User.findOne({ address: req.body.address });
    
    if (user) {
      // Update existing user
      Object.assign(user, req.body);
    } else {
      // Create new user
      user = new User(req.body);
    }
    
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Save a post for user
exports.savePost = async (req, res) => {
  try {
    const user = await User.findOne({ address: req.params.userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const postId = req.body.postId;
    if (!user.savedPostIds.includes(postId)) {
      user.savedPostIds.push(postId);
      await user.save();
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};