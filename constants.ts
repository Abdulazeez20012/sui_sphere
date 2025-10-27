import type { Post, Feature, TrendingItem, Project, Badge, UserProfile, Recommendation, OnboardingStep } from './types';

// Lottie Animations Data (minified JSON)
const WELCOME_LOTTIE = {"v":"5.9.6","fr":30,"ip":0,"op":120,"w":512,"h":512,"nm":"Welcome Sphere","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Sphere","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[256,256,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0,0,100]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":15,"s":[100,100,100]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":90,"s":[95,95,100]},{"t":120,"s":[100,100,100]}],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[150,0],[-150,0]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"el","s":[200,200],"p":[0,0],"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse","hd":false},{"ty":"fl","c":{"a":0,"k":[0,0.682,0.937,1],"ix":4},"o":100,"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":[0,0],"a":[0,0],"s":[100,100],"r":0,"o":100,"sk":0,"sa":0,"nm":"Transform"}],"nm":"Group 1","np":3,"cix":2,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":120,"st":0,"bm":0}]};
const AGGREGATION_LOTTIE = {"v":"5.5.7","fr":60,"ip":0,"op":120,"w":512,"h":512,"nm":"Aggregation","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 1","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[256,256,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"gr","it":[{"ty":"rc","p":[0,0],"s":[100,100],"r":10,"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.2,0.8,0.86,1],"ix":4},"o":100,"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false}],"nm":"Rectangle 1","mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"rc","p":[150,0],"s":[100,100],"r":10,"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.2,0.8,0.86,1],"ix":4},"o":100,"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false}],"nm":"Rectangle 2","mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"rc","p":[-150,0],"s":[100,100],"r":10,"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.2,0.8,0.86,1],"ix":4},"o":100,"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false}],"nm":"Rectangle 3","mn":"ADBE Vector Group","hd":false},{"ty":"sh","ks":{"a":1,"k":[{"t":0,"s":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":"s1","t":0,"v":[-150,0]}]},{"t":30,"s":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":"s2","t":0,"v":[-50,0]}]},{"t":60,"s":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":"s3","t":0,"v":[-150,0]}]}]},"nm":"Path 1","hd":false},{"ty":"sh","ks":{"a":1,"k":[{"t":0,"s":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":"s1","t":0,"v":[150,0]}]},{"t":30,"s":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":"s2","t":0,"v":[50,0]}]},{"t":60,"s":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"n":"s3","t":0,"v":[150,0]}]}]},"nm":"Path 2","hd":false}],"nm":"Aggregation","np":5,"cix":2,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":120,"st":0,"bm":0}]};
const DISCUSSION_LOTTIE = {"v":"5.5.7","fr":30,"ip":0,"op":60,"w":512,"h":512,"nm":"Discussion","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 1","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[256,256,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"gr","it":[{"ty":"rc","p":[0,0],"s":[200,100],"r":50,"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0,0.682,0.937,1],"ix":4},"o":100,"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false}],"nm":"Bubble 1","mn":"ADBE Vector Group","hd":false,"ks":{"o":{"a":1,"k":[{"t":0,"s":[0]},{"t":10,"s":[100]},{"t":50,"s":[100]},{"t":60,"s":[0]}]}}},{"ty":"gr","it":[{"ty":"rc","p":[80,100],"s":[160,80],"r":40,"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.2,0.8,0.86,1],"ix":4},"o":100,"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false}],"nm":"Bubble 2","mn":"ADBE Vector Group","hd":false,"ks":{"o":{"a":1,"k":[{"t":5,"s":[0]},{"t":15,"s":[100]},{"t":55,"s":[100]},{"t":60,"s":[0]}]}}},{"ty":"gr","it":[{"ty":"rc","p":[-80,-100],"s":[160,80],"r":40,"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.2,0.8,0.86,1],"ix":4},"o":100,"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false}],"nm":"Bubble 3","mn":"ADBE Vector Group","hd":false,"ks":{"o":{"a":1,"k":[{"t":10,"s":[0]},{"t":20,"s":[100]},{"t":50,"s":[100]},{"t":60,"s":[0]}]}}}]}],"ip":0,"op":60,"st":0,"bm":0}]};
const WALLET_LOTTIE = {"v":"5.5.7","fr":60,"ip":0,"op":120,"w":512,"h":512,"nm":"Wallet Connect","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 1","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[256,256,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","p":[0,0],"s":[300,200],"r":20,"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"st","c":{"a":0,"k":[0.2,0.8,0.86,1],"ix":3},"o":100,"w":10,"lc":2,"lj":2,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"rc","p":[100,0],"s":[80,50],"r":10,"nm":"Rectangle Path 2","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0,0.682,0.937,1],"ix":4},"o":100,"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"t":0,"s":[0,0]},{"t":30,"s":[0,0]},{"t":60,"s":[-10,0]},{"t":90,"s":[0,0]}]}}],"nm":"Wallet","np":3,"cix":2,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":120,"st":0,"bm":0}]};

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    title: "Welcome to SuiSphere",
    description: "The Pulse of the Sui Ecosystem. Discover, discuss, and build, all in one unified sphere of activity.",
    lottieData: WELCOME_LOTTIE,
  },
  {
    title: "Aggregate Everything",
    description: "Tired of jumping between platforms? SuiSphere brings updates from Twitter, GitHub, Reddit, and more directly to you.",
    lottieData: AGGREGATION_LOTTIE,
  },
  {
    title: "Join the Conversation",
    description: "Engage in decentralized, censorship-resistant discussions. Share your ideas and connect with the community.",
    lottieData: DISCUSSION_LOTTIE,
  },
  {
    title: "Connect & Participate",
    description: "Connect your wallet to unlock the full potential of SuiSphere. Participate in governance, earn badges, and build your Web3 identity.",
    lottieData: WALLET_LOTTIE,
  },
];


