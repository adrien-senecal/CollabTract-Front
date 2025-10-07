"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

// Mock data for city dashboard
const mockCityData = {
  "New York": {
    name: "New York",
    country: "USA",
    population: "8.4M",
    area: "783.8 km²",
    region: "Northeast",
    gdp: "$1.7T",
    timezone: "EST/EDT",
    coordinates: "40.7128° N, 74.0060° W",
    founded: "1624",
    mayor: "Eric Adams",
    metrics: {
      populationGrowth: "+2.1%",
      unemployment: "4.2%",
      crimeRate: "Low",
      costOfLiving: "High",
      tourism: "45M visitors/year"
    },
    attractions: ["Statue of Liberty", "Central Park", "Times Square", "Brooklyn Bridge"],
    economy: ["Finance", "Technology", "Media", "Tourism"],
    demographics: {
      ageGroups: [
        { range: "0-17", percentage: 20 },
        { range: "18-34", percentage: 30 },
        { range: "35-54", percentage: 25 },
        { range: "55+", percentage: 25 }
      ],
      education: "85% high school, 45% college"
    }
  },
  "London": {
    name: "London",
    country: "UK",
    population: "9.5M",
    area: "1,572 km²",
    region: "England",
    gdp: "$650B",
    timezone: "GMT/BST",
    coordinates: "51.5074° N, 0.1278° W",
    founded: "43 AD",
    mayor: "Sadiq Khan",
    metrics: {
      populationGrowth: "+1.8%",
      unemployment: "3.8%",
      crimeRate: "Medium",
      costOfLiving: "High",
      tourism: "30M visitors/year"
    },
    attractions: ["Big Ben", "Tower Bridge", "London Eye", "Buckingham Palace"],
    economy: ["Finance", "Technology", "Creative Industries", "Tourism"],
    demographics: {
      ageGroups: [
        { range: "0-17", percentage: 18 },
        { range: "18-34", percentage: 32 },
        { range: "35-54", percentage: 28 },
        { range: "55+", percentage: 22 }
      ],
      education: "88% high school, 52% college"
    }
  }
};

export default function CityDashboardPage() {
  const searchParams = useSearchParams();
  const cityName = searchParams.get('city') || 'New York';
  const cityData = mockCityData[cityName as keyof typeof mockCityData] || mockCityData['New York'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {cityData.name} Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Comprehensive analytics and insights for {cityData.name}, {cityData.country}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/city-search"
                className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Back to Search
              </Link>
              <Link
                href={`/route-planning?from=${encodeURIComponent(cityData.name)}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Plan Route
              </Link>
            </div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Population</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{cityData.population}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">GDP</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{cityData.gdp}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Growth</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{cityData.metrics.populationGrowth}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Area</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{cityData.area}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* City Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">City Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Country</p>
                  <p className="font-medium text-gray-900 dark:text-white">{cityData.country}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Region</p>
                  <p className="font-medium text-gray-900 dark:text-white">{cityData.region}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Founded</p>
                  <p className="font-medium text-gray-900 dark:text-white">{cityData.founded}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Mayor</p>
                  <p className="font-medium text-gray-900 dark:text-white">{cityData.mayor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Timezone</p>
                  <p className="font-medium text-gray-900 dark:text-white">{cityData.timezone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Coordinates</p>
                  <p className="font-medium text-gray-900 dark:text-white">{cityData.coordinates}</p>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Key Metrics</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Unemployment Rate</p>
                  <p className="font-medium text-gray-900 dark:text-white">{cityData.metrics.unemployment}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Crime Rate</p>
                  <p className="font-medium text-gray-900 dark:text-white">{cityData.metrics.crimeRate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Cost of Living</p>
                  <p className="font-medium text-gray-900 dark:text-white">{cityData.metrics.costOfLiving}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Tourism</p>
                  <p className="font-medium text-gray-900 dark:text-white">{cityData.metrics.tourism}</p>
                </div>
              </div>
            </div>

            {/* Economy & Demographics */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Economy & Demographics</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Major Industries</p>
                  <div className="flex flex-wrap gap-2">
                    {cityData.economy.map((industry, index) => (
                      <span key={index} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Education Level</p>
                  <p className="font-medium text-gray-900 dark:text-white">{cityData.demographics.education}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Attractions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Top Attractions</h2>
              <ul className="space-y-2">
                {cityData.attractions.map((attraction, index) => (
                  <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {attraction}
                  </li>
                ))}
              </ul>
            </div>

            {/* Age Demographics */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Age Demographics</h2>
              <div className="space-y-3">
                {cityData.demographics.ageGroups.map((group, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-300">{group.range} years</span>
                      <span className="font-medium text-gray-900 dark:text-white">{group.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${group.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  href={`/route-planning?from=${encodeURIComponent(cityData.name)}`}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg font-medium transition-colors block"
                >
                  Plan Route From Here
                </Link>
                <Link
                  href="/city-search"
                  className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white text-center py-2 px-4 rounded-lg font-medium transition-colors block"
                >
                  Search Other Cities
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
