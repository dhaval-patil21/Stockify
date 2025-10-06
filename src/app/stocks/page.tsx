// "use client"
// import React, { useState, useEffect } from 'react';
// import { TrendingUp, TrendingDown, Star, Search, X, BarChart2, DollarSign, RefreshCw } from 'lucide-react';

// const StockifyDashboard = () => {
//   const [activeTab, setActiveTab] = useState('market');
//   const [watchlist, setWatchlist] = useState([]);
//   const [selectedStock, setSelectedStock] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [stockData, setStockData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState(null);

//   // Top 20 Indian stocks
//   const top20IndianStocks = [
//     { symbol: 'RELIANCE.NS', name: 'Reliance Industries', sector: 'Energy' },
//     { symbol: 'TCS.NS', name: 'Tata Consultancy Services', sector: 'IT' },
//     { symbol: 'HDFCBANK.NS', name: 'HDFC Bank', sector: 'Banking' },
//     { symbol: 'INFY.NS', name: 'Infosys', sector: 'IT' },
//     { symbol: 'ICICIBANK.NS', name: 'ICICI Bank', sector: 'Banking' },
//     { symbol: 'HINDUNILVR.NS', name: 'Hindustan Unilever', sector: 'FMCG' },
//     { symbol: 'ITC.NS', name: 'ITC Limited', sector: 'FMCG' },
//     { symbol: 'SBIN.NS', name: 'State Bank of India', sector: 'Banking' },
//     { symbol: 'BHARTIARTL.NS', name: 'Bharti Airtel', sector: 'Telecom' },
//     { symbol: 'KOTAKBANK.NS', name: 'Kotak Mahindra Bank', sector: 'Banking' },
//     { symbol: 'LT.NS', name: 'Larsen & Toubro', sector: 'Construction' },
//     { symbol: 'AXISBANK.NS', name: 'Axis Bank', sector: 'Banking' },
//     { symbol: 'BAJFINANCE.NS', name: 'Bajaj Finance', sector: 'Finance' },
//     { symbol: 'ASIANPAINT.NS', name: 'Asian Paints', sector: 'Paints' },
//     { symbol: 'MARUTI.NS', name: 'Maruti Suzuki', sector: 'Automobile' },
//     { symbol: 'TITAN.NS', name: 'Titan Company', sector: 'Retail' },
//     { symbol: 'SUNPHARMA.NS', name: 'Sun Pharma', sector: 'Pharma' },
//     { symbol: 'WIPRO.NS', name: 'Wipro', sector: 'IT' },
//     { symbol: 'ULTRACEMCO.NS', name: 'UltraTech Cement', sector: 'Cement' },
//     { symbol: 'NESTLEIND.NS', name: 'Nestle India', sector: 'FMCG' }
//   ];

//   // Fetch stock data from API
//   const fetchStockData = async (refresh = false) => {
//     if (refresh) setRefreshing(true);
//     else setLoading(true);
//     setError(null);

//     try {
//       const symbols = top20IndianStocks.map(s => s.symbol).join(',');
//       const response = await fetch(`/api/stocks?symbols=${symbols}`);
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch stock data');
//       }

//       const data = await response.json();
      
//       // Merge with stock info
//       const enrichedData = data.map(stock => {
//         const info = top20IndianStocks.find(s => s.symbol === stock.symbol);
//         return { ...stock, ...info };
//       });

//       setStockData(enrichedData);
//     } catch (err) {
//       setError(err.message);
//       console.error('Error fetching stock data:', err);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   // Fetch detailed stock info
//   const fetchStockDetails = async (symbol) => {
//     try {
//       const response = await fetch(`/api/stocks/${symbol}`);
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch stock details');
//       }

//       const data = await response.json();
//       const info = top20IndianStocks.find(s => s.symbol === symbol);
      
//       setSelectedStock({ ...data, ...info });
//     } catch (err) {
//       console.error('Error fetching stock details:', err);
//     }
//   };

//   useEffect(() => {
//     fetchStockData();
    
//     // Refresh data every 30 seconds
//     const interval = setInterval(() => {
//       fetchStockData(true);
//     }, 30000);

//     return () => clearInterval(interval);
//   }, []);

//   const addToWatchlist = (stock) => {
//     if (!watchlist.find(s => s.symbol === stock.symbol)) {
//       const newWatchlist = [...watchlist, stock];
//       setWatchlist(newWatchlist);
//     }
//   };

//   const removeFromWatchlist = (symbol) => {
//     setWatchlist(watchlist.filter(s => s.symbol !== symbol));
//   };

//   const isInWatchlist = (symbol) => {
//     return watchlist.some(s => s.symbol === symbol);
//   };

