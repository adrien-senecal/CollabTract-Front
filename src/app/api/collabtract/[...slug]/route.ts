// src/app/api/collabtract/[...slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { API_CONFIG } from '@/config/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  
  // Get query parameters from the request
  const { searchParams } = new URL(request.url);
  const queryString = searchParams.toString();
  
  // Build the external API URL with query parameters
  const externalApiUrl = `${API_CONFIG.COLLAB_TRACT_API_URL}/${slug.join('/')}${queryString ? `?${queryString}` : ''}`;

  // Check if the API URL is configured
  if (!API_CONFIG.COLLAB_TRACT_API_URL) {
    console.error('COLLAB_TRACT_API_URL is not configured');
    return NextResponse.json(
      { error: 'API URL not configured. Please set COLLAB_TRACT_API_URL environment variable.' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(externalApiUrl, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des données' },
      { status: 500 }
    );
  }
}
