import { Coin, Comment, Trade } from '../types';

const generatePriceHistory = () => {
  const data = [];
  let price = 0.45; // Base ADA price reference roughly
  for (let i = 0; i < 20; i++) {
    price = price * (1 + (Math.random() * 0.4 - 0.15));
    data.push({
      time: new Date(Date.now() - (20 - i) * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      price: Math.max(0.000001, price)
    });
  }
  return data;
};

const ADJECTIVES = ['Based', 'Hydra', 'Cardano', 'Ada', 'Ouroboros', 'Blue', 'Fast', 'Lazy', 'Rich', 'Sad', 'Happy', 'Doge', 'Pepe', 'Hoskinson', 'Smart'];
const NOUNS = ['Lovelace', 'Whale', 'Frog', 'Dog', 'Cat', 'Moon', 'Rocket', 'Gem', 'Killer', 'Protocol', 'Swap', 'Stake', 'Pool', 'Node', 'Block'];

const generateCoins = (count: number): Coin[] => {
  const coins: Coin[] = [];
  for (let i = 0; i < count; i++) {
    const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
    const name = `${adj} ${noun}`;
    const ticker = `$${adj.substring(0, 3).toUpperCase()}${noun.substring(0, 3).toUpperCase()}`;
    
    coins.push({
      id: i.toString(),
      name: name,
      ticker: ticker,
      description: `The most decentralized ${noun.toLowerCase()} on the Hydra Layer 2 scaling solution. Powered by eUTXO logic.`,
      imageUrl: `https://picsum.photos/200/200?random=${i + 100}`,
      creator: `addr1...${Math.random().toString(36).substring(7)}`,
      marketCap: Math.floor(Math.random() * 100000) + 5000,
      replies: Math.floor(Math.random() * 200),
      bondingCurveProgress: Math.floor(Math.random() * 100),
      createdAt: Date.now() - Math.floor(Math.random() * 10000000),
      lastReply: Date.now() - Math.floor(Math.random() * 500000),
      priceHistory: generatePriceHistory(),
    });
  }
  return coins;
};

export const MOCK_COINS: Coin[] = generateCoins(35);

export const MOCK_COMMENTS: Comment[] = [
  { id: '1', user: 'AdaMaxi', text: 'Hydra is fast af!', timestamp: '10:00', type: 'chat' },
  { id: '2', user: 'CharlesH', text: 'Does this scale?', timestamp: '10:01', type: 'chat' },
  { id: '3', user: 'SniperBot', text: '', timestamp: '10:02', type: 'buy', amount: 250 },
];

export const MOCK_TRADES: Trade[] = [
  { type: 'buy', amount: 120, price: 0.45, timestamp: '10:05:01', user: 'addr1...a9z' },
  { type: 'sell', amount: 50, price: 0.44, timestamp: '10:05:05', user: 'addr1...k2p' },
  { type: 'buy', amount: 500, price: 0.46, timestamp: '10:05:12', user: 'addr1...m5m' },
];