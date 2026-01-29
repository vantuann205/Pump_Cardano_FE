import React, { useEffect, useState, useRef } from 'react';
import { Coin, Comment, Trade } from '../types';
import TradingChart from './TradingChart';
import TradeForm from './TradeForm';
import CommentSection from './CommentSection';
import TransactionTable from './TransactionTable';
import BondingCurve from './BondingCurve';
import TokenInfoBar from './TokenInfoBar';
import HoldersList from './HoldersList';
import { MOCK_COMMENTS } from '../services/mockData';
import { generateCoinAnalysis } from '../services/geminiService';
import { ArrowLeft, Sparkles, AlertTriangle } from 'lucide-react';
import { ToastMessage } from './Toast';

interface CoinDetailProps {
  coin: Coin;
  onBack: () => void;
  showToast: (type: ToastMessage['type'], title: string, message: string) => void;
}

const CoinDetail: React.FC<CoinDetailProps> = ({ coin, onBack, showToast }) => {
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [analysis, setAnalysis] = useState<string>('');
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  
  // Live Trades State
  const [liveTrades, setLiveTrades] = useState<Trade[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchAnalysis = async () => {
        setLoadingAnalysis(true);
        const text = await generateCoinAnalysis(coin);
        setAnalysis(text);
        setLoadingAnalysis(false);
    };
    fetchAnalysis();

    // Initial dummy trades
    const initialTrades: Trade[] = [];
    const now = Date.now();
    for(let i=0; i<5; i++) {
        initialTrades.push({
            type: Math.random() > 0.5 ? 'buy' : 'sell',
            amount: Math.random() * 500 + 10,
            price: 0.45 + (Math.random() * 0.05 - 0.025),
            timestamp: (now - i * 5000).toString(),
            user: `addr1...${Math.random().toString(36).substring(7, 10)}`
        });
    }
    setLiveTrades(initialTrades);

  }, [coin]);

  // Effect to simulate live random trades
  useEffect(() => {
    const interval = setInterval(() => {
        const isBuy = Math.random() > 0.4; // Slightly more buys
        const newTrade: Trade = {
            type: isBuy ? 'buy' : 'sell',
            amount: Math.random() * 200 + 10,
            price: 0.45 + (Math.random() * 0.02 - 0.01),
            timestamp: Date.now().toString(),
            user: `addr1...${Math.random().toString(36).substring(7, 10)}`
        };

        setLiveTrades(prev => [newTrade, ...prev].slice(0, 20)); // Keep last 20
    }, 2000); // New trade every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const handleAddComment = (text: string) => {
    const newComment: Comment = {
        id: Date.now().toString(),
        user: 'You',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'chat'
    };
    setComments([...comments, newComment]);
  };

  return (
    <div className="container mx-auto px-4 py-4 max-w-[1600px] animate-fade-in">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-white mb-4 text-sm font-bold uppercase transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to board
      </button>

      <TokenInfoBar coin={coin} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Chart, Analysis, Info */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            
            <TradingChart data={coin.priceHistory} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                    {/* Coin Info Card */}
                    <div className="bg-pump-card p-5 rounded-lg border border-gray-800">
                        <div className="flex gap-4 mb-4">
                             <img src={coin.imageUrl} alt={coin.name} className="w-16 h-16 rounded-lg object-cover border border-gray-700 shadow-md" />
                             <div>
                                 <h3 className="font-bold text-white text-lg">{coin.name}</h3>
                                 <p className="text-gray-400 text-sm mt-1">{coin.description}</p>
                             </div>
                        </div>
                        <div className="flex items-center gap-2 mb-3 text-pump-accent font-bold text-xs uppercase tracking-wide">
                            <Sparkles className="w-3 h-3" /> AI Sentinel Analysis
                        </div>
                        {loadingAnalysis ? (
                            <p className="text-gray-500 italic text-sm animate-pulse">Scanning Hydra Head...</p>
                        ) : (
                            <div className="text-gray-300 text-sm leading-relaxed p-3 bg-pump-accent/5 rounded border border-pump-accent/20">
                                {analysis}
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                     <div className="bg-pump-card p-5 rounded-lg border border-gray-800">
                        <h3 className="text-sm font-bold mb-4 uppercase text-gray-400">Hydra Curve</h3>
                        <BondingCurve progress={coin.bondingCurveProgress} />
                        <div className="mt-4 flex items-start gap-2 text-xs text-yellow-500 bg-yellow-500/10 p-2 rounded">
                            <AlertTriangle className="w-4 h-4 shrink-0" />
                            <p>
                                When the market cap reaches 42,000 ₳, all remaining liquidity is deposited into MinSwap and burned.
                            </p>
                        </div>
                    </div>
                    
                    <HoldersList />
                </div>
            </div>

            <TransactionTable trades={liveTrades} />
        </div>

        {/* Right Column: Trade Form & Chat */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-4">
            <TradeForm coin={coin} showToast={showToast} />
            <CommentSection comments={comments} onAddComment={handleAddComment} />
        </div>
      </div>
    </div>
  );
};

export default CoinDetail;