import React from 'react';
import { Trade } from '../types';

interface TransactionTableProps {
  trades: Trade[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ trades }) => {
  return (
    <div className="w-full overflow-x-auto">
      <h3 className="font-bold text-gray-300 mb-2">Recent Trades</h3>
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-500 uppercase bg-gray-900/50">
            <tr>
                <th className="px-2 py-2">Account</th>
                <th className="px-2 py-2">Type</th>
                <th className="px-2 py-2">SOL</th>
                <th className="px-2 py-2">Price</th>
                <th className="px-2 py-2">Date</th>
            </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
            {trades.map((trade, idx) => (
                <tr key={idx} className="hover:bg-gray-800/50">
                    <td className="px-2 py-2 text-gray-400 font-mono text-xs truncate max-w-[80px]">{trade.user}</td>
                    <td className={`px-2 py-2 font-bold ${trade.type === 'buy' ? 'text-pump-green' : 'text-pump-red'}`}>
                        {trade.type.toUpperCase()}
                    </td>
                    <td className="px-2 py-2 text-white">{trade.amount}</td>
                    <td className="px-2 py-2 text-gray-400 font-mono text-xs">{trade.price.toFixed(8)}</td>
                    <td className="px-2 py-2 text-gray-500 text-xs">{trade.timestamp}</td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;