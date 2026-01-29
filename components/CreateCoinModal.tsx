import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

interface CreateCoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCoinModal: React.FC<CreateCoinModalProps> = ({ isOpen, onClose }) => {
  const [showMore, setShowMore] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-xl bg-pump-card border border-gray-700 shadow-2xl animate-fade-in-up">
        <div className="flex items-center justify-between border-b border-gray-800 p-4">
            <h2 className="text-xl font-bold text-white">Start a new coin</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
            </button>
        </div>
        
        <div className="p-6 space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">name</label>
                <input type="text" className="w-full rounded bg-gray-900 border border-gray-700 p-2 text-white focus:border-pump-green outline-none" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">ticker</label>
                <input type="text" className="w-full rounded bg-gray-900 border border-gray-700 p-2 text-white focus:border-pump-green outline-none" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">description</label>
                <textarea className="w-full rounded bg-gray-900 border border-gray-700 p-2 text-white focus:border-pump-green outline-none h-24" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">image</label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 flex flex-col items-center justify-center text-gray-500 hover:border-pump-green hover:text-pump-green cursor-pointer transition-colors">
                    <Upload className="w-8 h-8 mb-2" />
                    <span className="text-sm">Drag and drop or click to upload</span>
                </div>
            </div>
            
            <div className="pt-2">
                <button 
                    onClick={() => setShowMore(!showMore)}
                    className="text-sm text-pump-green hover:underline"
                >
                    {showMore ? 'Hide options' : 'Show more options'}
                </button>
                {showMore && (
                    <div className="mt-4 p-4 bg-gray-900/50 rounded animate-fade-in">
                        <label className="block text-sm font-medium text-gray-400 mb-1">Twitter Link (Optional)</label>
                        <input type="text" className="w-full rounded bg-gray-900 border border-gray-700 p-2 text-white text-sm outline-none mb-2" />
                        <label className="block text-sm font-medium text-gray-400 mb-1">Telegram Link (Optional)</label>
                        <input type="text" className="w-full rounded bg-gray-900 border border-gray-700 p-2 text-white text-sm outline-none" />
                    </div>
                )}
            </div>

            <button className="w-full bg-pump-green hover:bg-green-400 text-black font-bold py-3 rounded mt-4">
                create coin
            </button>
            <p className="text-xs text-center text-gray-500">Cost to deploy: ~0.02 SOL</p>
        </div>
      </div>
    </div>
  );
};

export default CreateCoinModal;