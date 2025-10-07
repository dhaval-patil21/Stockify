// "use client"

// import { useEffect, useRef, useState } from "react"

// interface TradingViewWidgetProps {
//   symbol: string
//   widgetType: "symbol-info" | "advanced-chart" | "fundamental-data" | "technical-analysis" | "mini-chart"
//   height?: string
//   width?: string
// }

// export function TradingViewWidget({ symbol, widgetType, height = "400", width = "100%" }: TradingViewWidgetProps) {
//   const containerRef = useRef<HTMLDivElement>(null)
//   const [error, setError] = useState(false)

//   useEffect(() => {
//     if (!containerRef.current) return

//     // Clear previous widget
//     containerRef.current.innerHTML = ""
//     setError(false)

//     const tvSymbol = convertToTradingViewSymbol(symbol)
//     console.log("[v0] Converting symbol:", symbol, "->", tvSymbol)

//     const containerId = `tradingview_${widgetType}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
//     const widgetContainer = document.createElement("div")
//     widgetContainer.id = containerId
//     widgetContainer.className = "tradingview-widget-container__widget"
//     containerRef.current.appendChild(widgetContainer)

//     const script = document.createElement("script")
//     script.type = "text/javascript"
//     script.src = getScriptSrc(widgetType)
//     script.async = true

//     const config = getWidgetConfig(tvSymbol, widgetType, height, width, containerId)
//     console.log("[v0] Widget config for", widgetType, ":", JSON.stringify(config, null, 2))

//     // TradingView widgets expect JSON configuration in script.innerHTML
//     script.innerHTML = JSON.stringify(config)

//     script.onerror = () => {
//       console.error("[v0] Failed to load TradingView widget for symbol:", tvSymbol)
//       setError(true)
//     }

//     containerRef.current.appendChild(script)

//     return () => {
//       if (containerRef.current) {
//         containerRef.current.innerHTML = ""
//       }
//     }
//   }, [symbol, widgetType, height, width])

//   if (error) {
//     return (
//       <div className="flex items-center justify-center p-8 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
//         <div className="text-center">
//           <p className="text-red-800 dark:text-red-200 font-semibold mb-2">Invalid Symbol</p>
//           <p className="text-red-600 dark:text-red-400 text-sm">
//             Unable to load data for {symbol}. Try a different exchange (NSE/BSE) or verify the symbol.
//           </p>
//         </div>
//       </div>
//     )
//   }

//   return <div ref={containerRef} className="tradingview-widget-container" />
// }

// function getScriptSrc(widgetType: string): string {
//   const baseUrl = "https://s3.tradingview.com/external-embedding/"
//   switch (widgetType) {
//     case "symbol-info":
//       return `${baseUrl}embed-widget-symbol-info.js`
//     case "advanced-chart":
//       return `${baseUrl}embed-widget-advanced-chart.js`
//     case "mini-chart":
//       return `${baseUrl}embed-widget-mini-symbol-overview.js`
//     case "fundamental-data":
//       return `${baseUrl}embed-widget-financials.js`
//     case "technical-analysis":
//       return `${baseUrl}embed-widget-technical-analysis.js`
//     default:
//       return `${baseUrl}embed-widget-symbol-info.js`
//   }
// }

// function getWidgetConfig(symbol: string, widgetType: string, height: string, width: string, containerId?: string) {
//   const baseConfig = {
//     symbol: symbol,
//     width: width,
//     height: height,
//     locale: "in",
//     colorTheme: "light",
//     isTransparent: false,
//   }

//   switch (widgetType) {
//     case "symbol-info":
//       return {
//         ...baseConfig,
//         colorTheme: "light",
//         container_id: containerId,
//       }
//     case "mini-chart":
//       return {
//         symbol: symbol,
//         width: width,
//         height: height,
//         locale: "in",
//         dateRange: "12M",
//         colorTheme: "light",
//         isTransparent: false,
//         autosize: false,
//         largeChartUrl: "",
//         container_id: containerId,
//       }
//     case "advanced-chart":
//       return {
//         autosize: false,
//         symbol: symbol,
//         interval: "D",
//         timezone: "Asia/Kolkata",
//         theme: "light",
//         style: "1",
//         locale: "in",
//         toolbar_bg: "#f1f3f6",
//         enable_publishing: false,
//         allow_symbol_change: true,
//         container_id: containerId,
//         width: width,
//         height: height,
//       }
//     case "fundamental-data":
//       return {
//         ...baseConfig,
//         displayMode: "regular",
//         colorTheme: "light",
//         container_id: containerId,
//       }
//     case "technical-analysis":
//       return {
//         ...baseConfig,
//         interval: "1D",
//         colorTheme: "light",
//         container_id: containerId,
//       }
//     default:
//       return {
//         ...baseConfig,
//         container_id: containerId,
//       }
//   }
// }