//   const filteredStocks = stockData.filter(stock =>
//     stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const displayedStocks = activeTab === 'market' ? filteredStocks : watchlist;

//   const StockCard = ({ stock }) => (
//     <div 
//       className="bg-white rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer border border-gray-100"
//       onClick={() => fetchStockDetails(stock.symbol)}
//     >
//       <div className="flex justify-between items-start mb-3">
//         <div className="flex-1">
//           <h3 className="font-bold text-gray-800 text-lg">{stock.name}</h3>
//           <p className="text-sm text-gray-500">{stock.symbol}</p>
//           <span className="inline-block mt-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
//             {stock.sector}
//           </span>
//         </div>
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             if (isInWatchlist(stock.symbol)) {
//               removeFromWatchlist(stock.symbol);
//             } else {
//               addToWatchlist(stock);
//             }
//           }}
//           className={`p-2 rounded-full transition-colors ${
//             isInWatchlist(stock.symbol)
//               ? 'bg-yellow-100 text-yellow-600'
//               : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
//           }`}
//         >
//           <Star size={18} fill={isInWatchlist(stock.symbol) ? 'currentColor' : 'none'} />
//         </button>
//       </div>
      
//       <div className="flex items-end justify-between">
//         <div>
//           <p className="text-2xl font-bold text-gray-900">
//             ₹{stock.price ? parseFloat(stock.price).toFixed(2) : 'N/A'}
//           </p>
//           <div className={`flex items-center mt-1 ${
//             parseFloat(stock.change || 0) >= 0 ? 'text-green-600' : 'text-red-600'
//           }`}>
//             {parseFloat(stock.change || 0) >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
//             <span className="ml-1 font-semibold">
//               {stock.change ? parseFloat(stock.change).toFixed(2) : '0.00'} 
//               ({stock.changePercent ? parseFloat(stock.changePercent).toFixed(2) : '0.00'}%)
//             </span>
//           </div>
//         </div>
//         <div className="text-right">
//           <p className="text-xs text-gray-500">Volume</p>
//           <p className="text-sm font-semibold text-gray-700">
//             {stock.volume ? (stock.volume / 1000000).toFixed(2) + 'M' : 'N/A'}
//           </p>
//         </div>
//       </div>
//     </div>
//   );

//   const StockDetailsModal = ({ stock, onClose }) => {
//     if (!stock) return null;

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//         <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//           <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-green-500 text-white p-6 rounded-t-2xl">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h2 className="text-3xl font-bold mb-2">{stock.name}</h2>
//                 <p className="text-blue-100 text-lg">{stock.symbol}</p>
//                 <span className="inline-block mt-2 px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
//                   {stock.sector}
//                 </span>
//               </div>
//               <button
//                 onClick={onClose}
//                 className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition"
//               >
//                 <X size={24} />
//               </button>
//             </div>
            
//             <div className="mt-6 flex items-end justify-between">
//               <div>
//                 <p className="text-5xl font-bold">
//                   ₹{stock.price ? parseFloat(stock.price).toFixed(2) : 'N/A'}
//                 </p>
//                 <div className={`flex items-center mt-2 text-lg ${
//                   parseFloat(stock.change || 0) >= 0 ? 'text-green-200' : 'text-red-200'
//                 }`}>
//                   {parseFloat(stock.change || 0) >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
//                   <span className="ml-2 font-semibold">
//                     ₹{stock.change ? parseFloat(stock.change).toFixed(2) : '0.00'} 
//                     ({stock.changePercent ? parseFloat(stock.changePercent).toFixed(2) : '0.00'}%)
//                   </span>
//                 </div>
//               </div>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   if (isInWatchlist(stock.symbol)) {
//                     removeFromWatchlist(stock.symbol);
//                   } else {
//                     addToWatchlist(stock);
//                   }
//                 }}
//                 className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
//                   isInWatchlist(stock.symbol)
//                     ? 'bg-yellow-400 text-gray-800'
//                     : 'bg-white text-blue-600 hover:bg-gray-100'
//                 }`}
//               >
//                 {isInWatchlist(stock.symbol) ? 'Remove from Watchlist' : 'Add to Watchlist'}
//               </button>
//             </div>
//           </div>

//           <div className="p-6">
//             {/* Market Stats */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//               <div className="bg-gray-50 rounded-lg p-4">
//                 <p className="text-gray-600 text-sm mb-1">Open</p>
//                 <p className="text-xl font-bold text-gray-900">
//                   {stock.open ? parseFloat(stock.open).toFixed(2) : 'N/A'}
//                 </p>
//               </div>
//               <div className="bg-gray-50 rounded-lg p-4">
//                 <p className="text-gray-600 text-sm mb-1">Prev. Close</p>
//                 <p className="text-xl font-bold text-gray-900">
//                   {stock.prevClose ? parseFloat(stock.prevClose).toFixed(2) : 'N/A'}
//                 </p>
//               </div>
//               <div className="bg-gray-50 rounded-lg p-4">
//                 <p className="text-gray-600 text-sm mb-1">Volume</p>
//                 <p className="text-xl font-bold text-gray-900">
//                   {stock.volume ? (stock.volume / 1000000).toFixed(2) + 'M' : 'N/A'}
//                 </p>
//               </div>
//               <div className="bg-gray-50 rounded-lg p-4">
//                 <p className="text-gray-600 text-sm mb-1">Day Range</p>
//                 <p className="text-xl font-bold text-gray-900">
//                   {stock.dayLow && stock.dayHigh 
//                     ? `${parseFloat(stock.dayLow).toFixed(2)} - ${parseFloat(stock.dayHigh).toFixed(2)}`
//                     : 'N/A'}
//                 </p>
//               </div>
//               <div className="bg-gray-50 rounded-lg p-4">
//                 <p className="text-gray-600 text-sm mb-1">52W High</p>
//                 <p className="text-xl font-bold text-green-600">
//                   {stock.fiftyTwoWeekHigh ? parseFloat(stock.fiftyTwoWeekHigh).toFixed(2) : 'N/A'}
//                 </p>
//               </div>
//               <div className="bg-gray-50 rounded-lg p-4">
//                 <p className="text-gray-600 text-sm mb-1">52W Low</p>
//                 <p className="text-xl font-bold text-red-600">
//                   {stock.fiftyTwoWeekLow ? parseFloat(stock.fiftyTwoWeekLow).toFixed(2) : 'N/A'}
//                 </p>
//               </div>
//             </div>

//             {/* Fundamentals */}
//             <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 mb-6">
//               <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
//                 <BarChart2 className="mr-2 text-blue-600" />
//                 Fundamentals
//               </h3>
              
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center border-b border-gray-200 pb-3">
//                     <span className="text-gray-600 font-medium">Market Cap</span>
//                     <span className="text-lg font-bold text-gray-900">
//                       {stock.marketCap 
//                         ? `₹${(stock.marketCap / 10000000).toFixed(2)}Cr` 
//                         : 'N/A'}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center border-b border-gray-200 pb-3">
//                     <span className="text-gray-600 font-medium">P/E Ratio (TTM)</span>
//                     <span className="text-lg font-bold text-gray-900">
//                       {stock.peRatio ? parseFloat(stock.peRatio).toFixed(2) : 'N/A'}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center border-b border-gray-200 pb-3">
//                     <span className="text-gray-600 font-medium">P/B Ratio</span>
//                     <span className="text-lg font-bold text-gray-900">
//                       {stock.pbRatio ? parseFloat(stock.pbRatio).toFixed(2) : 'N/A'}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center border-b border-gray-200 pb-3">
//                     <span className="text-gray-600 font-medium">EPS (TTM)</span>
//                     <span className="text-lg font-bold text-gray-900">
//                       {stock.eps ? parseFloat(stock.eps).toFixed(2) : 'N/A'}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600 font-medium">Debt to Equity</span>
//                     <span className="text-lg font-bold text-gray-900">
//                       {stock.debtToEquity ? parseFloat(stock.debtToEquity).toFixed(2) : 'N/A'}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center border-b border-gray-200 pb-3">
//                     <span className="text-gray-600 font-medium">ROE</span>
//                     <span className="text-lg font-bold text-green-600">
//                       {stock.roe ? `${parseFloat(stock.roe).toFixed(2)}%` : 'N/A'}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center border-b border-gray-200 pb-3">
//                     <span className="text-gray-600 font-medium">Beta</span>
//                     <span className="text-lg font-bold text-gray-900">
//                       {stock.beta ? parseFloat(stock.beta).toFixed(2) : 'N/A'}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center border-b border-gray-200 pb-3">
//                     <span className="text-gray-600 font-medium">Dividend Yield</span>
//                     <span className="text-lg font-bold text-gray-900">
//                       {stock.dividendYield ? `${(parseFloat(stock.dividendYield) * 100).toFixed(2)}%` : 'N/A'}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center border-b border-gray-200 pb-3">
//                     <span className="text-gray-600 font-medium">Book Value</span>
//                     <span className="text-lg font-bold text-gray-900">
//                       {stock.bookValue ? parseFloat(stock.bookValue).toFixed(2) : 'N/A'}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600 font-medium">Profit Margin</span>
//                     <span className="text-lg font-bold text-gray-900">
//                       {stock.profitMargin ? `${(parseFloat(stock.profitMargin) * 100).toFixed(2)}%` : 'N/A'}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Key Metrics Cards */}
//             <div className="grid md:grid-cols-3 gap-4">
//               <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-green-100">Return on Equity</span>
//                   <TrendingUp size={20} />
//                 </div>
//                 <p className="text-3xl font-bold">
//                   {stock.roe ? `${parseFloat(stock.roe).toFixed(2)}%` : 'N/A'}
//                 </p>
//                 <p className="text-green-100 text-sm mt-1">Profitability metric</p>
//               </div>
              
//               <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-blue-100">P/E Ratio</span>
//                   <BarChart2 size={20} />
//                 </div>
//                 <p className="text-3xl font-bold">
//                   {stock.peRatio ? parseFloat(stock.peRatio).toFixed(2) : 'N/A'}
//                 </p>
//                 <p className="text-blue-100 text-sm mt-1">Valuation metric</p>
//               </div>
              
//               <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-purple-100">Market Cap</span>
//                   <DollarSign size={20} />
//                 </div>
//                 <p className="text-3xl font-bold">
//                   {stock.marketCap 
//                     ? `₹${(stock.marketCap / 10000000).toFixed(0)}Cr` 
//                     : 'N/A'}
//                 </p>
//                 <p className="text-purple-100 text-sm mt-1">Company size</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen ">
//       {/* Header */}
//       <header className="">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
         
            
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => fetchStockData(true)}
//                 disabled={refreshing}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
//                 title="Refresh data"
//               >
//                 <RefreshCw size={20} className={`text-gray-600 ${refreshing ? 'animate-spin' : ''}`} />
//               </button>
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                 <input
//                   type="text"
//                   placeholder="Search stocks..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Tabs */}
//           <div className="flex space-x-1 mt-4 bg-gray-100 rounded-lg p-1">
//             <button
//               onClick={() => setActiveTab('market')}
//               className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
//                 activeTab === 'market'
//                   ? 'bg-white text-blue-600 shadow-sm'
//                   : 'text-gray-600 hover:text-gray-800'
//               }`}
//             >
//               <div className="flex items-center justify-center space-x-2">
//                 <TrendingUp size={18} />
//                 <span>Top 20 Stocks</span>
//               </div>
//             </button>
//             <button
//               onClick={() => setActiveTab('watchlist')}
//               className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
//                 activeTab === 'watchlist'
//                   ? 'bg-white text-blue-600 shadow-sm'
//                   : 'text-gray-600 hover:text-gray-800'
//               }`}
//             >
//               <div className="flex items-center justify-center space-x-2">
//                 <Star size={18} />
//                 <span>My Watchlist ({watchlist.length})</span>
//               </div>
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 py-6">
//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
//             <p className="text-red-800">Error: {error}</p>
//             <button 
//               onClick={() => fetchStockData()}
//               className="mt-2 text-red-600 hover:text-red-700 font-medium"
//             >
//               Try again
//             </button>
//           </div>
//         )}

