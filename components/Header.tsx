import React from 'react';
import { Wallet, Menu, Search, HelpCircle, LayoutGrid, PlusCircle, Tv, LifeBuoy } from 'lucide-react';
import { ToastMessage } from './Toast';

interface HeaderProps {
  onGoHome: () => void;
  onGoCreate: () => void;
  onGoLivestreams: () => void;
  onGoSupport: () => void;
  showToast: (type: ToastMessage['type'], title: string, message: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onGoHome, onGoCreate, onGoLivestreams, onGoSupport, showToast }) => {

  const handleConnectWallet = () => {
    // Simulate connection process
    showToast('processing', 'Connecting Wallet', 'Looking for Nami or Eternl wallet...');
    
    setTimeout(() => {
        showToast('success', 'Wallet Connected Successfully', 'Connected to addr1...xyz');
    }, 1500);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-pump-bg/95 backdrop-blur supports-[backdrop-filter]:bg-pump-bg/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo Section */}
        <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={onGoHome}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-black text-xl shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform">
                    ₳
                </div>
                <div className="hidden sm:flex flex-col">
                    <span className="text-lg font-bold tracking-tight text-white leading-none">
                        Pump.Cardano
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">Hydra L2 Protocol</span>
                </div>
            </div>

            <nav className="hidden xl:flex items-center gap-6 text-sm font-medium">
                <button onClick={onGoHome} className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors">
                    <LayoutGrid className="w-4 h-4" /> Board
                </button>
                <button onClick={onGoLivestreams} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <Tv className="w-4 h-4" /> Livestreams
                </button>
                <button onClick={onGoCreate} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <PlusCircle className="w-4 h-4" /> Start Coin
                </button>
                <button onClick={onGoSupport} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <LifeBuoy className="w-4 h-4" /> Support
                </button>
                <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <HelpCircle className="w-4 h-4" /> Hydra Docs
                </button>
            </nav>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md px-8 hidden lg:block">
            <div className="relative group">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="search"
                  placeholder="search ADA tokens..."
                  className="w-full rounded-lg bg-pump-card border border-gray-800 py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-gray-900 transition-all text-white placeholder-gray-600"
                />
            </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
            <div className="hidden md:flex xl:hidden items-center gap-2">
                 <button onClick={onGoCreate} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm font-bold mr-2">
                    <PlusCircle className="w-4 h-4" /> Start
                </button>
            </div>
            <div className="flex items-center gap-2 bg-pump-card border border-gray-800 rounded p-1 pl-3 pr-1">
                <span className="text-xs font-mono text-gray-400 hidden md:block">0 ₳</span>
                <button 
                    onClick={handleConnectWallet}
                    className="flex items-center gap-2 rounded bg-gray-800 px-3 py-1.5 text-xs font-bold text-white hover:bg-gray-700 transition-colors"
                >
                    <Wallet className="h-3 w-3" />
                    <span>connect wallet</span>
                </button>
            </div>
            <button className="xl:hidden p-2 text-gray-400 hover:text-white">
                <Menu className="h-6 w-6" />
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;