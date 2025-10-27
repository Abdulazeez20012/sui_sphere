const Post = require('../models/Post');
const axios = require('axios');

// Get trending posts
exports.getTrendingFeed = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ 'stats.upvotes': -1, 'stats.comments': -1 })
      .limit(20);
      
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Sui ecosystem posts (aggregated from external sources)
exports.getSuiFeed = async (req, res) => {
  try {
    // This would typically fetch from external APIs
    // For now, we'll return posts from our database with source = 'twitter' or 'github' or 'reddit'
    const posts = await Post.find({
      source: { $in: ['twitter', 'github', 'reddit'] }
    }).sort({ createdAt: -1 }).limit(20);
    
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// In a real implementation, you would integrate with external APIs like:
/*
exports.getSuiFeed = async (req, res) => {
  try {
    // Example of fetching from Twitter API
    const twitterResponse = await axios.get('https://api.twitter.com/2/tweets/search/recent', {
      headers: {
        'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
      },
      params: {
        query: 'sui blockchain -is:retweet lang:en',
        max_results: 10
      }
    });
    
    // Process and format the data
    const formattedPosts = twitterResponse.data.data.map(tweet => ({
      id: tweet.id,
      source: 'twitter',
      author: 'Twitter User', // Would need to fetch user details
      authorHandle: `@${tweet.author_id}`, // Would need to fetch username
      avatarUrl: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
      timestamp: tweet.created_at,
      title: '',
      content: tweet.text,
      tags: [], // Extract hashtags
      stats: {
        upvotes: 0,
        comments: 0,
        shares: 0
      }
    }));
    
    res.json(formattedPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
*/