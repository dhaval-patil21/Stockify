
import { useEffect, useRef, useState } from 'react';
import { convertToTradingViewSymbol } from '../utils/symbolMapping';

export const TradingViewWidget = ({ symbol, widgetType, height = "400", width = "100%" }) => {
  const containerRef = useRef(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = "";
    setError(false);

    const tvSymbol = convertToTradingViewSymbol(symbol);
    const containerId = `tv_${widgetType}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const widgetContainer = document.createElement("div");
    widgetContainer.id = containerId;
    containerRef.current.appendChild(widgetContainer);

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = getScriptSrc(widgetType);
    script.async = true;
    script.innerHTML = JSON.stringify(
      getWidgetConfig(tvSymbol, widgetType, height, width, containerId)
    );
    script.onerror = () => setError(true);

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, [symbol, widgetType, height, width]);

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 bg-red-50 rounded-lg border border-red-200">
        <div className="text-center">
          <p className="text-red-800 font-semibold mb-2">Invalid Symbol</p>
          <p className="text-red-600 text-sm">Unable to load data for {symbol}</p>
        </div>
      </div>
    );
  }

  return <div ref={containerRef} className="tradingview-widget-container" />;
};

const getScriptSrc = (widgetType) => {
  const baseUrl = "https://s3.tradingview.com/external-embedding/";
  const widgets = {
    "symbol-info": "embed-widget-symbol-info.js",
    "fundamental-data": "embed-widget-financials.js",
    "technical-analysis": "embed-widget-technical-analysis.js",
  };
  return `${baseUrl}${widgets[widgetType] || widgets["symbol-info"]}`;
};

const getWidgetConfig = (symbol, widgetType, height, width, containerId) => {
  const baseConfig = {
    symbol,
    width,
    height,
    locale: "in",
    colorTheme: "light",
    isTransparent: false,
    container_id: containerId,
  };

  const configs = {
    "fundamental-data": { ...baseConfig, displayMode: "regular" },
    "technical-analysis": { ...baseConfig, interval: "1D" },
  };

  return configs[widgetType] || baseConfig;
};