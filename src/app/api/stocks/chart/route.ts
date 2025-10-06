import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const symbol = searchParams.get("symbol")

    if (!symbol) {
      return NextResponse.json({ error: "Symbol is required" }, { status: 400 })
    }

    console.log("[v0] Fetching chart data for symbol:", symbol)

    // Calculate date range (last 5 years)
    const endDate = Math.floor(Date.now() / 1000)
    const startDate = endDate - 5 * 365 * 24 * 60 * 60 // 5 years ago

    // Fetch from Yahoo Finance API
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?period1=${startDate}&period2=${endDate}&interval=1d`

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    })

    if (!response.ok) {
      throw new Error(`Yahoo Finance API error: ${response.status}`)
    }

    const data = await response.json()

    if (!data.chart?.result?.[0]) {
      throw new Error("No data available for this symbol")
    }

    const result = data.chart.result[0]
    const timestamps = result.timestamp
    const quotes = result.indicators.quote[0]

    // Format data
    const prices = timestamps.map((timestamp: number, index: number) => ({
      date: new Date(timestamp * 1000).toISOString().split("T")[0],
      open: quotes.open[index],
      high: quotes.high[index],
      low: quotes.low[index],
      close: quotes.close[index],
      volume: quotes.volume[index],
    }))

    // Filter out null values
    const validPrices = prices.filter((price: any) => price.close !== null && price.close !== undefined)

    console.log("[v0] Fetched", validPrices.length, "data points for", symbol)

    return NextResponse.json({
      symbol,
      prices: validPrices,
    })
  } catch (error) {
    console.error("[v0] Error in chart API:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch chart data" },
      { status: 500 },
    )
  }
}
