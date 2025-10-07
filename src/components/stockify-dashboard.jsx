// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { TrendingUp, Star, Search, X, BarChart2, LineChart, IndianRupee } from "lucide-react"
// import { TradingViewWidget, MarketOverviewWidget } from "../components/tradingview-widget"
// import { StockChart } from "../components/stock-chart"

// interface WatchlistStock {
//   symbol: string
//   name: string
// }

// const StockifyDashboard = () => {
//   const [activeTab, setActiveTab] = useState("market")
//   const [watchlist, setWatchlist] = useState<WatchlistStock[]>([])
//   const [selectedStock, setSelectedStock] = useState<{ symbol: string; name: string } | null>(null)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [searchSymbol, setSearchSymbol] = useState("")

//   // Load watchlist from localStorage
//   useEffect(() => {
//     const saved = localStorage.getItem("watchlist")
//     if (saved) {
//       setWatchlist(JSON.parse(saved))
//     }
//   }, [])

//   const addToWatchlist = (symbol: string, name: string) => {
//     if (!watchlist.find((s) => s.symbol === symbol)) {
//       const newWatchlist = [...watchlist, { symbol, name }]
//       setWatchlist(newWatchlist)
//       localStorage.setItem("watchlist", JSON.stringify(newWatchlist))
//     }
//   }

//   const removeFromWatchlist = (symbol: string) => {
//     const newWatchlist = watchlist.filter((s) => s.symbol !== symbol)
//     setWatchlist(newWatchlist)
//     localStorage.setItem("watchlist", JSON.stringify(newWatchlist))
//   }

