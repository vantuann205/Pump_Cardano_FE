import React from 'react';
import { Coin } from '../types';
import { Crown } from 'lucide-react';

interface KingOfTheHillProps {
  coin: Coin;
  onClick: (coin: Coin) => void;
}

const KingOfTheHill: React.FC<KingOfTheHillProps> = ({ coin, onClick }) => {
  const amountInCurve = (42000 * (coin.bondingCurveProgress / 100)).toLocaleString(undefined, { maximumFractionDigits: 0 });

  return (
    <div className="mb-8 w-full animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Crown className="text-yellow-400 w-6 h-6 animate-bounce" />
        <h2 className="text-xl font-bold text-yellow-400">King of the Hill</h2>
      </div>
      
      <div 
        onClick={() => onClick(coin)}
        className="relative overflow-hidden rounded-2xl border-2 border-yellow-400/30 bg-gradient-to-r from-yellow-900/20 to-pump-card p-6 cursor-pointer hover:border-yellow-400 transition-colors"
      >
        <div className="flex flex-col md:flex-row gap-6 items-center">
            <img 
                src={coin.imageUrl} 
                alt={coin.name} 
                className="w-32 h-32 md:w-40 md:h-40 rounded-lg object-cover shadow-2xl shadow-yellow-500/20 border-2 border-yellow-400/50"
            />
            <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-black text-white mb-2">{coin.name} [{coin.ticker}]</h3>
                <p className="text-yellow-200/80 text-lg mb-4 font-medium">Market Cap: ${coin.marketCap.toLocaleString()}</p>
                <p className="text-gray-300 max-w-2xl">{coin.description}</p>
                
                <div className="mt-4 w-full max-w-md">
                   <div className="flex justify-between text-sm text-yellow-400 mb-1 font-bold">
                        <span className="uppercase">Bonding Curve Progress</span>
                        <span>{coin.bondingCurveProgress}%</span>
                   </div>
                   <div className="h-4 bg-gray-800 rounded-full overflow-hidden border border-yellow-400/30 mb-2">
                        <div 
                            className="h-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]" 
                            style={{ width: `${coin.bondingCurveProgress}%` }}
                        />
                   </div>
                   <p className="text-xs text-yellow-500/70 font-medium">
                        There are {amountInCurve} ₳ in the bonding curve
                   </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default KingOfTheHill;