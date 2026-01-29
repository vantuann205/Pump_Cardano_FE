export interface Coin {
  id: string;
  name: string;
  ticker: string;
  description: string;
  imageUrl: string;
  creator: string;
  marketCap: number;
  replies: number;
  bondingCurveProgress: number; // 0 to 100
  createdAt: number;
  lastReply: number;
  priceHistory: { time: string; price: number }[];
}

export interface Comment {
  id: string;
  user: string;
  text: string;
  timestamp: string;
  type: 'buy' | 'sell' | 'chat';
  amount?: number;
}

export enum ViewState {
  GRID = 'GRID',
  DETAIL = 'DETAIL',
  CREATE = 'CREATE',
  LIVESTREAMS = 'LIVESTREAMS',
  SUPPORT = 'SUPPORT'
}

export interface Trade {
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  timestamp: string;
  user: string;
}

export type SortOption = 'featured' | 'marketCap' | 'lastReply' | 'creationTime';