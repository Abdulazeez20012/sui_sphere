// Simple test script to verify backend API endpoints
const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

async function testAPI() {
  try {
    console.log('Testing SuiSphere Backend API...\n');
    
    // Test GET /posts
    console.log('1. Testing GET /posts');
    const postsResponse = await axios.get(`${API_BASE_URL}/posts`);
    console.log(`   Status: ${postsResponse.status}`);
    console.log(`   Posts count: ${postsResponse.data.posts?.length || 0}\n`);
    
    // Test GET /feed/trending
    console.log('2. Testing GET /feed/trending');
    const trendingResponse = await axios.get(`${API_BASE_URL}/feed/trending`);
    console.log(`   Status: ${trendingResponse.status}`);
    console.log(`   Trending posts count: ${trendingResponse.data.length}\n`);
    
    // Test GET /feed/sui
    console.log('3. Testing GET /feed/sui');
    const suiResponse = await axios.get(`${API_BASE_URL}/feed/sui`);
    console.log(`   Status: ${suiResponse.status}`);
    console.log(`   Sui posts count: ${suiResponse.data.length}\n`);
    
    console.log('All tests completed successfully!');
  } catch (error) {
    console.error('API Test failed:', error.message);
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Data: ${JSON.stringify(error.response.data, null, 2)}`);
    }
  }
}

// Run the test
testAPI();