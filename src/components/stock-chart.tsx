"use client"

import { useEffect, useRef, useState } from "react"
// import { createChart, ColorType, type IChartApi, type ISeriesApi } from "lightweight-charts"
import { createChart, ColorType } from "lightweight-charts"
import type { IChartApi, ISeriesApi } from "lightweight-charts"
import { Loader2 } from "lucide-react"

interface StockChartProps {
  symbol: string
  height?: string
}

interface ChartData {
  time: string
  value: number
}

export function StockChart({ symbol, height = "500px" }: StockChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const seriesRef = useRef<ISeriesApi<"Area"> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!chartContainerRef.current) return

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "white" },
        textColor: "#333",
      },
      width: chartContainerRef.current.clientWidth,
      height: Number.parseInt(height),
      grid: {
        vertLines: { color: "#f0f0f0" },
        horzLines: { color: "#f0f0f0" },
      },
      rightPriceScale: {
        borderColor: "#e0e0e0",
      },
      timeScale: {
        borderColor: "#e0e0e0",
        timeVisible: true,
        rightOffset: 5,
        barSpacing: 6,
      },
    })

    chartRef.current = chart

    // Create area series
    const areaSeries = chart.addAreaSeries({
      lineColor: "#2962FF",
      topColor: "#2962FF33",
      bottomColor: "#2962FF00",
      lineWidth: 2,
    })

    seriesRef.current = areaSeries

    // Fetch data
    fetchStockData(symbol)

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        })
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      chart.remove()
    }
  }, [symbol, height])

  const fetchStockData = async (stockSymbol: string) => {
    try {
      setLoading(true)
      setError(null)

      // Convert symbol format (e.g., "HDFCBANK.NSE" -> "HDFCBANK")
      const cleanSymbol = stockSymbol.replace(/\.(NSE|BSE)$/, "")
      const exchange = stockSymbol.includes(".BSE") ? "BO" : "NS"
      const yahooSymbol = `${cleanSymbol}.${exchange}`

      console.log("[v0] Fetching chart data for:", yahooSymbol)

      // Fetch data from Yahoo Finance API
      const response = await fetch(`/api/stocks/chart?symbol=${yahooSymbol}`)

      if (!response.ok) {
        throw new Error("Failed to fetch chart data")
      }

      const data = await response.json()

      if (!data.prices || data.prices.length === 0) {
        throw new Error("No chart data available")
      }

      // Format data for lightweight-charts
      const chartData: ChartData[] = data.prices.map((item: any) => ({
        time: item.date,
        value: item.close,
      }))

      console.log("[v0] Chart data points:", chartData.length)

      if (seriesRef.current) {
        seriesRef.current.setData(chartData)
        chartRef.current?.timeScale().fitContent()
      }

      setLoading(false)
    } catch (err) {
      console.error("[v0] Error fetching chart data:", err)
      setError(err instanceof Error ? err.message : "Failed to load chart")
      setLoading(false)
    }
  }

  return (
    <div className="relative w-full" style={{ height }}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading 5 years of chart data...</p>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-background">
          <div className="text-center p-4">
            <p className="text-sm text-destructive mb-2">{error}</p>
            <p className="text-xs text-muted-foreground">Chart data temporarily unavailable</p>
          </div>
        </div>
      )}
      <div ref={chartContainerRef} className="w-full h-full" />
    </div>
  )
}
