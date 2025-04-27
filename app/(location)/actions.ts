'use server';

import { placesClient } from "@/lib/location/google";

export const callPlacesNearby = async (lat: number, lon: number): Promise<any[]> => {
    let center = new google.maps.LatLng(lat, lon);
  // Construct request
  const request = {
    // required parameters
    fields: ['displayName', 'location', 'businessStatus'],
    locationRestriction: {
        center: center,
        radius: 100, 
    },
    // optional parameters
    // includedPrimaryTypes: ['restaurant'],
    maxResultCount: 50,
    rankPreference: google.maps.places.SearchNearbyRankPreference.POPULARITY,
    language: 'en-US',
    region: 'us',
  };

  // Run request

  //@ts-ignore
  const { places } = await placesClient.searchNearby(request);

  console.log(places);
  return places;
};