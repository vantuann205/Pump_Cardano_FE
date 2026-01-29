import React from 'react';
import { Coin } from '../types';
import BondingCurve from './BondingCurve';
import { MessageSquare } from 'lucide-react';

interface CoinCardProps {
  coin: Coin;
  onClick: (coin: Coin) => void;
}

const CoinCard: React.FC<CoinCardProps> = ({ coin, onClick }) => {
  return (
    <div 
        onClick={() => onClick(coin)}
        className="group relative flex flex-col gap-3 rounded-xl border border-gray-800 bg-pump-card p-4 hover:border-pump-green/50 transition-all cursor-pointer hover:shadow-lg hover:shadow-pump-green/10"
    >
      <div className="flex gap-4">
        <img 
            src={coin.imageUrl} 
            alt={coin.name} 
            className="h-24 w-24 rounded-md object-cover border border-gray-700"
        />
        <div className="flex flex-col flex-1 min-w-0">
            <div className="flex justify-between items-start">
                <span className="text-xs text-gray-500">Created by {coin.creator}</span>
                <span className="text-xs text-pump-green font-mono">Market Cap: ${coin.marketCap.toLocaleString()}</span>
            </div>
            <h3 className="text-lg font-bold text-white truncate mt-1">
                {coin.name} <span className="text-gray-400 text-sm font-normal">[{coin.ticker}]</span>
            </h3>
            <p className="text-sm text-gray-400 line-clamp-2 mt-1 mb-2">
                {coin.description}
            </p>
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-auto">
                <MessageSquare className="w-3 h-3" /> {coin.replies} replies
            </div>
        </div>
      </div>
      
      <BondingCurve progress={coin.bondingCurveProgress} />
    </div>
  );
};

export default CoinCard;