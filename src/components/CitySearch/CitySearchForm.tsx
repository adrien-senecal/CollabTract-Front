"use client";

import { useState } from 'react';
import { CitySearchService } from '@/services/city-search.service';
import { CitySearchResponse, CityResult } from '@/types/city-search';

interface CitySearchFormProps {
  onResults: (results: CityResult[]) => void;
  onLoading: (loading: boolean) => void;
  onError: (error: string | null) => void;
}

export default function CitySearchForm({ onResults, onLoading, onError }: CitySearchFormProps) {
  const [city, setCity] = useState('');
  const [depCode, setDepCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that at least one field is provided
    if (!city.trim() && !depCode.trim()) {
      onError('Please provide either a city name or department code');
      return;
    }

    setIsLoading(true);
    onLoading(true);
    onError(null);

    try {
      const response = await CitySearchService.searchCity({
        city: city.trim() || undefined,
        postal_code: parseInt(depCode.trim()) || undefined,
      });

      onResults(response.results);
    } catch (error) {
      onError(error instanceof Error ? error.message : 'An error occurred');
      onResults([]);
    } finally {
      setIsLoading(false);
      onLoading(false);
    }
  };

  const handleClear = () => {
    setCity('');
    setDepCode('');
    onResults([]);
    onError(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Search Cities
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          {/* City Input */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              City Name
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              disabled={isLoading}
            />
          </div>

          {/* Department Code Input */}
          <div>
            <label htmlFor="depCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Department Code
            </label>
            <input
              type="text"
              id="depCode"
              value={depCode}
              onChange={(e) => setDepCode(e.target.value)}
              placeholder="Enter department code..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isLoading || (!city.trim() && !depCode.trim())}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={handleClear}
            disabled={isLoading}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear
          </button>
        </div>
      </form>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
        Provide either a city name or department code to search for cities.
      </p>
    </div>
  );
}
