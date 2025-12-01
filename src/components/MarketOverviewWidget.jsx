import { useEffect, useRef } from 'react';

export const MarketOverviewWidget = ({ height = "600" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: "100%",
      height,
      defaultColumn: "overview",
      defaultScreen: "top_gainers",
      market: "india",
      showToolbar: true,
      colorTheme: "light",
      locale: "in",
      isTransparent: false,
    });

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, [height]);

  return <div ref={containerRef} className="tradingview-widget-container" />;
};