// const SYMBOL_MAPPING: Record<string, string> = {
//   "TATA STEEL": "TATASTEEL",
//   "TATA MOTORS": "TATAMOTORS",
//   "TATA POWER": "TATAPOWER",
//   "TATA CONSUMER": "TATACONSUM",
//   "BAJAJ AUTO": "BAJAJ-AUTO",
//   "BAJAJ FINANCE": "BAJAJFINSV",
//   "BAJAJ FINSERV": "BAJFINANCE",
//   "MAHINDRA & MAHINDRA": "M&M",
//   "LARSEN & TOUBRO": "LT",
//   "L&T": "LT",
//   "STATE BANK": "SBIN",
//   "HDFC BANK": "HDFCBANK",
//   "ICICI BANK": "ICICIBANK",
//   "AXIS BANK": "AXISBANK",
//   "KOTAK BANK": "KOTAKBANK",
//   "MARUTI SUZUKI": "MARUTI",
//   "ASIAN PAINTS": "ASIANPAINT",
//   "BHARTI AIRTEL": "BHARTIARTL",
//   "RELIANCE INDUSTRIES": "RELIANCE",
//   INFOSYS: "INFY",
//   TCS: "TCS",
//   WIPRO: "WIPRO",
//   "HCL TECH": "HCLTECH",
//   "TECH MAHINDRA": "TECHM",
//   "SUN PHARMA": "SUNPHARMA",
//   "DR REDDY": "DRREDDY",
//   CIPLA: "CIPLA",
//   HINDALCO: "HINDALCO",
//   "COAL INDIA": "COALINDIA",
//   NTPC: "NTPC",
//   "POWER GRID": "POWERGRID",
//   "ADANI PORTS": "ADANIPORTS",
//   "ADANI ENTERPRISES": "ADANIENT",
//   ITC: "ITC",
//   "HINDUSTAN UNILEVER": "HINDUNILVR",
//   NESTLE: "NESTLEIND",
//   BRITANNIA: "BRITANNIA",
// }

// function convertToTradingViewSymbol(symbol: string): string {
//   // If already in TradingView format (NSE:SYMBOL or BSE:SYMBOL), normalize it
//   if (symbol.includes(":")) {
//     const [exchange, sym] = symbol.split(":")
//     const normalizedSym = normalizeSymbol(sym)
//     return `${exchange.toUpperCase()}:${normalizedSym}`
//   }

//   let cleanSymbol = symbol
//   let exchange = "NSE" // Default to NSE

//   // Determine exchange from suffix
//   if (symbol.toUpperCase().endsWith(".BSE") || symbol.toUpperCase().endsWith(".BO")) {
//     exchange = "BSE"
//     cleanSymbol = symbol.replace(/\.(BSE|BO)$/i, "")
//   } else if (symbol.toUpperCase().endsWith(".NSE") || symbol.toUpperCase().endsWith(".NS")) {
//     exchange = "NSE"
//     cleanSymbol = symbol.replace(/\.(NSE|NS)$/i, "")
//   }

//   // Normalize the symbol (remove spaces, apply mapping, etc.)
//   const normalizedSymbol = normalizeSymbol(cleanSymbol)

//   return `${exchange}:${normalizedSymbol}`
// }

// function normalizeSymbol(symbol: string): string {
//   // Remove leading/trailing whitespace
//   let normalized = symbol.trim().toUpperCase()

//   // Check if there's a direct mapping for this symbol
//   if (SYMBOL_MAPPING[normalized]) {
//     return SYMBOL_MAPPING[normalized]
//   }

//   // Remove all spaces (e.g., "TATA STEEL" -> "TATASTEEL")
//   normalized = normalized.replace(/\s+/g, "")

//   // Remove common suffixes that might be in the name
//   normalized = normalized.replace(/\.(BSE|NSE|BO|NS)$/i, "")

//   // Handle special characters - keep only alphanumeric and hyphens
//   normalized = normalized.replace(/[^A-Z0-9&-]/g, "")

//   return normalized
// }

// interface MarketOverviewWidgetProps {
//   height?: string
//   width?: string
// }

