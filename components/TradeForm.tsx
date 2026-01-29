import React, { useState } from 'react';
import { Coin } from '../types';
import { Settings, Wallet } from 'lucide-react';
import SettingsModal from './SettingsModal';
import { ToastMessage } from './Toast';

interface TradeFormProps {
  coin: Coin;
  showToast: (type: ToastMessage['type'], title: string, message: string) => void;
}

const TradeForm: React.FC<TradeFormProps> = ({ coin, showToast }) => {
  const [mode, setMode] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState<string>('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const mockPrice = coin.priceHistory[coin.priceHistory.length - 1]?.price || 0.45;
  const calculatedTokens = amount ? (parseFloat(amount) / mockPrice).toLocaleString(undefined, { maximumFractionDigits: 0 }) : '0.00';

  const handleTrade = () => {
    if (!amount) {
        showToast('error', 'Trade Failed', 'Please enter an amount to trade.');
        return;
    }

    // Processing Toast
    showToast('processing', 'Processing Transaction', 'Interacting with Hydra L2 Smart Contract...');

    setTimeout(() => {
        // Mock Success
        showToast('success', 'Transaction Successful', `${mode === 'buy' ? 'Bought' : 'Sold'} ${calculatedTokens} ${coin.ticker}`);
        setAmount('');
    }, 2000);
  };

  return (
    <>
    <div className="bg-pump-card border border-gray-800 rounded-lg overflow-hidden shadow-lg">
      {/* Tabs */}
      <div className="flex border-b border-gray-800">
        <button 
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-all relative ${
                mode === 'buy' 
                ? 'text-pump-green bg-pump-green/5' 
                : 'text-gray-500 hover:text-gray-300 bg-gray-900/50'
            }`}
            onClick={() => setMode('buy')}
        >
            Buy
            {mode === 'buy' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pump-green" />}
        </button>
        <button 
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-all relative ${
                mode === 'sell' 
                ? 'text-pump-red bg-pump-red/5' 
                : 'text-gray-500 hover:text-gray-300 bg-gray-900/50'
            }`}
            onClick={() => setMode('sell')}
        >
            Sell
            {mode === 'sell' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pump-red" />}
        </button>
      </div>

      <div className="p-5 space-y-5">
        
        {/* Settings & Balance Header */}
        <div className="flex justify-between items-center text-xs">
            <button 
                onClick={() => setIsSettingsOpen(true)}
                className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors bg-gray-900 px-2 py-1 rounded"
            >
                <Settings className="w-3.5 h-3.5" />
                <span>Set max slippage</span>
            </button>
            <div className="flex items-center gap-1 text-gray-500">
                <Wallet className="w-3.5 h-3.5" />
                <span>0 ₳</span>
            </div>
        </div>

        {/* Input Area */}
        <div className="bg-gray-900/80 rounded-lg p-4 border border-gray-800 focus-within:border-pump-green/50 transition-colors">
            <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
                <span className="uppercase">{mode === 'buy' ? 'Amount (ADA)' : `Amount (${coin.ticker})`}</span>
                <span className="uppercase cursor-pointer hover:text-white">Max</span>
            </div>
            <div className="flex items-center justify-between gap-4">
                <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.0"
                    className="bg-transparent text-2xl font-mono font-bold w-full outline-none text-white placeholder-gray-700"
                />
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold bg-gray-800 px-2 py-1 rounded text-gray-300">
                        {mode === 'buy' ? 'ADA' : coin.ticker}
                    </span>
                </div>
            </div>
        </div>

        {/* Quick Buttons */}
        {mode === 'buy' ? (
            <div className="flex gap-2">
                <button onClick={() => setAmount('')} className="bg-gray-800 text-gray-500 hover:text-white px-3 py-2 rounded text-xs font-bold transition-colors">Reset</button>
                {[50, 100, 500, 1000].map((val) => (
                    <button 
                        key={val}
                        onClick={() => setAmount(val.toString())}
                        className="flex-1 bg-gray-800 hover:bg-gray-700 text-xs py-2 rounded text-gray-300 font-mono transition-colors border border-transparent hover:border-gray-600"
                    >
                        {val} ₳
                    </button>
                ))}
            </div>
        ) : (
            <div className="flex gap-2">
                 <button onClick={() => setAmount('')} className="bg-gray-800 text-gray-500 hover:text-white px-3 py-2 rounded text-xs font-bold transition-colors">Reset</button>
                 {['25%', '50%', '75%', '100%'].map((val) => (
                    <button 
                        key={val}
                        className="flex-1 bg-gray-800 hover:bg-gray-700 text-xs py-2 rounded text-gray-300 font-mono transition-colors border border-transparent hover:border-gray-600"
                    >
                        {val}
                    </button>
                ))}
            </div>
        )}

        {/* Summary Details */}
        <div className="space-y-2 p-3 bg-gray-900/50 rounded-lg text-xs">
            <div className="flex justify-between items-center text-gray-500">
                <span>Est. Receive</span>
                <span className="font-mono text-white font-bold">~{calculatedTokens} {mode === 'buy' ? coin.ticker : 'ADA'}</span>
            </div>
            <div className="flex justify-between items-center text-gray-500">
                <span>Price Impact</span>
                <span className="font-mono text-pump-green">~0.05%</span>
            </div>
            <div className="flex justify-between items-center text-gray-500">
                <span>Hydra Fee</span>
                <span className="font-mono text-gray-400">0.25 ₳</span>
            </div>
        </div>

        {/* Submit Button */}
        <button 
            onClick={handleTrade}
            className={`w-full py-4 rounded-lg text-lg font-bold uppercase tracking-wide transition-all transform active:scale-95 ${
                mode === 'buy' 
                ? 'bg-pump-green hover:bg-green-400 text-black shadow-[0_0_20px_rgba(74,222,128,0.2)]' 
                : 'bg-pump-red hover:bg-red-400 text-black shadow-[0_0_20px_rgba(248,113,113,0.2)]'
            }`}
        >
            {mode === 'buy' ? 'Place Buy Order' : 'Place Sell Order'}
        </button>
      </div>
    </div>
    <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
};

export default TradeForm;