export const FEATURES: Feature[] = [
  {
    iconName: 'Layers',
    title: 'All Sui Updates in One Place',
    description: 'Aggregate news from Twitter, GitHub, Reddit and more. Never miss a beat in the Sui ecosystem.',
  },
  {
    iconName: 'MessageSquare',
    title: 'Decentralized Discussion Hub',
    description: 'Engage in censorship-resistant conversations powered by Web3 principles and Sui technology.',
  },
  {
    iconName: 'Zap',
    title: 'Powered by zkLogin & Enoki',
    description: 'Seamlessly connect with your existing social accounts with gasless transactions for a smooth experience.',
  },
];

export const TRENDING_ITEMS: TrendingItem[] = [
  {
    id: '1',
    type: 'Project',
    title: 'Sui Name Service',
    source: 'suins.io',
    imageUrl: 'https://picsum.photos/seed/project1/400/300',
  },
  {
    id: '2',
    type: 'Discussion',
    title: 'Future of DeFi on Sui',
    source: 'Sui Mainnet',
    imageUrl: 'https://picsum.photos/seed/discussion2/400/300',
  },
  {
    id: '3',
    type: 'Developer',
    title: '@sui_dev',
    source: 'Twitter',
    imageUrl: 'https://picsum.photos/seed/dev3/400/300',
  },
  {
    id: '4',
    type: 'Project',
    title: 'Scallop Protocol',
    source: 'scallop.io',
    imageUrl: 'https://picsum.photos/seed/project4/400/300',
  },
    {
    id: '5',
    type: 'Discussion',
    title: 'Move Language vs. Solidity',
    source: 'Reddit r/sui',
    imageUrl: 'https://picsum.photos/seed/discussion5/400/300',
  },
];

