
import { useEffect, useRef, useState } from "react"
import { Loader2 } from "lucide-react"

export default function StockChart({ symbol = "HDFCBANK.NSE", height = "500px" }) {
  const canvasRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [chartData, setChartData] = useState([])
  const [hoveredPoint, setHoveredPoint] = useState(null)

  useEffect(() => {
    fetchStockData(symbol)
  }, [symbol])

  useEffect(() => {
    if (chartData.length > 0 && canvasRef.current) {
      drawChart()
    }
  }, [chartData])

  const fetchStockData = async (stockSymbol) => {
    try {
      setLoading(true)
      setError(null)

      const cleanSymbol = stockSymbol.replace(/\.(NSE|BSE)$/, "")
      const exchange = stockSymbol.includes(".BSE") ? "BO" : "NS"
      const yahooSymbol = `${cleanSymbol}.${exchange}`

      console.log("Fetching chart data for:", yahooSymbol)

      const response = await fetch(`/api/stocks/chart?symbol=${yahooSymbol}`)

      if (!response.ok) {
        throw new Error("Failed to fetch chart data")
      }

      const data = await response.json()

      if (!data.prices || data.prices.length === 0) {
        throw new Error("No chart data available")
      }

      const formattedData = data.prices.map((item) => ({
        date: item.date,
        value: item.close,
        timestamp: new Date(item.date).getTime()
      }))

      console.log("Chart data points:", formattedData.length)
      setChartData(formattedData)
      setLoading(false)
    } catch (err) {
      console.error("Error fetching chart data:", err)
      setError(err instanceof Error ? err.message : "Failed to load chart")
      setLoading(false)
    }
  }

  const drawChart = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const width = rect.width
    const height = rect.height
    const padding = { top: 20, right: 60, bottom: 40, left: 10 }
    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw background
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, width, height)

    if (chartData.length === 0) return

    // Calculate min/max values
    const values = chartData.map(d => d.value)
    const minValue = Math.min(...values)
    const maxValue = Math.max(...values)
    const valueRange = maxValue - minValue

    // Draw grid lines
    ctx.strokeStyle = "#f0f0f0"
    ctx.lineWidth = 1
    const gridLines = 5
    for (let i = 0; i <= gridLines; i++) {
      const y = padding.top + (chartHeight / gridLines) * i
      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(width - padding.right, y)
      ctx.stroke()
    }

    // Draw price labels
    ctx.fillStyle = "#666"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "left"
    for (let i = 0; i <= gridLines; i++) {
      const value = maxValue - (valueRange / gridLines) * i
      const y = padding.top + (chartHeight / gridLines) * i
      ctx.fillText(value.toFixed(2), width - padding.right + 5, y + 4)
    }

    // Create gradient for area fill
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom)
    gradient.addColorStop(0, "rgba(41, 98, 255, 0.2)")
    gradient.addColorStop(1, "rgba(41, 98, 255, 0)")

    // Draw area
    ctx.beginPath()
    chartData.forEach((point, i) => {
      const x = padding.left + (chartWidth / (chartData.length - 1)) * i
      const y = padding.top + chartHeight - ((point.value - minValue) / valueRange) * chartHeight
      
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    
    ctx.lineTo(width - padding.right, height - padding.bottom)
    ctx.lineTo(padding.left, height - padding.bottom)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()

    // Draw line
    ctx.beginPath()
    ctx.strokeStyle = "#2962FF"
    ctx.lineWidth = 2
    chartData.forEach((point, i) => {
      const x = padding.left + (chartWidth / (chartData.length - 1)) * i
      const y = padding.top + chartHeight - ((point.value - minValue) / valueRange) * chartHeight
      
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()

    // Draw date labels
    ctx.fillStyle = "#666"
    ctx.font = "11px sans-serif"
    ctx.textAlign = "center"
    const dateLabels = 6
    for (let i = 0; i < dateLabels; i++) {
      const index = Math.floor((chartData.length - 1) / (dateLabels - 1) * i)
      if (index < chartData.length) {
        const x = padding.left + (chartWidth / (chartData.length - 1)) * index
        const date = new Date(chartData[index].date)
        const label = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
        ctx.fillText(label, x, height - padding.bottom + 20)
      }
    }
  }

  const handleMouseMove = (e) => {
    if (chartData.length === 0) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const padding = { left: 10, right: 60 }
    const chartWidth = rect.width - padding.left - padding.right

    const index = Math.round(((x - padding.left) / chartWidth) * (chartData.length - 1))
    
    if (index >= 0 && index < chartData.length) {
      setHoveredPoint(chartData[index])
    }
  }

  const handleMouseLeave = () => {
    setHoveredPoint(null)
  }

  useEffect(() => {
    const handleResize = () => {
      if (chartData.length > 0) {
        drawChart()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [chartData])

  return (
    <div className="relative w-full" style={{ height }}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-sm text-gray-600">Loading 5 years of chart data...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <div className="text-center p-4">
            <p className="text-sm text-red-600 mb-2">{error}</p>
            <p className="text-xs text-gray-500">Chart data temporarily unavailable</p>
          </div>
        </div>
      )}

      {hoveredPoint && (
        <div className="absolute top-4 left-4 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-20">
          <div className="text-xs text-gray-500 mb-1">
            {new Date(hoveredPoint.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </div>
          <div className="text-lg font-semibold text-gray-900">
            ₹{hoveredPoint.value.toFixed(2)}
          </div>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  )
}