// export function MarketOverviewWidget({ height = "600", width = "100%" }: MarketOverviewWidgetProps) {
//   const containerRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     if (!containerRef.current) return

//     containerRef.current.innerHTML = ""

//     const script = document.createElement("script")
//     script.src = "https://s3.tradingview.com/external-embedding/embed-widget-screener.js"
//     script.async = true
//     script.innerHTML = JSON.stringify({
//       width: width,
//       height: height,
//       defaultColumn: "overview",
//       defaultScreen: "top_gainers",
//       market: "india",
//       showToolbar: true,
//       colorTheme: "light",
//       locale: "in",
//       isTransparent: false,
//     })

//     containerRef.current.appendChild(script)

//     return () => {
//       if (containerRef.current) {
//         containerRef.current.innerHTML = ""
//       }
//     }
//   }, [height, width])

//   return <div ref={containerRef} className="tradingview-widget-container" />
// }



















"use client"

import { useEffect, useRef, useState } from "react"

export function TradingViewWidget({ 
  symbol, 
  widgetType, 
  height = "400", 
  width = "100%" 
}) {
  const containerRef = useRef(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    // Clear previous widget
    containerRef.current.innerHTML = ""
    setError(false)

    const tvSymbol = convertToTradingViewSymbol(symbol)
    console.log("[v0] Converting symbol:", symbol, "->", tvSymbol)

    const containerId = `tradingview_${widgetType}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const widgetContainer = document.createElement("div")
    widgetContainer.id = containerId
    widgetContainer.className = "tradingview-widget-container__widget"
    containerRef.current.appendChild(widgetContainer)

    const script = document.createElement("script")
    script.type = "text/javascript"
    script.src = getScriptSrc(widgetType)
    script.async = true

    const config = getWidgetConfig(tvSymbol, widgetType, height, width, containerId)
    console.log("[v0] Widget config for", widgetType, ":", JSON.stringify(config, null, 2))

    // TradingView widgets expect JSON configuration in script.innerHTML
    script.innerHTML = JSON.stringify(config)

    script.onerror = () => {
      console.error("[v0] Failed to load TradingView widget for symbol:", tvSymbol)
      setError(true)
    }

    containerRef.current.appendChild(script)

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ""
      }
    }
  }, [symbol, widgetType, height, width])

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
        <div className="text-center">
          <p className="text-red-800 dark:text-red-200 font-semibold mb-2">Invalid Symbol</p>
          <p className="text-red-600 dark:text-red-400 text-sm">
            Unable to load data for {symbol}. Try a different exchange (NSE/BSE) or verify the symbol.
          </p>
        </div>
      </div>
    )
  }

  return <div ref={containerRef} className="tradingview-widget-container" />
}

function getScriptSrc(widgetType) {
  const baseUrl = "https://s3.tradingview.com/external-embedding/"
  switch (widgetType) {
    case "symbol-info":
      return `${baseUrl}embed-widget-symbol-info.js`
    case "advanced-chart":
      return `${baseUrl}embed-widget-advanced-chart.js`
    case "mini-chart":
      return `${baseUrl}embed-widget-mini-symbol-overview.js`
    case "fundamental-data":
      return `${baseUrl}embed-widget-financials.js`
    case "technical-analysis":
      return `${baseUrl}embed-widget-technical-analysis.js`
    default:
      return `${baseUrl}embed-widget-symbol-info.js`
  }
}

function getWidgetConfig(symbol, widgetType, height, width, containerId) {
  const baseConfig = {
    symbol: symbol,
    width: width,
    height: height,
    locale: "in",
    colorTheme: "light",
    isTransparent: false,
  }

  switch (widgetType) {
    case "symbol-info":
      return {
        ...baseConfig,
        colorTheme: "light",
        container_id: containerId,
      }
    case "mini-chart":
      return {
        symbol: symbol,
        width: width,
        height: height,
        locale: "in",
        dateRange: "12M",
        colorTheme: "light",
        isTransparent: false,
        autosize: false,
        largeChartUrl: "",
        container_id: containerId,
      }
    case "advanced-chart":
      return {
        autosize: false,
        symbol: symbol,
        interval: "D",
        timezone: "Asia/Kolkata",
        theme: "light",
        style: "1",
        locale: "in",
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: containerId,
        width: width,
        height: height,
      }
    case "fundamental-data":
      return {
        ...baseConfig,
        displayMode: "regular",
        colorTheme: "light",
        container_id: containerId,
      }
    case "technical-analysis":
      return {
        ...baseConfig,
        interval: "1D",
        colorTheme: "light",
        container_id: containerId,
      }
    default:
      return {
        ...baseConfig,
        container_id: containerId,
      }
  }
}

const SYMBOL_MAPPING = {
  "TATA STEEL": "TATASTEEL",
  "TATA MOTORS": "TATAMOTORS",
  "TATA POWER": "TATAPOWER",
  "TATA CONSUMER": "TATACONSUM",
  "BAJAJ AUTO": "BAJAJ-AUTO",
  "BAJAJ FINANCE": "BAJAJFINSV",
  "BAJAJ FINSERV": "BAJFINANCE",
  "MAHINDRA & MAHINDRA": "M&M",
  "LARSEN & TOUBRO": "LT",
  "L&T": "LT",
  "STATE BANK": "SBIN",
  "HDFC BANK": "HDFCBANK",
  "ICICI BANK": "ICICIBANK",
  "AXIS BANK": "AXISBANK",
  "KOTAK BANK": "KOTAKBANK",
  "MARUTI SUZUKI": "MARUTI",
  "ASIAN PAINTS": "ASIANPAINT",
  "BHARTI AIRTEL": "BHARTIARTL",
  "RELIANCE INDUSTRIES": "RELIANCE",
  INFOSYS: "INFY",
  TCS: "TCS",
  WIPRO: "WIPRO",
  "HCL TECH": "HCLTECH",
  "TECH MAHINDRA": "TECHM",
  "SUN PHARMA": "SUNPHARMA",
  "DR REDDY": "DRREDDY",
  CIPLA: "CIPLA",
  HINDALCO: "HINDALCO",
  "COAL INDIA": "COALINDIA",
  NTPC: "NTPC",
  "POWER GRID": "POWERGRID",
  "ADANI PORTS": "ADANIPORTS",
  "ADANI ENTERPRISES": "ADANIENT",
  ITC: "ITC",
  "HINDUSTAN UNILEVER": "HINDUNILVR",
  NESTLE: "NESTLEIND",
  BRITANNIA: "BRITANNIA",
}

function convertToTradingViewSymbol(symbol) {
  // If already in TradingView format (NSE:SYMBOL or BSE:SYMBOL), normalize it
  if (symbol.includes(":")) {
    const [exchange, sym] = symbol.split(":")
    const normalizedSym = normalizeSymbol(sym)
    return `${exchange.toUpperCase()}:${normalizedSym}`
  }

  let cleanSymbol = symbol
  let exchange = "NSE" // Default to NSE

  // Determine exchange from suffix
  if (symbol.toUpperCase().endsWith(".BSE") || symbol.toUpperCase().endsWith(".BO")) {
    exchange = "BSE"
    cleanSymbol = symbol.replace(/\.(BSE|BO)$/i, "")
  } else if (symbol.toUpperCase().endsWith(".NSE") || symbol.toUpperCase().endsWith(".NS")) {
    exchange = "NSE"
    cleanSymbol = symbol.replace(/\.(NSE|NS)$/i, "")
  }

  // Normalize the symbol (remove spaces, apply mapping, etc.)
  const normalizedSymbol = normalizeSymbol(cleanSymbol)

  return `${exchange}:${normalizedSymbol}`
}

function normalizeSymbol(symbol) {
  // Remove leading/trailing whitespace
  let normalized = symbol.trim().toUpperCase()

  // Check if there's a direct mapping for this symbol
  if (SYMBOL_MAPPING[normalized]) {
    return SYMBOL_MAPPING[normalized]
  }

  // Remove all spaces (e.g., "TATA STEEL" -> "TATASTEEL")
  normalized = normalized.replace(/\s+/g, "")

  // Remove common suffixes that might be in the name
  normalized = normalized.replace(/\.(BSE|NSE|BO|NS)$/i, "")

  // Handle special characters - keep only alphanumeric and hyphens
  normalized = normalized.replace(/[^A-Z0-9&-]/g, "")

  return normalized
}

export function MarketOverviewWidget({ height = "600", width = "100%" }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    containerRef.current.innerHTML = ""

    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-screener.js"
    script.async = true
    script.innerHTML = JSON.stringify({
      width: width,
      height: height,
      defaultColumn: "overview",
      defaultScreen: "top_gainers",
      market: "india",
      showToolbar: true,
      colorTheme: "light",
      locale: "in",
      isTransparent: false,
    })

    containerRef.current.appendChild(script)

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ""
      }
    }
  }, [height, width])

  return <div ref={containerRef} className="tradingview-widget-container" />
}