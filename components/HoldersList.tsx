import React from 'react';

const MOCK_HOLDERS = [
    { rank: 1, address: '8x...3f2a', percent: '12.50%', value: '$5,240' },
    { rank: 2, address: 'Raydium', percent: '10.00%', value: '$4,192' },
    { rank: 3, address: '4k...9a12', percent: '4.20%', value: '$1,760' },
    { rank: 4, address: '9p...11zz', percent: '1.50%', value: '$628' },
    { rank: 5, address: '1a...bbcc', percent: '0.90%', value: '$377' },
];

const HoldersList: React.FC = () => {
  return (
    <div className="bg-pump-card border border-gray-800 rounded-lg p-4">
        <h3 className="font-bold text-gray-300 mb-4 text-sm uppercase">Top Holders</h3>
        <div className="space-y-3">
            {MOCK_HOLDERS.map((holder) => (
                <div key={holder.rank} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                        <span className="text-gray-600 font-mono w-4">{holder.rank}</span>
                        <span className="text-pump-accent hover:underline cursor-pointer">{holder.address}</span>
                        {holder.rank === 1 && <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 rounded">DEV</span>}
                        {holder.rank === 2 && <span className="text-[10px] bg-orange-500/20 text-orange-400 px-1.5 rounded">BONDING CURVE</span>}
                    </div>
                    <div className="text-right">
                        <div className="text-white">{holder.percent}</div>
                    </div>
                </div>
            ))}
            <button className="w-full text-center text-xs text-gray-500 hover:text-gray-300 mt-2 py-2">
                View all holders
            </button>
        </div>
    </div>
  );
};

export default HoldersList;