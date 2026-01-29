import React from 'react';
import { Coin } from '../types';
import { TrendingUp, AlertCircle, ExternalLink } from 'lucide-react';

interface TokenInfoBarProps {
  coin: Coin;
}

const TokenInfoBar: React.FC<TokenInfoBarProps> = ({ coin }) => {
  const price = coin.priceHistory[coin.priceHistory.length - 1]?.price || 0.00000001;
  const change24h = Math.random() * 200 - 50; // Mock change

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-pump-card border border-gray-800 rounded-lg p-4 mb-4 gap-4">
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
                {coin.name} <span className="text-gray-500 text-lg">/{coin.ticker}</span>
            </h1>
            <div className="flex items-center gap-3 text-xs mt-1">
                <span className="bg-gray-800 text-gray-300 px-2 py-0.5 rounded flex items-center gap-1 cursor-pointer hover:bg-gray-700">
                    {coin.creator.substring(0,6)}...{coin.creator.substring(coin.creator.length-4)} <ExternalLink className="w-3 h-3" />
                </span>
                <span className="text-gray-500">Created {new Date(coin.createdAt).toLocaleDateString()}</span>
            </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6 md:gap-8">
        <div>
            <div className="text-[10px] text-gray-500 uppercase font-bold">Price</div>
            <div className={`text-lg font-mono font-bold ${change24h >= 0 ? 'text-pump-green' : 'text-pump-red'}`}>
                ${price.toFixed(8)}
            </div>
        </div>
        <div>
            <div className="text-[10px] text-gray-500 uppercase font-bold">Market Cap</div>
            <div className="text-lg font-mono font-bold text-white">
                ${coin.marketCap.toLocaleString()}
            </div>
        </div>
        <div className="hidden sm:block">
            <div className="text-[10px] text-gray-500 uppercase font-bold">24h Change</div>
            <div className={`text-lg font-mono font-bold flex items-center gap-1 ${change24h >= 0 ? 'text-pump-green' : 'text-pump-red'}`}>
                {change24h >= 0 ? <TrendingUp className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                {change24h.toFixed(2)}%
            </div>
        </div>
         <div className="hidden sm:block">
            <div className="text-[10px] text-gray-500 uppercase font-bold">Virtual Liq</div>
            <div className="text-lg font-mono font-bold text-white">
                $18,420
            </div>
        </div>
      </div>
    </div>
  );
};

export default TokenInfoBar;