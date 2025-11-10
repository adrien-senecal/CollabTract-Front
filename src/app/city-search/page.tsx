"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CitySearchForm, CitySearchResults } from "@/components/CitySearch";
import { getCityDepartmentCode, getCityName } from "@/lib/city-search";
import { CityResult } from "@/types/city-search";

export default function CitySearchPage() {
  const router = useRouter();
  const [results, setResults] = useState<CityResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<CityResult | null>(null);

  const handleResults = (newResults: CityResult[]) => {
    setResults(newResults);
    setSelectedCity(null);
  };

  const handleLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const handleError = (errorMessage: string | null) => {
    setError(errorMessage);
  };

  const handleCitySelect = (city: CityResult) => {
    setSelectedCity(city);
    console.log("Selected city:", city);

    const params = new URLSearchParams();
    const cityName = getCityName(city);
    const departmentCode = getCityDepartmentCode(city);

    if (cityName) {
      params.set("city_name", cityName);
    }

    if (departmentCode) {
      params.set("department_code", departmentCode);
    }

    router.push(`/route-planning?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Recherche de ville</h1>
          <p className="text-gray-600 dark:text-gray-300">Recherchez les villes françaises par nom ou code postal</p>
        </div>

        {/* Search Form */}
        <div className="mb-8">
          <CitySearchForm
            onResults={handleResults}
            onLoading={handleLoading}
            onError={handleError}
          />
        </div>

        {/* Selected City Display */}
        {selectedCity && (
          <div className="mb-8 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-green-900 dark:text-green-100">Ville sélectionnée</h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  {getCityName(selectedCity) || "Nom indisponible"}
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  {getCityDepartmentCode(selectedCity)
                    ? `Département : ${getCityDepartmentCode(selectedCity)}`
                    : "Département indisponible"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        <CitySearchResults
          results={results}
          isLoading={isLoading}
          error={error}
          onCitySelect={handleCitySelect}
        />
      </div>
    </div>
  );
}