//         {loading ? (
//           <div className="flex flex-col items-center justify-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
//             <p className="text-gray-600">Loading stock data...</p>
//           </div>
//         ) : displayedStocks.length === 0 ? (
//           <div className="text-center py-16">
//             <div className="inline-block p-6 bg-gray-100 rounded-full mb-4">
//               {activeTab === 'watchlist' ? <Star size={48} className="text-gray-400" /> : <Search size={48} className="text-gray-400" />}
//             </div>
//             <h3 className="text-xl font-semibold text-gray-700 mb-2">
//               {activeTab === 'watchlist' ? 'Your watchlist is empty' : 'No stocks found'}
//             </h3>
//             <p className="text-gray-500">
//               {activeTab === 'watchlist' 
//                 ? 'Add stocks to your watchlist by clicking the star icon'
//                 : 'Try adjusting your search query'
//               }
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {displayedStocks.map(stock => (
//               <StockCard key={stock.symbol} stock={stock} />
//             ))}
//           </div>
//         )}
//       </main>

//       {/* Stock Details Modal */}
//       {selectedStock && (
//         <StockDetailsModal stock={selectedStock} onClose={() => setSelectedStock(null)} />
//       )}
//     </div>
//   );
// };

// export default StockifyDashboard;




import React from 'react'
import StockifyDashboard from '@/components/stockify-dashboard'
const page = () => {
  return (
    <>
    <StockifyDashboard/>
    </>
  )
}

export default page