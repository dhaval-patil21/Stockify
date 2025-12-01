import { Search } from 'lucide-react';

export const SearchBar = ({ searchQuery, setSearchQuery, onSearch }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') onSearch();
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" 
          size={20} 
        />
        <input
          type="text"
          placeholder="Search stocks (RELIANCE, SBIN, TCS...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pl-10 pr-4 py-2 w-80 border-2 border-gray-200 text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
        />
      </div>
      <button
        onClick={onSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded-xl font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all"
      >
        Search
      </button>
    </div>
  );
};