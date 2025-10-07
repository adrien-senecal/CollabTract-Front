// Types for city search API
export interface CityResult {
  nom_standard: string;
  dep_code: string;
}

export interface CitySearchResponse {
  type: string;
  input: string;
  results: CityResult[];
}

export interface CitySearchParams {
  city?: string;
  postal_code?: number;
}
