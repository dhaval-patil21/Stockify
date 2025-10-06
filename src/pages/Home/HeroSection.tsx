"use client"
import { ArrowRight, BarChart3, Activity, Eye } from "lucide-react";
import { useState } from "react";

const HeroSection = () => {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-emerald-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Smart Stock Analysis
              <span className="block text-emerald-600">Made Simple</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Discover, analyze, and track stocks with our comprehensive
              platform. Get real-time data, fundamental analysis, and build your
              perfect watchlist.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setCurrentPage("stocks")}
                className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <span>Start Analyzing</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-xl font-semibold hover:bg-emerald-600 hover:text-white transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need for successful stock investing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-emerald-100">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Real-Time Analytics
              </h3>
              <p className="text-slate-600">
                Get live market data, advanced charts, and technical indicators
                to make informed decisions.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-blue-100">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Fundamental Analysis
              </h3>
              <p className="text-slate-600">
                Deep dive into company financials, ratios, and performance
                metrics for comprehensive analysis.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-purple-100">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Smart Watchlists
              </h3>
              <p className="text-slate-600">
                Create custom watchlists, set alerts, and never miss important
                market movements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-emerald-400 mb-2">
                50K+
              </div>
              <div className="text-slate-300">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-400 mb-2">
                10K+
              </div>
              <div className="text-slate-300">Stocks Analyzed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-400 mb-2">
                99.9%
              </div>
              <div className="text-slate-300">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-400 mb-2">
                24/7
              </div>
              <div className="text-slate-300">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join thousands of investors who trust Stockify for their market
            analysis needs.
          </p>
          <button
            onClick={() => setCurrentPage("stocks")}
            className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started Free
          </button>
        </div>
      </section>
    </div>
  );
};

export default HeroSection