const Post = require('../models/Post');
const Comment = require('../models/Comment');

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('comments');
      
    const total = await Post.countDocuments();
    
    res.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    const savedPost = await post.save();
    
    // Emit real-time update
    req.app.get('io').emit('newPost', savedPost);
    
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('comments');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a comment to a post
exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    const comment = new Comment({
      postId: req.params.postId,
      ...req.body
    });
    
    const savedComment = await comment.save();
    
    // Add comment to post
    post.comments.push(savedComment._id);
    post.stats.comments += 1;
    await post.save();
    
    // Emit real-time update
    req.app.get('io').emit('newComment', { postId: req.params.postId, comment: savedComment });
    
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Upvote a post
exports.upvotePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    post.stats.upvotes += 1;
    await post.save();
    
    // Emit real-time update
    req.app.get('io').emit('postUpvoted', { postId: req.params.id, upvotes: post.stats.upvotes });
    
    res.json({ upvotes: post.stats.upvotes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};