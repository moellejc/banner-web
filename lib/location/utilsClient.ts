import { Coordinates } from "@/types/coordinates";

const defaultLocation = {latitude: 0, longitude:0 };

export const getCurrentLocation = (successCallback: (coords: Coordinates) => void) => {

    if (!navigator){
      throw new Error('Navigator is not defined');
    }

    if (!navigator.geolocation) {
      throw new Error('Geolocation is not supported by your browser');
    }
  
    let newCoords = defaultLocation;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(`Current position: lat: ${position.coords.latitude}, log: ${position.coords.longitude}`);
        newCoords = {latitude: position.coords.latitude, longitude: position.coords.longitude};
        successCallback(newCoords);
        // return {
        //   latitude: position.coords.latitude,
        //   longitude: position.coords.longitude,
        // };
      },
      (err) => {
        throw new Error(`Error getting location: ${err.message}`);
      }
    );
};