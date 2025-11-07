// Types for city search API
export interface CityResult {
  nom_standard?: string;
  standard_name?: string;
  nom_commune?: string;
  libelle_commune?: string;
  nom?: string;
  ville?: string;
  dep_code?: string;
  department_code?: string;
  code_postal?: string;
  postal_code?: string;
  codes_postaux?: string[];
  code_departement?: string;
  [key: string]: unknown;
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
