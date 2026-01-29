import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import KingOfTheHill from './components/KingOfTheHill';
import CoinCard from './components/CoinCard';
import CoinDetail from './components/CoinDetail';
import CreateCoinPage from './components/CreateCoinPage';
import LivestreamsPage from './components/LivestreamsPage';
import SupportPage from './components/SupportPage';
import FilterBar from './components/FilterBar';
import Toast, { ToastMessage } from './components/Toast';
import { MOCK_COINS } from './services/mockData';
import { Coin, ViewState, SortOption } from './types';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>(ViewState.GRID);
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Toast Handler
  const addToast = (type: ToastMessage['type'], title: string, message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, title, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleCoinClick = (coin: Coin) => {
    setSelectedCoin(coin);
    setViewState(ViewState.DETAIL);
  };

  const handleGoHome = () => {
    setSelectedCoin(null);
    setViewState(ViewState.GRID);
  };

  const handleGoCreate = () => {
    setViewState(ViewState.CREATE);
  };

  const handleGoLivestreams = () => {
    setViewState(ViewState.LIVESTREAMS);
  };

  const handleGoSupport = () => {
    setViewState(ViewState.SUPPORT);
  };

  const sortedCoins = useMemo(() => {
    const coins = [...MOCK_COINS];
    switch (sortOption) {
      case 'marketCap':
        return coins.sort((a, b) => b.marketCap - a.marketCap);
      case 'creationTime':
        return coins.sort((a, b) => b.createdAt - a.createdAt);
      case 'lastReply':
        return coins.sort((a, b) => b.lastReply - a.lastReply);
      case 'featured':
      default:
        return coins; // Keep default order (mock data order)
    }
  }, [sortOption]);

  return (
    <div className="min-h-screen bg-pump-bg text-pump-text font-sans pb-20 relative">
      <Header 
        onGoHome={handleGoHome} 
        onGoCreate={handleGoCreate} 
        onGoLivestreams={handleGoLivestreams}
        onGoSupport={handleGoSupport}
        showToast={addToast}
      />
      
      {/* Toast Container */}
      <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm pointer-events-none">
        {toasts.map((toast) => (
            <Toast key={toast.id} toast={toast} onClose={removeToast} />
        ))}
      </div>
      
      <main className="container mx-auto px-4 py-6">
        {viewState === ViewState.GRID && (
          <>
            <KingOfTheHill coin={sortedCoins[0]} onClick={handleCoinClick} />
            
            <div className="mt-8">
                <FilterBar currentSort={sortOption} onSortChange={setSortOption} />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {sortedCoins.map((coin) => (
                    <CoinCard 
                    key={coin.id} 
                    coin={coin} 
                    onClick={handleCoinClick} 
                    />
                ))}
                </div>
            </div>
          </>
        )}
        
        {viewState === ViewState.DETAIL && selectedCoin && (
            <CoinDetail 
              coin={selectedCoin} 
              onBack={handleGoHome}
              showToast={addToast}
            />
        )}

        {viewState === ViewState.CREATE && (
            <CreateCoinPage onCancel={handleGoHome} />
        )}

        {viewState === ViewState.LIVESTREAMS && (
            <LivestreamsPage />
        )}

        {viewState === ViewState.SUPPORT && (
            <SupportPage />
        )}
      </main>
    </div>
  );
};

export default App;