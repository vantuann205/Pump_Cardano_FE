import React from 'react';
import { X } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="w-full max-w-sm rounded-xl bg-pump-card border border-gray-700 shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-800 p-4">
          <h2 className="font-bold text-white">Trade Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 space-y-6">
          {/* Slippage */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Max Slippage</label>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {['0.5', '1', '5'].map((val) => (
                <button key={val} className="py-2 rounded bg-gray-800 text-xs font-bold text-gray-300 hover:bg-gray-700 border border-transparent hover:border-gray-600">
                  {val}%
                </button>
              ))}
              <div className="relative">
                <input 
                    type="number" 
                    placeholder="Custom" 
                    className="w-full h-full bg-gray-900 border border-gray-700 rounded px-2 text-right text-xs text-white outline-none focus:border-pump-green"
                />
                <span className="absolute right-7 top-1/2 -translate-y-1/2 text-gray-500 text-xs">%</span>
              </div>
            </div>
            <p className="text-[10px] text-gray-500">Maximum price variation you are willing to accept.</p>
          </div>

          {/* Priority Fee */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Priority Fee</label>
            <div className="grid grid-cols-3 gap-2">
              <button className="flex flex-col items-center py-2 rounded bg-gray-800 border border-transparent hover:border-pump-green/50">
                 <span className="text-xs font-bold text-white">Default</span>
                 <span className="text-[10px] text-gray-500">0.0001 SOL</span>
              </button>
              <button className="flex flex-col items-center py-2 rounded bg-pump-green/10 border border-pump-green">
                 <span className="text-xs font-bold text-pump-green">Fast</span>
                 <span className="text-[10px] text-pump-green/70">0.002 SOL</span>
              </button>
              <button className="flex flex-col items-center py-2 rounded bg-gray-800 border border-transparent hover:border-pump-green/50">
                 <span className="text-xs font-bold text-white">Turbo</span>
                 <span className="text-[10px] text-gray-500">0.005 SOL</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-800">
            <button onClick={onClose} className="w-full py-3 bg-pump-green text-black font-bold rounded-lg hover:bg-green-400 transition-colors">
                Save Settings
            </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;