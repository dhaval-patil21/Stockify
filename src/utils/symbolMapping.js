export const SYMBOL_MAPPING = {
  "TATA STEEL": "TATASTEEL",
  "TATA MOTORS": "TATAMOTORS",
  "HDFC BANK": "HDFCBANK",
  // ... more mappings
};

export const normalizeSymbol = (symbol) => {
  let normalized = symbol.trim().toUpperCase();
  if (SYMBOL_MAPPING[normalized]) return SYMBOL_MAPPING[normalized];
  return normalized
    .replace(/\s+/g, "")
    .replace(/\.(BSE|NSE|BO|NS)$/i, "")
    .replace(/[^A-Z0-9&-]/g, "");
};

export const convertToTradingViewSymbol = (symbol) => {
  if (symbol.includes(":")) {
    const [exchange, sym] = symbol.split(":");
    return `${exchange.toUpperCase()}:${normalizeSymbol(sym)}`;
  }

  let cleanSymbol = symbol;
  let exchange = "NSE";

  if (symbol.toUpperCase().match(/\.(BSE|BO)$/)) {
    exchange = "BSE";
    cleanSymbol = symbol.replace(/\.(BSE|BO)$/i, "");
  } else if (symbol.toUpperCase().match(/\.(NSE|NS)$/)) {
    cleanSymbol = symbol.replace(/\.(NSE|NS)$/i, "");
  }

  return `${exchange}:${normalizeSymbol(cleanSymbol)}`;
};