import React, { useEffect, useState } from 'react';
import { Trade } from '../types';

interface TransactionTableProps {
  trades: Trade[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ trades }) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const getRelativeTime = (timestampStr: string) => {
    // The timestampStr from mock trades is in '10:05:01' format or a Date number
    // For the "live" simulated trades, we will pass a numeric timestamp converted to string, or handle ISO.
    // Let's assume the simulated trades pass a parseable timestamp or we handle legacy mock data.
    
    let timeDiff = 0;
    
    // Check if timestamp is a simple time string like "10:00" (Mock data legacy)
    if (timestampStr.includes(':')) {
        // Just return the string for legacy static data
        return timestampStr; 
    }

    // Assume it's a numeric string for live data
    const tradeTime = parseInt(timestampStr);
    if (!isNaN(tradeTime)) {
        timeDiff = now - tradeTime;
    }

    if (timeDiff < 1000) return 'just now';
    const seconds = Math.floor(timeDiff / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    return '> 1h ago';
  };

  return (
    <div className="w-full overflow-x-auto">
      <h3 className="font-bold text-gray-300 mb-2">Recent Trades</h3>
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-500 uppercase bg-gray-900/50">
            <tr>
                <th className="px-2 py-2">Account</th>
                <th className="px-2 py-2">Type</th>
                <th className="px-2 py-2">ADA</th>
                <th className="px-2 py-2">Price</th>
                <th className="px-2 py-2">Date</th>
            </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
            {trades.map((trade, idx) => (
                <tr key={idx} className="hover:bg-gray-800/50 animate-fade-in">
                    <td className="px-2 py-2 text-gray-400 font-mono text-xs truncate max-w-[80px]">{trade.user}</td>
                    <td className={`px-2 py-2 font-bold ${trade.type === 'buy' ? 'text-pump-green' : 'text-pump-red'}`}>
                        {trade.type.toUpperCase()}
                    </td>
                    <td className="px-2 py-2 text-white">{trade.amount.toFixed(2)}</td>
                    <td className="px-2 py-2 text-gray-400 font-mono text-xs">{trade.price.toFixed(6)}</td>
                    <td className="px-2 py-2 text-gray-500 text-xs">{getRelativeTime(trade.timestamp)}</td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;