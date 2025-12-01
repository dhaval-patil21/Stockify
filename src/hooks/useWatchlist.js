import { useState, useEffect } from 'react';

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('watchlist');
    if (saved) setWatchlist(JSON.parse(saved));
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

  const isInWatchlist = (symbol) => 
    watchlist.some((s) => s.symbol === symbol);

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
  };
};