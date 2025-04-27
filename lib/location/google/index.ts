'use server'

// Imports the Places library
const {PlacesClient} = require('@googlemaps/places').v1;
// import { JWT } from 'google-auth-library';

// Instantiates a client
// const authClient = new JWT();
// authClient.fromAPIKey(process.env.GOOGLE_MAPS_API_KEY);
// const placesClient = new PlacesClient({
//     authClient,
// });

export const placesClient = new PlacesClient({
    apiKey: process.env.GOOGLE_MAPS_API_KEY,
});