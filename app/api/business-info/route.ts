import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const businessName = searchParams.get('name');
  const location = searchParams.get('location') || 'Lebanon';

  if (!businessName) {
    return NextResponse.json(
      { error: 'Business name is required' },
      { status: 400 }
    );
  }

  // Use server-side environment variable (without NEXT_PUBLIC prefix for API routes)
  const apiKey = process.env.GOOGLE_PLACES_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    // Return placeholder data if API key is not configured
    return NextResponse.json({
      photos: [],
      rating: null,
      userRatingsTotal: null,
      address: null,
      phone: null,
      website: null,
      openingHours: null,
      error: 'Google Places API key not configured'
    });
  }

  try {
    // First, search for the place
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(businessName + ' ' + location)}&key=${apiKey}`;
    
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    if (searchData.status !== 'OK' || !searchData.results || searchData.results.length === 0) {
      return NextResponse.json({
        photos: [],
        rating: null,
        userRatingsTotal: null,
        address: null,
        phone: null,
        website: null,
        openingHours: null,
        error: 'Business not found on Google Places'
      });
    }

    const placeId = searchData.results[0].place_id;
    const photos = searchData.results[0].photos || [];

    // Get detailed place information
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,formatted_address,formatted_phone_number,website,opening_hours,photos&key=${apiKey}`;
    
    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();

    if (detailsData.status !== 'OK') {
      return NextResponse.json({
        photos: photos.map((photo: any) => ({
          url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photo.photo_reference}&key=${apiKey}`
        })),
        rating: searchData.results[0].rating || null,
        userRatingsTotal: searchData.results[0].user_ratings_total || null,
        address: searchData.results[0].formatted_address || null,
        phone: null,
        website: null,
        openingHours: null
      });
    }

    const place = detailsData.result;

    // Get photo URLs
    const photoUrls = (place.photos || photos || []).slice(0, 10).map((photo: any) => ({
      url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photo.photo_reference}&key=${apiKey}`
    }));

    return NextResponse.json({
      photos: photoUrls,
      rating: place.rating || null,
      userRatingsTotal: place.user_ratings_total || null,
      address: place.formatted_address || null,
      phone: place.formatted_phone_number || null,
      website: place.website || null,
      openingHours: place.opening_hours?.weekday_text || null
    });
  } catch (error) {
    console.error('Error fetching Google Places data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch business information' },
      { status: 500 }
    );
  }
}

