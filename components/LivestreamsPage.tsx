import React from 'react';
import { Users, Play, Heart, MessageSquare } from 'lucide-react';

const MOCK_STREAMS = [
  { id: 1, user: 'CryptoKing', title: 'APEING INTO $HYDRA GEMS 🚀', viewers: 1420, token: '$HYDRA', thumbnail: 'https://picsum.photos/seed/stream1/400/225', avatar: 'https://picsum.photos/seed/u1/50/50' },
  { id: 2, user: 'AdaWhale', title: 'Live Trading: Road to 1M ADA', viewers: 856, token: '$WHALE', thumbnail: 'https://picsum.photos/seed/stream2/400/225', avatar: 'https://picsum.photos/seed/u2/50/50' },
  { id: 3, user: 'DegensOnly', title: 'Sniper Bot Setup Tutorial', viewers: 3042, token: '$BOT', thumbnail: 'https://picsum.photos/seed/stream3/400/225', avatar: 'https://picsum.photos/seed/u3/50/50' },
  { id: 4, user: 'CharlesHoskinsonFan', title: 'Why Solana is slow... wait what?', viewers: 120, token: '$CH', thumbnail: 'https://picsum.photos/seed/stream4/400/225', avatar: 'https://picsum.photos/seed/u4/50/50' },
  { id: 5, user: 'MoonBoy', title: 'Buying every new listing!', viewers: 550, token: '$MOON', thumbnail: 'https://picsum.photos/seed/stream5/400/225', avatar: 'https://picsum.photos/seed/u5/50/50' },
  { id: 6, user: 'TechAnalysis', title: 'Chart review: 15m candles', viewers: 89, token: '$CHART', thumbnail: 'https://picsum.photos/seed/stream6/400/225', avatar: 'https://picsum.photos/seed/u6/50/50' },
];

const LivestreamsPage: React.FC = () => {
  return (
    <div className="animate-fade-in pb-10">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-black text-white flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
                Live Now
            </h1>
            <p className="text-gray-400 mt-1">Watch traders aping into bonding curves in real-time.</p>
        </div>
        <button className="bg-pump-accent hover:bg-violet-500 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 transition-colors">
            <Play className="w-4 h-4 fill-current" />
            Go Live
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_STREAMS.map((stream) => (
            <div key={stream.id} className="bg-pump-card border border-gray-800 rounded-xl overflow-hidden group hover:border-pump-accent/50 transition-all cursor-pointer">
                {/* Thumbnail Container */}
                <div className="relative aspect-video">
                    <img src={stream.thumbnail} alt={stream.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                        LIVE
                    </div>
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                        <Users className="w-3 h-3" /> {stream.viewers.toLocaleString()}
                    </div>
                    
                    {/* Play Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                        <div className="w-12 h-12 bg-pump-accent/90 rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                            <Play className="w-5 h-5 fill-white text-white ml-1" />
                        </div>
                    </div>
                </div>

                {/* Info */}
                <div className="p-4 flex gap-3">
                    <img src={stream.avatar} alt={stream.user} className="w-10 h-10 rounded-full border border-gray-700" />
                    <div className="flex-1 min-w-0">
                        <h3 className="text-white font-bold text-sm truncate leading-tight mb-1">{stream.title}</h3>
                        <p className="text-gray-400 text-xs hover:text-pump-accent">{stream.user}</p>
                        <div className="flex items-center gap-2 mt-2">
                             <span className="text-[10px] bg-gray-800 text-pump-green px-1.5 py-0.5 rounded font-mono border border-gray-700">
                                Trading {stream.token}
                             </span>
                        </div>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default LivestreamsPage;