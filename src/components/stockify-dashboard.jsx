"use client"
import { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { TabNavigation } from '../components/TabNavigation';
import { MarketOverviewWidget } from '../components/MarketOverviewWidget';
import { WatchlistCard } from '../components/WatchlistCard';
import { StockDetailsModal } from '../components/StockDetailsModal';
import { InstructionsBanner, EmptyWatchlist } from '../components/UIComponents';
import { useWatchlist } from '../hooks/useWatchlist';
import FundamentalGuide from './FundamentalGuide'

const StockifyDashboard = () => {
  const [activeTab, setActiveTab] = useState('market');
  const [selectedStock, setSelectedStock] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
  } = useWatchlist();

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    let symbol = searchQuery.toUpperCase().trim().replace(/\s+/g, '');

    if (symbol.includes(':')) {
      setSelectedStock({ symbol, name: symbol.split(':')[1] });
      return;
    }

    if (!symbol.match(/\.(BSE|NSE|BO|NS)$/i)) {
      symbol = `${symbol}.NSE`;
    }

    setSelectedStock({
      symbol,
      name: symbol.replace(/\.(BSE|NSE|BO|NS)$/i, ''),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-lg sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <SearchBar 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
              onSearch={handleSearch} 
            />
          </div>
          <TabNavigation 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            watchlistCount={watchlist.length} 
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'market' ? (
          <div className="space-y-6">
            <InstructionsBanner />
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white p-4">
                <h2 className="text-2xl font-bold flex items-center">
                  <TrendingUp className="mr-2" />
                  Top Gainers & Market Screener
                </h2>
                <p className="text-blue-100 text-sm mt-1">
                  Live data from NSE & BSE
                </p>
              </div>
              <div className="p-4">
                <MarketOverviewWidget height="800" />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {watchlist.length === 0 ? (
              <EmptyWatchlist />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {watchlist.map((stock) => (
                  <WatchlistCard
                    key={stock.symbol}
                    stock={stock}
                    onRemove={removeFromWatchlist}
                    onClick={() => setSelectedStock(stock)}
                  />
                ))}
              </div>
              
            )}
            <FundamentalGuide/>
          </div>
        )}
      </main>

      {/* Modal */}
      {selectedStock && (
        <StockDetailsModal
          stock={selectedStock}
          onClose={() => setSelectedStock(null)}
          isInWatchlist={isInWatchlist(selectedStock.symbol)}
          onToggleWatchlist={() => {
            if (isInWatchlist(selectedStock.symbol)) {
              removeFromWatchlist(selectedStock.symbol);
            } else {
              addToWatchlist(selectedStock.symbol, selectedStock.name);
            }
          }}
        />
      )}
    </div>
  );
};

export default StockifyDashboard;