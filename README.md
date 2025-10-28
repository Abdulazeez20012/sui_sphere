# SuiSphere - Web3 Forum Platform

SuiSphere is a complete Web3 forum platform built on the Sui blockchain, featuring a modern frontend with a backend API layer and smart contracts.

## Project Structure

```
SuiSphere/
├── frontend/        # React + TypeScript frontend
├── backend/         # Node.js + Express backend
├── move/            # Sui Move smart contracts
└── README.md
```

## Features

- **Frontend**: Built with React, TypeScript, and Vite
- **Backend**: Node.js + Express with MongoDB storage
- **Smart Contracts**: Sui Move contracts for on-chain operations
- **Wallet Integration**: Suiet Wallet Kit for seamless wallet connection
- **Real-time Updates**: WebSocket support for live feed updates
- **Responsive Design**: Works on all device sizes

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Sui CLI (for smart contract deployment)

### Installation

1. **Install frontend dependencies:**
   ```bash
   npm install
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

### Running the Application

1. **Start the backend server:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend:**
   ```bash
   npm run dev
   ```

### Smart Contract Deployment

1. **Navigate to the move directory:**
   ```bash
   cd move
   ```

2. **Build the contracts:**
   ```bash
   sui move build
   ```

3. **Deploy to testnet:**
   ```bash
   sui client publish --network testnet
   ```

## API Endpoints

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `GET /api/posts/:id` - Get a single post
- `POST /api/posts/:id/upvote` - Upvote a post
- `POST /api/posts/:id/comment` - Add a comment to a post

### Users
- `GET /api/user/:id` - Get user by wallet address
- `POST /api/user` - Create or update user
- `POST /api/user/:userId/save` - Save a post for user

### Feeds
- `GET /api/feed/trending` - Get trending posts
- `GET /api/feed/sui` - Get Sui ecosystem posts

## Smart Contracts

The smart contracts are written in Sui Move and include:

- **forum.move**: Core forum functionality
- **post.move**: Post and comment management
- **user.move**: User profile and badge management

## Wallet Integration

The platform uses Suiet Wallet Kit for wallet integration, allowing users to:
- Connect their Sui wallet
- Sign transactions
- Interact with smart contracts
- View their SUI balance

## Development

### Frontend Components

- **FeedPage**: Main feed with posts
- **ProfilePage**: User profile with posts and badges
- **EcosystemPage**: Sui ecosystem projects
- **Navbar**: Navigation with wallet connection
- **PostCard**: Individual post display
- **CreatePostModal**: Modal for creating new posts

### Backend Structure

- **Controllers**: Handle API logic
- **Models**: MongoDB data models
- **Routes**: API endpoint definitions
- **Services**: Business logic implementation

## Deployment

### Backend Deployment

1. Set up a MongoDB instance
2. Configure environment variables
3. Deploy to a Node.js hosting platform (e.g., Vercel, Heroku, AWS)

### Frontend Deployment

1. Build the production version:
   ```bash
   npm run build
   ```
2. Deploy to a static hosting service (e.g., Vercel, Netlify)

### Smart Contract Deployment

1. Deploy to Sui testnet or mainnet
2. Update contract addresses in the frontend

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License.