

export type Theme = 'dark' | 'light';
export type Page = 'landing' | 'feed' | 'ecosystem' | 'profile';
export type Layout = 'grid' | 'list';

export interface Post {
  id: string;
  source: 'twitter' | 'github' | 'reddit';
  author: string;
  authorHandle: string;
  avatarUrl: string;
  timestamp: string;
  title: string;
  content: string;
  tags: string[];
  stats: {
    upvotes: number;
    comments: number;
    shares: number;
  };
  imageUrl?: string;
}

export interface Feature {
  iconName: string;
  title: string;
  description: string;
}

export interface TrendingItem {
  id:string;
  type: 'Discussion' | 'Project' | 'Developer';
  title: string;
  source: string;
  imageUrl: string;
}

export interface Project {
  id: string;
  name: string;
  category: 'DeFi' | 'NFT' | 'Gaming' | 'Infrastructure' | 'Social';
  description: string;
  logoUrl: string;
  link: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  // This was simplified from `keyof typeof import('lucide-react')` to be more robust.
  iconName: 'Award' | 'GitMerge' | 'Compass' | 'Bug';
}

export interface UserProfile {
  address: string;
  avatarUrl: string;
  suiBalance: number;
  postIds: string[];
  savedPostIds: string[];
  badges: Badge[];
}

export type Recommendation = Post | Project;

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export interface OnboardingStep {
  title: string;
  description: string;
  lottieData: any;
}