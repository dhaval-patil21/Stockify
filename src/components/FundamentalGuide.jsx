"use client"
import React, { useState } from 'react';
import { TrendingUp, DollarSign, BarChart3, PieChart, Activity, Wallet, Calculator, Target, BookOpen, ArrowUpRight, ArrowDownRight, ChevronDown, ChevronUp, Info } from 'lucide-react';

const FundamentalsGuide = () => {
  const [expandedMetric, setExpandedMetric] = useState(null);
  const [activeTab, setActiveTab] = useState('profitability');

  const metrics = {
    profitability: [
      {
        id: 'eps',
        name: 'Earnings Per Share (EPS)',
        icon: DollarSign,
        formula: 'EPS = (Net Income - Preferred Dividends) / Outstanding Shares',
        goodRange: { label: 'Growing YoY', color: 'text-green-600' },
        interpretation: {
          high: 'Strong profitability per share',
          low: 'Limited earnings generation',
          ideal: 'Consistent growth over 5+ years'
        },
        example: {
          company: 'Company A',
          value: '₹45',
          trend: 'up',
          analysis: 'EPS grew from ₹30 to ₹45 in 3 years - Strong growth trajectory'
        }
      },
      {
        id: 'roe',
        name: 'Return on Equity (ROE)',
        icon: TrendingUp,
        formula: 'ROE = Net Income / Shareholder\'s Equity × 100',
        goodRange: { label: '> 15%', color: 'text-green-600' },
        interpretation: {
          high: 'Efficient use of shareholder capital',
          low: 'Poor capital efficiency',
          ideal: '15-25% consistently'
        },
        example: {
          company: 'Company B',
          value: '22%',
          trend: 'up',
          analysis: 'ROE of 22% indicates excellent capital efficiency'
        }
      },
      {
        id: 'gross-margin',
        name: 'Gross Margin',
        icon: Activity,
        formula: 'Gross Margin = (Revenue - COGS) / Revenue × 100',
        goodRange: { label: '> 40%', color: 'text-green-600' },
        interpretation: {
          high: 'Strong pricing power and cost control',
          low: 'Thin margins, competitive pressure',
          ideal: '40%+ for quality businesses'
        },
        example: {
          company: 'Company C',
          value: '55%',
          trend: 'up',
          analysis: 'High gross margin suggests strong competitive advantage'
        }
      },
      {
        id: 'operating-margin',
        name: 'Operating Margin',
        icon: Calculator,
        formula: 'Operating Margin = Operating Income / Revenue × 100',
        goodRange: { label: '> 15%', color: 'text-green-600' },
        interpretation: {
          high: 'Efficient operations',
          low: 'High operating costs',
          ideal: '15-25% range'
        },
        example: {
          company: 'Company D',
          value: '18%',
          trend: 'neutral',
          analysis: 'Stable operating efficiency'
        }
      },
      {
        id: 'net-margin',
        name: 'Net Profit Margin',
        icon: Target,
        formula: 'Net Profit Margin = Net Income / Revenue × 100',
        goodRange: { label: '> 10%', color: 'text-green-600' },
        interpretation: {
          high: 'Strong overall profitability',
          low: 'Profit challenges',
          ideal: '10%+ consistently'
        },
        example: {
          company: 'Company E',
          value: '15%',
          trend: 'up',
          analysis: 'Excellent bottom-line efficiency'
        }
      }
    ],
    valuation: [
      {
        id: 'pe',
        name: 'Price-to-Earnings (P/E)',
        icon: BarChart3,
        formula: 'P/E Ratio = Market Price Per Share / EPS',
        goodRange: { label: '15-25 (Industry Avg)', color: 'text-blue-600' },
        interpretation: {
          high: 'May be overvalued or high growth expected',
          low: 'Potentially undervalued or concerns exist',
          ideal: 'Compare with industry peers'
        },
        example: {
          company: 'Company F',
          value: '18',
          trend: 'neutral',
          analysis: 'Fairly valued compared to industry average of 20'
        }
      },
      {
        id: 'pb',
        name: 'Price-to-Book (P/B)',
        icon: BookOpen,
        formula: 'P/B = Market Price / Book Value Per Share',
        goodRange: { label: '1-3', color: 'text-blue-600' },
        interpretation: {
          high: 'Premium valuation or strong intangibles',
          low: 'Potentially undervalued',
          ideal: 'Below 3 for value stocks'
        },
        example: {
          company: 'Company G',
          value: '2.5',
          trend: 'neutral',
          analysis: 'Reasonable valuation relative to book value'
        }
      },
      {
        id: 'ps',
        name: 'Price-to-Sales (P/S)',
        icon: PieChart,
        formula: 'P/S = Market Cap / Total Revenue',
        goodRange: { label: '< 2', color: 'text-blue-600' },
        interpretation: {
          high: 'Expensive relative to sales',
          low: 'Potential value opportunity',
          ideal: 'Lower P/S with growing revenue'
        },
        example: {
          company: 'Company H',
          value: '1.2',
          trend: 'down',
          analysis: 'Attractive valuation relative to sales'
        }
      },
      {
        id: 'div-yield',
        name: 'Dividend Yield',
        icon: Wallet,
        formula: 'Dividend Yield = Annual Dividends / Price × 100',
        goodRange: { label: '2-6%', color: 'text-blue-600' },
        interpretation: {
          high: 'Good income but check sustainability',
          low: 'Growth-focused company',
          ideal: '3-4% with consistent growth'
        },
        example: {
          company: 'Company I',
          value: '3.5%',
          trend: 'up',
          analysis: 'Steady income with growing dividends'
        }
      }
    ],
    financial_health: [
      {
        id: 'de',
        name: 'Debt-to-Equity (D/E)',
        icon: PieChart,
        formula: 'D/E = Total Debt / Total Equity',
        goodRange: { label: '< 1.0', color: 'text-purple-600' },
        interpretation: {
          high: 'High leverage, potential risk',
          low: 'Conservative capital structure',
          ideal: 'Below 0.5 for stability'
        },
        example: {
          company: 'Company J',
          value: '0.4',
          trend: 'down',
          analysis: 'Low debt indicates financial stability'
        }
      },
      {
        id: 'current',
        name: 'Current Ratio',
        icon: Activity,
        formula: 'Current Ratio = Current Assets / Current Liabilities',
        goodRange: { label: '> 1.5', color: 'text-purple-600' },
        interpretation: {
          high: 'Strong short-term liquidity',
          low: 'Potential liquidity issues',
          ideal: '1.5-3.0 range'
        },
        example: {
          company: 'Company K',
          value: '2.1',
          trend: 'up',
          analysis: 'Healthy ability to meet short-term obligations'
        }
      },
      {
        id: 'fcf',
        name: 'Free Cash Flow',
        icon: DollarSign,
        formula: 'FCF = Operating Cash Flow - CapEx',
        goodRange: { label: 'Positive & Growing', color: 'text-purple-600' },
        interpretation: {
          high: 'Strong cash generation',
          low: 'Limited financial flexibility',
          ideal: 'Consistent positive FCF'
        },
        example: {
          company: 'Company L',
          value: '₹5000 Cr',
          trend: 'up',
          analysis: 'Strong cash generation supports growth and dividends'
        }
      }
    ]
  };

  const tabs = [
    { id: 'profitability', label: 'Profitability', icon: TrendingUp },
    { id: 'valuation', label: 'Valuation', icon: BarChart3 },
    { id: 'financial_health', label: 'Financial Health', icon: Activity }
  ];

  const toggleMetric = (id) => {
    setExpandedMetric(expandedMetric === id ? null : id);
  };

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <ArrowUpRight className="text-green-500" size={20} />;
    if (trend === 'down') return <ArrowDownRight className="text-red-500" size={20} />;
    return <div className="w-5 h-0.5 bg-gray-400"></div>;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 mt-20 bg-gradient-to-br from-slate-50 to-blue-50  min-h-screen">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-3">
          Stock Fundamentals Analysis Guide
        </h1>
        <p className="text-gray-600  text-lg">
          Master the key metrics to identify quality stocks
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 bg-white  rounded-xl p-2 shadow-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[150px] flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-md'
                  : 'bg-gray-100  text-gray-700  '
              }`}
            >
              <Icon size={20} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Quick Tips Banner */}
      <div className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl p-4 mb-6 shadow-lg">
        <div className="flex items-start gap-3">
          <Info className="text-white flex-shrink-0 mt-1" size={24} />
          <div>
            <h3 className="text-white font-bold text-lg mb-1">Pro Tip</h3>
            <p className="text-white text-sm">
              Don't rely on a single metric! Always analyze multiple indicators together and compare with industry peers for the best investment decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="space-y-4">
        {metrics[activeTab].map((metric) => {
          const Icon = metric.icon;
          const isExpanded = expandedMetric === metric.id;

          return (
            <div
              key={metric.id}
              className="bg-white  rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl"
            >
              <button
                onClick={() => toggleMetric(metric.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50  transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-blue-500 to-green-500 p-3 rounded-lg">
                    <Icon className="text-white" size={24} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-gray-800 ">
                      {metric.name}
                    </h3>
                    <p className={`text-sm font-semibold ${metric.goodRange.color}`}>
                      Good Range: {metric.goodRange.label}
                    </p>
                  </div>
                </div>
                {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>

              {isExpanded && (
                <div className="px-6 pb-6 space-y-6 border-t ">
                  {/* Formula */}
                  <div className="bg-blue-50  rounded-lg p-4 mt-4">
                    <h4 className="font-semibold text-blue-900  mb-2">
                      Formula
                    </h4>
                    <code className="text-sm text-blue-800  font-mono">
                      {metric.formula}
                    </code>
                  </div>

                  {/* Interpretation Guide */}
                  <div>
                    <h4 className="font-semibold text-gray-800  mb-3">
                      How to Interpret
                    </h4>
                    <div className="grid md:grid-cols-3 gap-3">
                      <div className="bg-green-50  rounded-lg p-4 border-l-4 border-green-500">
                        <div className="font-semibold text-green-700  mb-1">
                          High Value
                        </div>
                        <p className="text-sm text-green-600 ">
                          {metric.interpretation.high}
                        </p>
                      </div>
                      <div className="bg-red-50  rounded-lg p-4 border-l-4 border-red-500">
                        <div className="font-semibold text-red-700  mb-1">
                          Low Value
                        </div>
                        <p className="text-sm text-red-600 ">
                          {metric.interpretation.low}
                        </p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                        <div className="font-semibold text-blue-700  mb-1">
                          Ideal Range
                        </div>
                        <p className="text-sm text-blue-600 ">
                          {metric.interpretation.ideal}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Example */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-5">
                    <h4 className="font-semibold text-purple-900  mb-3 flex items-center gap-2">
                      <Target size={18} />
                      Real Example
                    </h4>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-gray-600  mb-2">
                          {metric.example.company}
                        </p>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl font-bold text-purple-900 ">
                            {metric.example.value}
                          </span>
                          {getTrendIcon(metric.example.trend)}
                        </div>
                        <p className="text-sm text-gray-700 ">
                          {metric.example.analysis}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Checklist */}
      <div className="mt-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 shadow-xl text-white">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Target size={28} />
          Your Analysis Checklist
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="bg-white text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
              1
            </div>
            <p className="text-sm">Check profitability metrics for consistent growth</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-white text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
              2
            </div>
            <p className="text-sm">Compare valuation with industry peers</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-white text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
              3
            </div>
            <p className="text-sm">Verify financial health through debt and liquidity ratios</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-white text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
              4
            </div>
            <p className="text-sm">Look for 5-year trends, not just current values</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundamentalsGuide;