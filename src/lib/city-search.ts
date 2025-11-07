import { CityResult } from '@/types/city-search';

const NAME_CANDIDATE_KEYS = [
  'nom_standard',
  'standard_name',
  'nom_commune',
  'libelle_commune',
  'nom',
  'ville',
  'label',
];

const POSTAL_CODE_CANDIDATE_KEYS = [
  'code_postal',
  'postal_code',
  'dep_code',
  'zip',
];

const DEPARTMENT_CODE_CANDIDATE_KEYS = [
  'dep_code',
  'code_departement',
  'department_code',
];

const extractStringValue = (value: unknown): string | undefined => {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value.trim();
  }

  if (Array.isArray(value)) {
    const firstString = value.find((entry) => typeof entry === 'string' && entry.trim().length > 0);
    return typeof firstString === 'string' ? firstString.trim() : undefined;
  }

  return undefined;
};

const pickFirstMatchingValue = (city: CityResult, keys: string[]): string | undefined => {
  for (const key of keys) {
    const value = extractStringValue(city[key]);
    if (value) {
      return value;
    }
  }

  return undefined;
};

export const getCityName = (city: CityResult): string => {
  const candidate = pickFirstMatchingValue(city, NAME_CANDIDATE_KEYS);
  return candidate ?? '';
};

export const getCityPostalCode = (city: CityResult): string => {
  if (Array.isArray(city.codes_postaux)) {
    const code = extractStringValue(city.codes_postaux);
    if (code) {
      return code;
    }
  }

  const candidate = pickFirstMatchingValue(city, POSTAL_CODE_CANDIDATE_KEYS);
  return candidate ?? '';
};

export const getCityDepartmentCode = (city: CityResult): string => {
  const candidate = pickFirstMatchingValue(city, DEPARTMENT_CODE_CANDIDATE_KEYS);
  return candidate ?? '';
};

export const hasDisplayableData = (city: CityResult): boolean => {
  return getCityName(city) !== '' || getCityPostalCode(city) !== '';
};

