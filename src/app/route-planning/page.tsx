"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// Mock cities data
const cities = [
  "New York", "London", "Tokyo", "Paris", "Sydney", "Berlin", "Toronto", "Singapore",
  "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas",
  "Manchester", "Birmingham", "Liverpool", "Leeds", "Sheffield", "Bristol", "Nottingham", "Leicester",
  "Osaka", "Nagoya", "Sapporo", "Fukuoka", "Kobe", "Kyoto", "Yokohama", "Kawasaki",
  "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux"
];

// Mock route data
const mockRoutes = [
  {
    id: 1,
    from: "New York",
    to: "London",
    distance: "3,459 miles",
    duration: "7h 30m",
    price: "$450-800",
    stops: "Direct",
    airline: "Multiple Airlines",
    type: "Flight"
  },
  {
    id: 2,
    from: "New York",
    to: "London",
    distance: "3,459 miles",
    duration: "5-7 days",
    price: "$1,200-2,500",
    stops: "Multiple ports",
    airline: "Cruise Lines",
    type: "Cruise"
  },
  {
    id: 3,
    from: "London",
    to: "Paris",
    distance: "214 miles",
    duration: "2h 20m",
    price: "$50-150",
    stops: "Direct",
    airline: "Eurostar",
    type: "Train"
  },
  {
    id: 4,
    from: "London",
    to: "Paris",
    distance: "214 miles",
    duration: "1h 15m",
    price: "$80-200",
    stops: "Direct",
    airline: "Multiple Airlines",
    type: "Flight"
  }
];

export default function RoutePlanningPage() {
  const searchParams = useSearchParams();
  const initialFrom = searchParams.get('from') || '';
  
  const [fromCity, setFromCity] = useState(initialFrom);
  const [toCity, setToCity] = useState('');
  const [travelMode, setTravelMode] = useState('all');
  const [routes, setRoutes] = useState(mockRoutes);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!fromCity || !toCity) return;
    
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const filteredRoutes = mockRoutes.filter(route => {
        const matchesCities = route.from.toLowerCase().includes(fromCity.toLowerCase()) && 
                             route.to.toLowerCase().includes(toCity.toLowerCase());
        const matchesMode = travelMode === 'all' || route.type.toLowerCase() === travelMode.toLowerCase();
        return matchesCities && matchesMode;
      });
      
      setRoutes(filteredRoutes);
      setIsSearching(false);
    }, 1000);
  };

  const getTransportIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'flight':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        );
      case 'train':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'cruise':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
        );
    }
  };

  const getTransportColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'flight':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400';
      case 'train':
        return 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400';
      case 'cruise':
        return 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Route Planning</h1>
          <p className="text-gray-600 dark:text-gray-300">Plan your journey between cities with multiple transport options</p>
        </div>

        {/* Search Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            {/* From City */}
            <div>
              <label htmlFor="from" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                From
              </label>
              <input
                type="text"
                id="from"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                placeholder="Enter departure city..."
                list="cities-from"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
              <datalist id="cities-from">
                {cities.map(city => (
                  <option key={city} value={city} />
                ))}
              </datalist>
            </div>

            {/* To City */}
            <div>
              <label htmlFor="to" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                To
              </label>
              <input
                type="text"
                id="to"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                placeholder="Enter destination city..."
                list="cities-to"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
              <datalist id="cities-to">
                {cities.map(city => (
                  <option key={city} value={city} />
                ))}
              </datalist>
            </div>

            {/* Travel Mode */}
            <div>
              <label htmlFor="mode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Transport Mode
              </label>
              <select
                id="mode"
                value={travelMode}
                onChange={(e) => setTravelMode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Modes</option>
                <option value="flight">Flight</option>
                <option value="train">Train</option>
                <option value="cruise">Cruise</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                disabled={!fromCity || !toCity || isSearching}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                {isSearching ? 'Searching...' : 'Search Routes'}
              </button>
            </div>
          </div>
        </div>

        {/* Quick City Links */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Popular Routes</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { from: "New York", to: "London" },
              { from: "London", to: "Paris" },
              { from: "Tokyo", to: "Osaka" },
              { from: "Paris", to: "Berlin" },
              { from: "Sydney", to: "Melbourne" },
              { from: "Toronto", to: "Vancouver" }
            ].map((route, index) => (
              <button
                key={index}
                onClick={() => {
                  setFromCity(route.from);
                  setToCity(route.to);
                }}
                className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 text-left"
              >
                <div className="text-sm font-medium text-gray-900 dark:text-white">{route.from}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">to</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">{route.to}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {routes.length > 0 && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Available Routes ({routes.length})
            </h2>
          </div>
        )}

        {/* Routes List */}
        <div className="space-y-4">
          {routes.map(route => (
            <div key={route.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTransportColor(route.type)}`}>
                    {getTransportIcon(route.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {route.from} → {route.to}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{route.airline}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{route.price}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{route.type}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Duration</p>
                  <p className="font-medium text-gray-900 dark:text-white">{route.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Distance</p>
                  <p className="font-medium text-gray-900 dark:text-white">{route.distance}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Stops</p>
                  <p className="font-medium text-gray-900 dark:text-white">{route.stops}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Type</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getTransportColor(route.type)}`}>
                    {route.type}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  Book Now
                </button>
                <button className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  View Details
                </button>
                <Link
                  href={`/city-dashboard?city=${encodeURIComponent(route.to)}`}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors text-center"
                >
                  Explore {route.to}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {routes.length === 0 && fromCity && toCity && !isSearching && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No routes found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Try adjusting your search criteria or check different transport modes.
            </p>
          </div>
        )}

        {/* Loading State */}
        {isSearching && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Searching for routes...</p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/city-search"
              className="bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-4 rounded-lg font-medium transition-colors"
            >
              Search Cities
            </Link>
            <Link
              href="/city-dashboard"
              className="bg-green-600 hover:bg-green-700 text-white text-center py-3 px-4 rounded-lg font-medium transition-colors"
            >
              View Dashboard
            </Link>
            <Link
              href="/"
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white text-center py-3 px-4 rounded-lg font-medium transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
