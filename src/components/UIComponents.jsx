import { Star } from 'lucide-react';

export const InstructionsBanner = () => (
  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
    <h3 className="font-semibold text-blue-900 mb-2">How to use:</h3>
    <ul className="text-blue-800 text-sm space-y-1 list-disc list-inside">
      <li>View top gainers and market overview below</li>
      <li>Search for any Indian stock: RELIANCE, SBIN, TATASTEEL, etc.</li>
      <li>Add stocks to your watchlist for quick access</li>
      <li>Click on stocks to view detailed analysis</li>
    </ul>
  </div>
);

export const EmptyWatchlist = () => (
  <div className="text-center py-16">
    <div className="inline-block p-6 bg-gray-100 rounded-full mb-4">
      <Star size={48} className="text-gray-400" />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">
      Your watchlist is empty
    </h3>
    <p className="text-gray-600">
      Search for stocks and add them to your watchlist
    </p>
  </div>
);