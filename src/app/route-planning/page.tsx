"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CityResult } from "@/types/city-search";

interface RoutePlanningFormData {
  city_name: string;
  department_code: string;
  cluster_count: number;
  clustering_method: string;
  cluster_colors: Record<string, string> | null;
  seed: number;
}

interface StatsCluster {
  count?: { [clusterId: string]: number };
  length?: { [clusterId: string]: number };
  color?: { [clusterId: string]: string };
  name?: { [clusterId: string]: string };
}

interface MapApiResponse {
  map_html: string;
  cluster_stats: StatsCluster;
}

// Component that uses useSearchParams - needs to be wrapped in Suspense
function RoutePlanningContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState<RoutePlanningFormData>({
    city_name: "",
    department_code: "",
    cluster_count: 1,
    clustering_method: "balanced_count",
    cluster_colors: null,
    seed: 42
  });

  const [isLoading, setIsLoading] = useState(false);
  const [mapHtml, setMapHtml] = useState<string | null>(null);
  const [statsCluster, setStatsCluster] = useState<StatsCluster | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [clusterNames, setClusterNames] = useState<{ [clusterId: string]: string }>({});
  const [clusterColors, setClusterColors] = useState<{ [clusterId: string]: string }>({});
  const [editingColorClusterId, setEditingColorClusterId] = useState<string | null>(null);
  const [colorInputValue, setColorInputValue] = useState<string>('');

  // Load city data from URL parameters on component mount
  useEffect(() => {
    const cityName = searchParams.get('city_name');
    const departmentCode = searchParams.get('department_code');
    
    if (cityName && departmentCode) {
      setFormData(prev => ({
        ...prev,
        city_name: cityName,
        department_code: departmentCode
      }));
    }
  }, [searchParams]);

  const handleInputChange = <K extends keyof RoutePlanningFormData>(field: K, value: RoutePlanningFormData[K]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMapHtml(null);
    setStatsCluster(null);
    
    try {
      const response = await fetch('/api/collabtract/map', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse JSON response
      const data: MapApiResponse = await response.json();
      
      // Extract map_html and cluster_stats from the response
      if (data.map_html && data.cluster_stats) {
        setMapHtml(data.map_html);
        setStatsCluster(data.cluster_stats);
        
        // Initialize cluster names from the response
        if (data.cluster_stats.name) {
          setClusterNames(data.cluster_stats.name);
        }
        
        // Initialize cluster colors from the response
        if (data.cluster_stats.color) {
          setClusterColors(data.cluster_stats.color);
        }
      } else {
        setError("Invalid response format. Missing map_html or cluster_stats data.");
      }
    } catch (error) {
      console.error('Error fetching map:', error);
      setError(error instanceof Error ? error.message : 'An error occurred while fetching the map');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToSearch = () => {
    router.push('/city-search');
  };

  // Handle cluster name change
  const handleClusterNameChange = (clusterId: string, newName: string) => {
    setClusterNames(prev => ({
      ...prev,
      [clusterId]: newName
    }));
  };

  // Handle color chip click - open color editor
  const handleColorChipClick = (clusterId: string, currentColor: string) => {
    setEditingColorClusterId(clusterId);
    setColorInputValue(currentColor);
  };

  // Handle color change
  const handleColorChange = (clusterId: string, newColor: string) => {
    setClusterColors(prev => ({
      ...prev,
      [clusterId]: newColor
    }));
    setEditingColorClusterId(null);
    setColorInputValue('');
  };

  // Handle color editor close
  const handleColorEditorClose = () => {
    setEditingColorClusterId(null);
    setColorInputValue('');
  };

  // Validate hex color
  const isValidHexColor = (color: string): boolean => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
  };

  // Component to render stats cluster table
  const renderStatsTable = () => {
    if (!statsCluster) {
      return null;
    }

    // Handle nested structure: cluster_stats has count, length, color, and name objects
    const { count, length, color, name } = statsCluster;
    
    if (!count || !length) {
      return null;
    }

    // Get all cluster IDs from count (assuming all objects have the same keys)
    const clusterIds = Object.keys(count).sort((a, b) => parseInt(a) - parseInt(b));

    if (clusterIds.length === 0) {
      return null;
    }

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Statistiques des clusters
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Cluster
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Adresses
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Distance (km)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
              {clusterIds.map((clusterId, index) => {
                const defaultColor = color?.[clusterId] || '#808080';
                const clusterColor = clusterColors[clusterId] || defaultColor;
                const defaultName = name?.[clusterId] || `Cluster ${parseInt(clusterId) + 1}`;
                const displayName = clusterNames[clusterId] || defaultName;
                const addressCount = count[clusterId] || 0;
                const distanceMeters = length[clusterId] || 0;
                const distanceKm = (distanceMeters / 1000).toFixed(2);

                return (
                  <tr 
                    key={clusterId} 
                    className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        {/* Color chip - clickable */}
                        <button
                          type="button"
                          onClick={() => handleColorChipClick(clusterId, clusterColor)}
                          className="w-4 h-4 rounded-full flex-shrink-0 border border-gray-300 dark:border-gray-600 cursor-pointer hover:ring-2 hover:ring-blue-500 hover:ring-offset-1 transition-all"
                          style={{ backgroundColor: clusterColor }}
                          title={`Cliquez pour éditer la couleur: ${clusterColor}`}
                        />
                        {/* Editable name */}
                        <input
                          type="text"
                          value={displayName}
                          onChange={(e) => handleClusterNameChange(clusterId, e.target.value)}
                          className="text-sm font-medium text-gray-900 dark:text-white bg-transparent border border-transparent rounded px-2 py-1 hover:border-gray-300 dark:hover:border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors min-w-[120px] max-w-[200px]"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {addressCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {distanceKm}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Color editor modal component
  const renderColorEditor = () => {
    if (!editingColorClusterId) return null;

    const isValid = isValidHexColor(colorInputValue);
    const defaultName = statsCluster?.name?.[editingColorClusterId] || `Cluster ${parseInt(editingColorClusterId) + 1}`;
    const displayName = clusterNames[editingColorClusterId] || defaultName;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleColorEditorClose}>
        <div 
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Éditer la couleur - {displayName}
            </h3>
            <button
              onClick={handleColorEditorClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="color-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Code hexadécimal de la couleur
              </label>
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 flex-shrink-0"
                  style={{ backgroundColor: isValid ? colorInputValue : '#808080' }}
                />
                <input
                  type="text"
                  id="color-input"
                  value={colorInputValue}
                  onChange={(e) => setColorInputValue(e.target.value)}
                  placeholder="#000000"
                  className={`flex-1 px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${
                    isValid 
                      ? 'border-gray-300 dark:border-gray-600 focus:ring-blue-500' 
                      : 'border-red-500 focus:ring-red-500'
                  }`}
                />
              </div>
              {!isValid && colorInputValue && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  Format invalide. Utilisez un code hexadécimal (ex: #FF5733 ou #F73)
                </p>
              )}
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Format: #RRGGBB ou #RGB (ex: #FF5733, #F73)
              </p>
            </div>
            
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
              <button
                type="button"
                onClick={handleColorEditorClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => {
                  if (isValid && editingColorClusterId) {
                    handleColorChange(editingColorClusterId, colorInputValue);
                  }
                }}
                disabled={!isValid}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {renderColorEditor()}
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{formData.city_name}</h1>
              <p className="text-gray-600 dark:text-gray-300">Configurer les paramètres de planification d&apos;itinéraire pour {formData.city_name}</p>
            </div>
            <button
              onClick={handleBackToSearch}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Retour à la recherche</span>
            </button>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[25%_70%] gap-8">
          {/* Left Column - Configuration/Input */}
          <div className="space-y-6">

            {/* Route Planning Form */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Configuration</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* City Information (Read-only) */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="city_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nom de la ville
                    </label>
                    <input
                      type="text"
                      id="city_name"
                      value={formData.city_name}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="department_code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Code postal
                    </label>
                    <input
                      type="text"
                      id="department_code"
                      value={formData.department_code}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Cluster Number */}
                <div>
                  <label htmlFor="cluster_count" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nombre de clusters: {formData.cluster_count}
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      id="cluster_count"
                      min="1"
                      max="20"
                      step="1"
                      value={formData.cluster_count}
                      onChange={(e) => handleInputChange('cluster_count', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((formData.cluster_count - 1) / 19) * 100}%, #e5e7eb ${((formData.cluster_count - 1) / 19) * 100}%, #e5e7eb 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span>1</span>
                      <span>20</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Ajustez le nombre de clusters pour la planification d&apos;itinéraire (1-20)
                  </p>
                </div>

                {/* Clustering Methods */}
                <div>
                  <label htmlFor="clustering_method" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Méthode de clustering
                  </label>
                  <select
                    id="clustering_method"
                    value={formData.clustering_method}
                    onChange={(e) => handleInputChange('clustering_method', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="balanced_count">Nombre d&apos;adresses équilibré</option>
                    <option value="balanced_length">Distance équilibrée (km)</option>
                    <option value="kmeans">Non équilibré</option>
                  </select>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Sélectionnez l&apos;algorithme de clustering pour l&apos;optimisation des itinéraires
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-gray-200 dark:border-gray-600">
                  <button
                    type="submit"
                    disabled={isLoading || !formData.city_name || !formData.department_code}
                    className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Traitement en cours...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        Planification d&apos;itinéraire
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Output/Map and Stats */}
          <div className="space-y-6">
            {/* Map Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Map
              </h2>
              
              {/* Empty state - shown when no map has been generated yet */}
              {!mapHtml && !error && !isLoading && (
                <div className="flex items-center justify-center py-16">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Map Generated</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Configurez vos paramètres et cliquez sur &quot;Planification d&apos;itinéraire&quot; pour générer la carte
                    </p>
                  </div>
                </div>
              )}

              {/* Loading state */}
              {isLoading && (
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center space-x-3">
                    <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">Génération de la carte de planification d&apos;itinéraire...</span>
                  </div>
                </div>
              )}

              {/* Error state */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-red-900 dark:text-red-100">Error</h3>
                      <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Map display */}
              {mapHtml && !isLoading && (
                <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden h-fit">
                  <div 
                    className="w-full overflow-auto"
                    dangerouslySetInnerHTML={{ __html: mapHtml }}
                  />
                </div>
              )}
            </div>
            
            {/* Stats Table Section */}
            {renderStatsTable()}
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading component for Suspense fallback
function RoutePlanningLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Planification d&apos;itinéraire</h1>
              <p className="text-gray-600 dark:text-gray-300">Chargement de la configuration de planification d&apos;itinéraire...</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center py-16">
          <div className="flex items-center space-x-3">
            <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-gray-600 dark:text-gray-300">Chargement...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function RoutePlanningPage() {
  return (
    <Suspense fallback={<RoutePlanningLoading />}>
      <RoutePlanningContent />
    </Suspense>
  );
}
