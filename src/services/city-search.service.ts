import { API_CONFIG } from '@/config/api';
import { CitySearchResponse, CitySearchParams } from '@/types/city-search';

export class CitySearchService {
  private static baseUrl = `/api/collabtract/get_city`;

  static async searchCity(params: CitySearchParams): Promise<CitySearchResponse> {
    const searchParams = new URLSearchParams();
    
    if (params.city) {
      searchParams.append('city', params.city);
    }
    
    if (params.postal_code) {
      searchParams.append('postal_code', params.postal_code.toString());
    }

    const url = `${this.baseUrl}?${searchParams.toString()}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data as CitySearchResponse;
    } catch (error) {
      console.error('Error fetching city data:', error);
      throw new Error('Failed to fetch city data. Please try again.');
    }
  }
}