export const POSTS: Post[] = [
  {
    id: 'p1',
    source: 'twitter',
    author: 'Sui',
    authorHandle: '@SuiNetwork',
    avatarUrl: 'https://picsum.photos/seed/sui_avatar/48/48',
    timestamp: '2h ago',
    title: 'Mainnet v1.23.0 is Live!',
    content: 'We are excited to announce the latest version of the Sui Mainnet is now live, bringing significant performance improvements and new features for developers. #Sui #Web3',
    tags: ['#Mainnet', '#Update', '#Sui'],
    stats: { upvotes: 1200, comments: 88, shares: 450 },
    imageUrl: 'https://picsum.photos/seed/post1/600/400',
  },
  {
    id: 'p2',
    source: 'github',
    author: 'Mysten Labs',
    authorHandle: 'sui/sui',
    avatarUrl: 'https://picsum.photos/seed/mysten_avatar/48/48',
    timestamp: '5h ago',
    title: 'Merged PR #1337: zkLogin Gasless Sponsor Example',
    content: 'This pull request introduces a new example for sponsoring gas fees for users interacting with dApps via zkLogin, simplifying user onboarding.',
    tags: ['#zkLogin', '#Gasless', '#Dev'],
    stats: { upvotes: 256, comments: 12, shares: 30 },
  },
  {
    id: 'p3',
    source: 'reddit',
    author: 'CryptoOG',
    authorHandle: 'r/sui',
    avatarUrl: 'https://picsum.photos/seed/reddit_avatar/48/48',
    timestamp: '1d ago',
    title: 'What are the most underrated NFT projects on Sui right now?',
    content: 'Looking for some hidden gems in the Sui NFT space. What collections have great art, strong communities, and long-term potential? Drop your suggestions below.',
    tags: ['#NFT', '#Discussion'],
    stats: { upvotes: 489, comments: 123, shares: 15 },
  },
   {
    id: 'p4',
    source: 'twitter',
    author: 'MoveDev',
    authorHandle: '@move_lang_dev',
    avatarUrl: 'https://picsum.photos/seed/move_avatar/48/48',
    timestamp: '3d ago',
    title: 'Deep Dive into Sui Kiosk',
    content: "Sui Kiosk is a powerful primitive for building rich, composable marketplaces. Let's explore how it enables novel NFT trading experiences without requiring creators to relinquish ownership. A thread...",
    tags: ['#Move', '#NFT', '#Tutorial'],
    stats: { upvotes: 890, comments: 42, shares: 210 },
  },
   {
    id: 'p5',
    source: 'github',
    author: 'Sui Foundation',
    authorHandle: 'sui-foundation/grants',
    avatarUrl: 'https://picsum.photos/seed/suifoundation_avatar/48/48',
    timestamp: '4d ago',
    title: 'Grant Program Wave 5 Recipients Announced',
    content: 'Congratulations to the latest recipients of the Sui Foundation Grant Program! We are thrilled to support these innovative projects building the future of the Sui ecosystem.',
    tags: ['#Grants', '#Ecosystem'],
    stats: { upvotes: 500, comments: 30, shares: 100 },
    imageUrl: 'https://picsum.photos/seed/post5/600/450',
  },
  {
    id: 'p6',
    source: 'reddit',
    author: 'SuiFan22',
    authorHandle: 'r/sui',
    avatarUrl: 'https://picsum.photos/seed/reddit_avatar2/48/48',
    timestamp: '5d ago',
    title: 'My experience building my first dApp on Sui',
    content: 'As someone coming from an EVM background, the learning curve for Move was steep but incredibly rewarding. The object-oriented model is a game-changer for asset management. Highly recommend diving in!',
    tags: ['#Move', '#Developer', '#Experience'],
    stats: { upvotes: 720, comments: 95, shares: 40 },
  },
  {
    id: 'p7',
    source: 'twitter',
    author: 'Sui Daily',
    authorHandle: '@SuiDaily',
    avatarUrl: 'https://picsum.photos/seed/suidaily_avatar/48/48',
    timestamp: '6d ago',
    title: 'Top 5 Gaming Projects to Watch on Sui',
    content: 'The gaming scene on Sui is heating up! From fully on-chain strategy games to high-fidelity RPGs, here are the projects you need to keep on your radar. 🎮 #SuiGaming #Web3',
    tags: ['#Gaming', '#Top5'],
    stats: { upvotes: 1500, comments: 210, shares: 600 },
    imageUrl: 'https://picsum.photos/seed/post7/600/420',
  }
];

export const PROJECTS: Project[] = [
    { id: 'proj1', name: 'Scallop', category: 'DeFi', description: 'The next generation peer-to-peer money market for the Sui ecosystem.', logoUrl: 'https://picsum.photos/seed/scallop/64/64', link: '#' },
    { id: 'proj2', name: 'Sui Name Service', category: 'Infrastructure', description: 'Decentralized .sui domain names for your wallet and identity.', logoUrl: 'https://picsum.photos/seed/suins/64/64', link: '#' },
    { id: 'proj3', name: 'Fuddies', category: 'NFT', description: 'A unique, community-driven PFP project with a rich lore and ecosystem.', logoUrl: 'https://picsum.photos/seed/fuddies/64/64', link: '#' },
    { id: 'proj4', name: 'Sui 8192', category: 'Gaming', description: 'A fully on-chain version of the classic 2048 puzzle game, built on Sui.', logoUrl: 'https://picsum.photos/seed/sui8192/64/64', link: '#' },
    { id: 'proj5', name: 'Suia', category: 'Social', description: 'The first social dApp on Sui, connecting users through shared interests and events.', logoUrl: 'https://picsum.photos/seed/suia/64/64', link: '#' },
    { id: 'proj6', name: 'Cetus', category: 'DeFi', description: 'A pioneer DEX and concentrated liquidity protocol built on Sui and Aptos.', logoUrl: 'https://picsum.photos/seed/cetus/64/64', link: '#' },
];

export const BADGES: Badge[] = [
    { id: 'b1', name: 'Genesis Member', description: 'Joined SuiSphere in the first week of launch.', iconName: 'Award' },
    { id: 'b2', name: 'Sui Contributor', description: 'Authored a post with over 1000 upvotes.', iconName: 'GitMerge' },
    { id: 'b3', name: 'Ecosystem Explorer', description: 'Explored and rated over 10 projects in the directory.', iconName: 'Compass' },
    { id: 'b4', name: 'Bug Hunter', description: 'Reported a valid bug that was resolved by the team.', iconName: 'Bug' },
];

export const USER_PROFILE: UserProfile = {
    address: '0x1a2b3c...e8f9',
    avatarUrl: 'https://picsum.photos/seed/user_profile/128/128',
    suiBalance: 1337.42,
    postIds: ['p3', 'p4'],
    savedPostIds: ['p1', 'p5'],
    badges: BADGES,
};

export const RECOMMENDATIONS: Recommendation[] = [
  PROJECTS[0], // Scallop
  POSTS[6],    // Top 5 Gaming Projects
  PROJECTS[4], // Suia
  POSTS[3],    // Deep Dive into Sui Kiosk
];