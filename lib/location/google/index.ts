import { Coordinates } from "@/types/coordinates";
const { PlacesClient } = require("@googlemaps/places").v1;

export const placesClient = new PlacesClient({
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
});

export const reverseGeocode = async (coords: Coordinates): Promise<any> => {
  // make a reverse geocoding request to google
  // https://developers.google.com/maps/documentation/geocoding/requests-reverse-geocoding
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
    {
      method: "GET",
    }
  );
  const responseObj = await response.json();
  return responseObj;
};

export const placeDetailsFromID = async (placeId: string): Promise<any> => {
  const response = await fetch(
    `https://places.googleapis.com/v1/places/${placeId}?key=${process.env.GOOGLE_MAPS_API_KEY}`,
    {
      method: "GET",
      headers: {
        "X-Goog-FieldMask": "*"
      }
    }
  );
  const responseObj = await response.json();
  return responseObj;
};

export const searchPlacesByCoords = async (
  coords: Coordinates
): Promise<any> => {
  // Construct request
  const placeRequest = {
    // required parameters
    fieldMask: [
      "displayName",
      "location",
      "businessStatus",
      "formattedAddress",
      "types",
    ],
    locationRestriction: {
      circle: {
        center: {
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
        radius: 500,
      },
    },
    // optional parameters
    // includedPrimaryTypes: ['restaurant'],
    maxResultCount: 20,
    rankPreference: "POPULARITY",
    language: "en-US",
    region: "us",
  };

  // Run Maps Place Request

  //@ts-ignore
  const placesResponse = await placesClient.searchNearby(placeRequest, {
    otherArgs: {
      headers: {
        "X-Goog-FieldMask":
          "places.displayName,places.displayName,places.location,places.businessStatus,places.formattedAddress,places.types",
      },
    },
  });

  return placesResponse;
};
