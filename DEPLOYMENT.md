# SuiSphere Deployment Guide

This guide provides instructions for deploying the SuiSphere Web3 Forum Platform.

## Prerequisites

1. Node.js (v16 or higher)
2. MongoDB instance (local or cloud)
3. Sui CLI for smart contract deployment
4. Wallet with SUI tokens for gas fees

## Local Development Setup

### 1. Frontend Setup

```bash
# Install frontend dependencies
npm install

# Start frontend development server
npm run dev
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Start backend development server
npm run dev
```

### 3. Run Both Services Concurrently

```bash
# From the root directory, run both frontend and backend
npm run dev:all
```

## Environment Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/suisphere

# Server port
PORT=5000

# Optional: Twitter API token for fetching external posts
TWITTER_BEARER_TOKEN=your_twitter_bearer_token_here
```

## Smart Contract Deployment

### 1. Install Sui CLI

Follow the official Sui documentation to install the Sui CLI:
https://docs.sui.io/devnet/build/install

### 2. Build Smart Contracts

```bash
# Navigate to move directory
cd move

# Build contracts
sui move build
```

### 3. Deploy to Testnet

```bash
# Deploy to Sui testnet
sui client publish --network testnet
```

Note the package ID from the deployment output. You'll need this for frontend integration.

## Production Deployment

### Backend Deployment

1. Set up a MongoDB instance (MongoDB Atlas recommended)
2. Configure environment variables
3. Deploy to a Node.js hosting platform:
   - Vercel
   - Heroku
   - AWS Elastic Beanstalk
   - Google Cloud Run
   - DigitalOcean App Platform

Example for Heroku:
```bash
# Add MongoDB add-on
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set PORT=5000

# Deploy
git push heroku main
```

### Frontend Deployment

1. Build the production version:
   ```bash
   npm run build
   ```

2. Deploy to a static hosting service:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3 + CloudFront

Example for Vercel:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Smart Contract Deployment to Mainnet

1. Ensure you have sufficient SUI tokens for gas fees
2. Deploy to mainnet:
   ```bash
   # From the move directory
   sui client publish --network mainnet
   ```

## Monitoring and Maintenance

### Backend Monitoring

- Set up logging with Winston or similar
- Use monitoring tools like:
  - New Relic
  - Datadog
  - Prometheus + Grafana

### Database Maintenance

- Regular backups of MongoDB data
- Monitor database performance
- Set up alerts for disk space usage

### Smart Contract Updates

- Sui Move contracts are immutable by default
- To update functionality, deploy new contract versions
- Migrate data between contract versions if needed

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check MongoDB URI in `.env` file
   - Ensure MongoDB service is running
   - Verify network connectivity

2. **Wallet Connection Issues**
   - Ensure wallet extension is installed
   - Check network configuration (testnet/mainnet)
   - Verify contract addresses in frontend

3. **API Endpoints Not Working**
   - Check backend server is running
   - Verify PORT configuration
   - Check for firewall issues

### Getting Help

- Check the Sui documentation: https://docs.sui.io
- Visit the Sui Discord community
- File issues on the Sui GitHub repository