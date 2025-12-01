import { Star } from "lucide-react";
import { TradingViewWidget } from "./TradingViewWidget";


export const WatchlistCard = ({ stock, onRemove, onClick }) => (
  <div
    className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-gray-200"
    onClick={onClick}
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
            onRemove(stock.symbol);
          }}
          className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition"
        >
          <Star size={20} fill="currentColor" />
        </button>
      </div>
    </div>
    <div className="p-4">
      <TradingViewWidget
        symbol={stock.symbol}
        widgetType="symbol-info"
        height="200"
      />
    </div>
  </div>
);
