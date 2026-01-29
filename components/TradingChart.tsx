import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from 'recharts';
import { Coin } from '../types';

interface TradingChartProps {
  data: Coin['priceHistory'];
}

const TradingChart: React.FC<TradingChartProps> = ({ data }) => {
  const [timeframe, setTimeframe] = useState('15m');

  return (
    <div className="w-full bg-pump-card rounded-lg border border-gray-800 p-4 flex flex-col h-[450px]">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
            {['1m', '5m', '15m', '1H', '4H'].map((tf) => (
                <button 
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-3 py-1 text-xs font-bold rounded transition-colors ${
                        timeframe === tf 
                        ? 'bg-gray-700 text-white' 
                        : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800'
                    }`}
                >
                    {tf}
                </button>
            ))}
        </div>
        <div className="text-xs text-gray-500 font-mono">
            Price: USD
        </div>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
            <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4ade80" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#4ade80" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} vertical={false} />
            <XAxis 
                dataKey="time" 
                tick={{ fontSize: 10, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
                minTickGap={30}
            />
            <YAxis 
                domain={['auto', 'auto']} 
                orientation="right" 
                tick={{ fontSize: 10, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
                width={60}
                tickFormatter={(val) => val.toFixed(8)}
            />
            <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff', fontSize: '12px' }}
                itemStyle={{ color: '#4ade80' }}
                labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                formatter={(value: number) => [value.toFixed(9), 'Price']}
                cursor={{ stroke: '#4ade80', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Area 
                type="monotone" 
                dataKey="price" 
                stroke="#4ade80" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorPrice)" 
                animationDuration={500}
            />
            </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TradingChart;