//   const isInWatchlist = (symbol: string) => {
//     return watchlist.some((s) => s.symbol === symbol)
//   }

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (searchQuery.trim()) {
//       let symbol = searchQuery.toUpperCase().trim()

//       symbol = symbol.replace(/\s+/g, "")

//       // If user already specified exchange format (NSE: or BSE:), keep it
//       if (symbol.includes(":")) {
//         setSearchSymbol(symbol)
//         setSelectedStock({ symbol, name: symbol.split(":")[1] })
//         return
//       }

//       // If user didn't add exchange suffix, try NSE first
//       if (!symbol.includes(".BSE") && !symbol.includes(".NSE") && !symbol.includes(".BO") && !symbol.includes(".NS")) {
//         symbol = `${symbol}.NSE`
//       }

//       setSearchSymbol(symbol)
//       setSelectedStock({ symbol, name: symbol.replace(/\.(BSE|NSE|BO|NS)$/i, "") })
//     }
//   }

//   const StockDetailsModal = ({ stock, onClose }: { stock: { symbol: string; name: string }; onClose: () => void }) => {
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
//         <div className="bg-card rounded-2xl max-w-7xl w-full max-h-[95vh] overflow-y-auto">
//           <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-green-500 text-white p-6 rounded-t-2xl z-10">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h2 className="text-3xl font-bold mb-2">{stock.name}</h2>
//                 <p className="text-blue-100 text-lg">{stock.symbol}</p>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation()
//                     if (isInWatchlist(stock.symbol)) {
//                       removeFromWatchlist(stock.symbol)
//                     } else {
//                       addToWatchlist(stock.symbol, stock.name)
//                     }
//                   }}
//                   className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
//                     isInWatchlist(stock.symbol)
//                       ? "bg-yellow-400 text-gray-800"
//                       : "bg-white text-blue-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   {isInWatchlist(stock.symbol) ? (
//                     <>
//                       <Star size={18} fill="currentColor" className="inline mr-1" />
//                       In Watchlist
//                     </>
//                   ) : (
//                     <>
//                       <Star size={18} className="inline mr-1" />
//                       Add to Watchlist
//                     </>
//                   )}
//                 </button>
//                 <button onClick={onClose} className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition">
//                   <X size={24} />
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="p-6 space-y-6">
//             {/* Symbol Info Widget */}
//             <div className="bg-muted rounded-xl p-4">
//               <h3 className="text-xl font-bold text-foreground mb-4 text-white flex items-center">
//                 <IndianRupee className="mr-2 text-blue-600" />
//                 Live Price & Info
//               </h3>
//               <TradingViewWidget symbol={stock.symbol} widgetType="symbol-info" height="300" />
//             </div>

//             {/* Advanced Chart */}
//             <div className="bg-muted rounded-xl p-4">
//               <h3 className="text-xl font-bold text-foreground text-white mb-4 flex items-center">
//                 <LineChart className="mr-2 text-green-600" />
//                 Price Chart (5 Years)
//               </h3>
//               <StockChart symbol={stock.symbol} height="600px" width="1000px" />
//             </div>

//             {/* Fundamental Data */}
//             <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 rounded-xl p-4">
//               <h3 className="text-xl font-bold text-foreground text-black mb-4 flex items-center">
//                 <BarChart2 className="mr-2 text-purple-600" />
//                 Fundamental Analysis
//               </h3>
//               <TradingViewWidget symbol={stock.symbol} widgetType="fundamental-data" height="600" />
//             </div>

//             {/* Technical Analysis */}
//             <div className="bg-muted rounded-xl p-4">
//               <h3 className="text-xl font-bold text-foreground text-white mb-4 flex items-center">
//                 <TrendingUp className="mr-2 text-orange-600" />
//                 Technical Analysis
//               </h3>
//               <TradingViewWidget symbol={stock.symbol} widgetType="technical-analysis" height="400" />
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-background">
//      <header className="border-b border-border bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg sticky top-0 z-40 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-6">
//           {/* Brand and Search Row */}
//           <div className="flex items-center justify-between mb-6">
//             <form onSubmit={handleSearch} className="flex items-center space-x-2">
//               <div className="relative">
//                 <Search
//                   className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
//                   size={20}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Search stocks (RELIANCE, SBIN, TCS...)"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-10 pr-4 py-3 w-80 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-foreground transition-all shadow-sm"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="px-6 py-3 bg-gradient-to-r cursor-pointer bg-blue-600  text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg transform hover:scale-105"
//               >
//                 Search
//               </button>
//             </form>
//           </div>

//           {/* Navigation Tabs */}
//           <div className="flex space-x-2 bg-gray-100 dark:bg-slate-800 rounded-xl p-1.5 shadow-inner">
//             <button
//               onClick={() => setActiveTab("market")}
//               className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
//                 activeTab === "market"
//                   ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-md transform scale-100"
//                   : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
//               }`}
//             >
//               <div className="flex items-center justify-center space-x-2">
//                 <TrendingUp size={20} />
//                 <span>Market Overview</span>
//               </div>
//             </button>
//             <button
//               onClick={() => setActiveTab("watchlist")}
//               className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
//                 activeTab === "watchlist"
//                   ? "bg-white dark:bg-slate-700 text-green-600 dark:text-green-400 shadow-md transform scale-105"
//                   : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
//               }`}
//             >
//               <div className="flex items-center justify-center space-x-2">
//                 <Star size={20} />
//                 <span>My Watchlist</span>
//                 {watchlist.length > 0 && (
//                   <span className="ml-1 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
//                     {watchlist.length}
//                   </span>
//                 )}
//               </div>
//             </button>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 py-6">
//         {activeTab === "market" ? (
//           <div className="space-y-6">
//             <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
//               <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">How to use:</h3>
//               <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1 list-disc list-inside">
//                 <li>View top gainers and market overview below</li>
//                 <li>Search for any Indian stock: RELIANCE, SBIN, TATASTEEL, HDFCBANK, or INFY</li>
//                 <li>Add exchange suffix if needed: TATASTEEL.BSE or SBIN.NSE</li>
//                 {/* <li>Click on any stock in the screener to view detailed analysis</li> */}
//                 <li>Add stocks to your watchlist for quick access</li>
//                 <li>If a symbol shows as invalid, try the other exchange (NSE/BSE)</li>
//               </ul>
//             </div>

//             <div className="bg-card rounded-xl shadow-lg overflow-hidden">
//               <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white p-4">
//                 <h2 className="text-2xl font-bold flex items-center">
//                   <TrendingUp className="mr-2" />
//                   Top Gainers & Market Screener
//                 </h2>
//                 <p className="text-blue-100 text-sm mt-1">Live data from NSE & BSE - Updates automatically</p>
//               </div>
//               <div className="p-4">
//                 <MarketOverviewWidget height="800" />
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {watchlist.length === 0 ? (
//               <div className="text-center py-16">
//                 <div className="inline-block p-6 bg-muted rounded-full mb-4">
//                   <Star size={48} className="text-muted-foreground" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-foreground mb-2">Your watchlist is empty</h3>
//                 <p className="text-muted-foreground">
//                   Search for stocks and add them to your watchlist for quick access
//                 </p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {watchlist.map((stock) => (
//                   <div
//                     key={stock.symbol}
//                     className="bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer border border-border"
//                     onClick={() => setSelectedStock(stock)}
//                   >
//                     <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-4">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <h3 className="text-xl font-bold">{stock.name}</h3>
//                           <p className="text-blue-100 text-sm">{stock.symbol}</p>
//                         </div>
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation()
//                             removeFromWatchlist(stock.symbol)
//                           }}
//                           className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition"
//                         >
//                           <Star size={20} fill="currentColor" />
//                         </button>
//                       </div>
//                     </div>
//                     <div className="p-4">
//                       <TradingViewWidget symbol={stock.symbol} widgetType="symbol-info" height="200" />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}
//       </main>

//       {selectedStock && <StockDetailsModal stock={selectedStock} onClose={() => setSelectedStock(null)} />}
//     </div>
//   )
// }

// export default StockifyDashboard











































'use client';

import { useState, useEffect } from 'react';
import {
  TrendingUp,
  Star,
  Search,
  X,
  BarChart2,
  LineChart,
  IndianRupee,
} from 'lucide-react';

import { TradingViewWidget } from './tradingview-widget';
import { MarketOverviewWidget} from './tradingview-widget';
import { StockChart} from './stock-chart';
import FundamentalGuide from "../components/FundamentalGuide"

const StockifyDashboard = () => {
  const [activeTab, setActiveTab] = useState('market');
  const [watchlist, setWatchlist] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSymbol, setSearchSymbol] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('watchlist');
    if (saved) {
      setWatchlist(JSON.parse(saved));
    }
  }, []);

  const addToWatchlist = (symbol, name) => {
    if (!watchlist.find((s) => s.symbol === symbol)) {
      const newWatchlist = [...watchlist, { symbol, name }];
      setWatchlist(newWatchlist);
      localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
    }
  };

  const removeFromWatchlist = (symbol) => {
    const newWatchlist = watchlist.filter((s) => s.symbol !== symbol);
    setWatchlist(newWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
  };

  const isInWatchlist = (symbol) => {
    return watchlist.some((s) => s.symbol === symbol);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      let symbol = searchQuery.toUpperCase().trim();
      symbol = symbol.replace(/\s+/g, '');

      if (symbol.includes(':')) {
        setSearchSymbol(symbol);
        setSelectedStock({ symbol, name: symbol.split(':')[1] });
        return;
      }

      if (
        !symbol.includes('.BSE') &&
        !symbol.includes('.NSE') &&
        !symbol.includes('.BO') &&
        !symbol.includes('.NS')
      ) {
        symbol = `${symbol}.NSE`;
      }

      setSearchSymbol(symbol);
      setSelectedStock({
        symbol,
        name: symbol.replace(/\.(BSE|NSE|BO|NS)$/i, ''),
      });
    }
  };

  const StockDetailsModal = ({ stock, onClose }) => (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-card rounded-2xl max-w-7xl w-full max-h-[95vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-green-500 text-white p-6 rounded-t-2xl z-10">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold mb-2">{stock.name}</h2>
              <p className="text-blue-100 text-lg">{stock.symbol}</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (isInWatchlist(stock.symbol)) {
                    removeFromWatchlist(stock.symbol);
                  } else {
                    addToWatchlist(stock.symbol, stock.name);
                  }
                }}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  isInWatchlist(stock.symbol)
                    ? 'bg-yellow-400 text-gray-800'
                    : 'bg-white text-blue-600 hover:bg-gray-100'
                }`}
              >
                {isInWatchlist(stock.symbol) ? (
                  <>
                    <Star size={18} fill="currentColor" className="inline mr-1" />
                    In Watchlist
                  </>
                ) : (
                  <>
                    <Star size={18} className="inline mr-1" />
                    Add to Watchlist
                  </>
                )}
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

        <div className="p-6 space-y-6">
          <div className="bg-muted rounded-xl p-4">
            <h3 className="text-xl font-bold text-black mb-4 flex items-center">
              <IndianRupee className="mr-2 text-blue-600" />
              Live Price & Info
            </h3>
            <TradingViewWidget symbol={stock.symbol} widgetType="symbol-info" height="300" />
          </div>

          <div className="bg-muted rounded-xl p-4">
            <h3 className="text-xl font-bold text-black mb-4 flex items-center">
              <LineChart className="mr-2 text-green-600" />
              Price Chart (5 Years)
            </h3>
            <StockChart symbol={stock.symbol} height="600px" width="1000px" />
          </div>

          <div className="bg-muted from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 rounded-xl p-4">
            <h3 className="text-xl font-bold text-black mb-4 flex items-center">
              <BarChart2 className="mr-2 text-purple-600" />
              Fundamental Analysis
            </h3>
            <TradingViewWidget symbol={stock.symbol} widgetType="fundamental-data" height="600" />
          </div>

          <div className="bg-muted rounded-xl p-4">
            <h3 className="text-xl font-bold text-black mb-4 flex items-center">
              <TrendingUp className="mr-2 text-orange-600" />
              Technical Analysis
            </h3>
            <TradingViewWidget symbol={stock.symbol} widgetType="technical-analysis" height="400" />
          </div>
        </div>
      </div>
    </div>
  );

  

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <form onSubmit={handleSearch} className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type="text"
                  placeholder="Search stocks (RELIANCE, SBIN, TCS...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-80 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-foreground shadow-sm"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-xl font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Search
              </button>
            </form>
          </div>

          <div className="flex space-x-2 bg-gray-100 dark:bg-slate-800 rounded-xl p-1.5 shadow-inner">
            <button
              onClick={() => setActiveTab('market')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold ${
                activeTab === 'market'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <TrendingUp size={20} />
                <span>Market Overview</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('watchlist')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold ${
                activeTab === 'watchlist'
                  ? 'bg-white dark:bg-slate-700 text-green-600 dark:text-green-400 shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Star size={20} />
                <span>My Watchlist</span>
                {watchlist.length > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
                    {watchlist.length}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'market' ? (
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">How to use:</h3>
              <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1 list-disc list-inside">
                <li>View top gainers and market overview below</li>
                <li>Search for any Indian stock: RELIANCE, SBIN, TATASTEEL, etc.</li>
                <li>Use exchange suffix if needed: `.BSE`, `.NSE`, etc.</li>
                <li>Add stocks to your watchlist for quick access</li>
                <li>If a symbol shows as invalid, try another exchange</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white p-4">
                <h2 className="text-2xl font-bold flex items-center">
                  <TrendingUp className="mr-2" />
                  Top Gainers & Market Screener
                </h2>
                <p className="text-blue-100 text-sm mt-1">
                  Live data from NSE & BSE - Updates automatically
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
              <div className="text-center py-16">
                <div className="inline-block p-6 bg-muted rounded-full mb-4">
                  <Star size={48} className="text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Your watchlist is empty
                </h3>
                <p className="text-muted-foreground">
                  Search for stocks and add them to your watchlist
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {watchlist.map((stock) => (
                  <div
                    key={stock.symbol}
                    className="bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-border"
                    onClick={() => setSelectedStock(stock)}
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold">{stock.name}</h3>
                          <p className="text-blue-100 text-sm">{stock.symbol}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromWatchlist(stock.symbol);
                          }}
                          className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition"
                        >
                          <Star size={20} fill="currentColor" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <TradingViewWidget symbol={stock.symbol} widgetType="symbol-info" height="200" />
                    </div>
                  </div>
                ))}
              </div>
            )}
            <FundamentalGuide/>
          </div>
        )} 
      </main>
     

      {selectedStock && (
        <StockDetailsModal stock={selectedStock} onClose={() => setSelectedStock(null)} />
      )}
    </div>
  );
};

export default StockifyDashboard;
