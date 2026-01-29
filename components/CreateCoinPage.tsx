import React, { useState } from 'react';
import { Upload, AlertTriangle, ShieldCheck, Rocket } from 'lucide-react';

interface CreateCoinPageProps {
  onCancel: () => void;
}

const CreateCoinPage: React.FC<CreateCoinPageProps> = ({ onCancel }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-white mb-2">Launch on Hydra</h1>
        <p className="text-gray-400">Deploy your token on Cardano Layer 2 instantly. No presale, no team allocation.</p>
      </div>

      <div className="bg-pump-card border border-gray-800 rounded-xl p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

        <div className="grid gap-8">
            {/* Main Form */}
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-blue-400 uppercase mb-2">Token Name</label>
                        <input type="text" placeholder="e.g. Based Charles" className="w-full rounded-lg bg-gray-900 border border-gray-700 p-3 text-white focus:border-blue-500 outline-none transition-colors" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-blue-400 uppercase mb-2">Ticker</label>
                        <input type="text" placeholder="e.g. $ADA" className="w-full rounded-lg bg-gray-900 border border-gray-700 p-3 text-white focus:border-blue-500 outline-none transition-colors" />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-blue-400 uppercase mb-2">Description</label>
                    <textarea placeholder="Tell the world why this token will flip ETH..." className="w-full rounded-lg bg-gray-900 border border-gray-700 p-3 text-white focus:border-blue-500 outline-none h-32 transition-colors resize-none" />
                </div>

                <div>
                    <label className="block text-xs font-bold text-blue-400 uppercase mb-2">Token Image</label>
                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-10 flex flex-col items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-500 cursor-pointer transition-all bg-gray-900/50">
                        <Upload className="w-10 h-10 mb-3" />
                        <span className="text-sm font-medium">Drag and drop or click to upload</span>
                        <span className="text-xs text-gray-600 mt-1">PNG, JPG, GIF up to 5MB</span>
                    </div>
                </div>
            </div>

            {/* Advanced Options Toggle */}
            <div className="border-t border-gray-800 pt-6">
                <button 
                    onClick={() => setShowMore(!showMore)}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                    {showMore ? 'Hide Social Links' : 'Add Social Links (Optional)'}
                </button>
                
                {showMore && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Twitter Link</label>
                            <input type="text" placeholder="https://x.com/..." className="w-full rounded bg-gray-900 border border-gray-700 p-2 text-white text-sm outline-none focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Telegram Link</label>
                            <input type="text" placeholder="https://t.me/..." className="w-full rounded bg-gray-900 border border-gray-700 p-2 text-white text-sm outline-none focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Website</label>
                            <input type="text" placeholder="https://..." className="w-full rounded bg-gray-900 border border-gray-700 p-2 text-white text-sm outline-none focus:border-blue-500" />
                        </div>
                    </div>
                )}
            </div>

            {/* Info Box */}
            <div className="bg-blue-900/10 border border-blue-500/20 rounded-lg p-4 flex gap-3 items-start">
                <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div className="text-sm text-blue-200/80">
                    <p className="mb-1 font-bold text-blue-400">Fair Launch Protocol</p>
                    <p>Sniper protection enabled. Metadata is immutable on Cardano. Liquidity is automatically locked in the bonding curve contract until graduation.</p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-2">
                <button 
                    onClick={onCancel}
                    className="flex-1 py-4 rounded-lg font-bold text-gray-400 hover:text-white border border-gray-700 hover:bg-gray-800 transition-colors"
                >
                    Cancel
                </button>
                <button className="flex-[2] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-lg text-lg uppercase tracking-wide shadow-lg shadow-blue-900/50 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]">
                    <Rocket className="w-5 h-5" />
                    Deploy Token (2.5 ₳)
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCoinPage;