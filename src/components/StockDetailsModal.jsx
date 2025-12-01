import { X, Star, IndianRupee, BarChart2, TrendingUp, LineChart } from 'lucide-react';
import { TradingViewWidget } from '../components/TradingViewWidget';
import StockChart from '../components/StockChart';

export const StockDetailsModal = ({ 
  stock, 
  onClose, 
  isInWatchlist, 
  onToggleWatchlist 
}) => {
  const sections = [
    { 
      title: "Live Price & Info", 
      icon: IndianRupee, 
      widgetType: "symbol-info", 
      height: "300" 
    },
    { 
      title: "5 Year Price Chart", 
      icon: LineChart, 
      isCustomChart: true
    },
    { 
      title: "Fundamental Analysis", 
      icon: BarChart2, 
      widgetType: "fundamental-data", 
      height: "600" 
    },
    { 
      title: "Technical Analysis", 
      icon: TrendingUp, 
      widgetType: "technical-analysis", 
      height: "400" 
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-7xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-green-500 text-white p-6 rounded-t-2xl z-10">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold mb-2">{stock.name}</h2>
              <p className="text-blue-100 text-lg">{stock.symbol}</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={onToggleWatchlist}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  isInWatchlist
                    ? 'bg-yellow-400 text-gray-800'
                    : 'bg-white text-blue-600 hover:bg-gray-100'
                }`}
              >
                <Star 
                  size={18} 
                  fill={isInWatchlist ? "currentColor" : "none"} 
                  className="inline mr-1" 
                />
                {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
              </button>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {sections.map(({ title, icon: Icon, widgetType, height, isCustomChart }) => (
            <div key={title} className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-xl font-bold text-black mb-4 flex items-center">
                <Icon className="mr-2 text-blue-600" />
                {title}
              </h3>
              {isCustomChart ? (
                <StockChart symbol={stock.symbol} height="500px" />
              ) : (
                <TradingViewWidget 
                  symbol={stock.symbol} 
                  widgetType={widgetType} 
                  height={height} 
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};