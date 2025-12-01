import { TrendingUp, Star } from 'lucide-react';

export const TabNavigation = ({ activeTab, setActiveTab, watchlistCount }) => {
  const tabs = [
    { id: 'market', label: 'Market Overview', icon: TrendingUp },
    { id: 'watchlist', label: 'My Watchlist', icon: Star },
  ];

  return (
    <div className="flex space-x-2 bg-gray-100 rounded-xl p-1.5 shadow-inner">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
            activeTab === id
              ? 'bg-white text-blue-600 shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Icon size={20} />
            <span>{label}</span>
            {id === 'watchlist' && watchlistCount > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
                {watchlistCount}
              </span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};