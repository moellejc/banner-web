"use client";

import { Coordinates } from "@/types/coordinates";
import { createStore } from "zustand/vanilla";
import { getCurrentLocation } from "@/lib/location/utilsClient";
import { Place } from "@/types/places";

export type LocationState = {
  coordinates: Coordinates;
  place: Place;
  coordsTimerId: NodeJS.Timeout | null;
};

export type LocationActions = {
  updateLocation: (coords: Coordinates) => void;
  updatePlace: () => Promise<void>;
  refreshLocationInterval: () => void;
  clearLocationInterval: () => void;
};

export type LocationStore = LocationState & LocationActions;

// TODO: update with actual current location
export const initLocationStore = (): LocationState => {
  return {
    coordinates: {
      latitude: 0,
      longitude: 0,
    },
    place: {
      address: "",
    },
    coordsTimerId: null,
  };
};

export const defaultInitState: LocationState = {
  coordinates: {
    latitude: 0,
    longitude: 0,
  },
  place: {
    address: "",
  },
  coordsTimerId: null,
};

export const createLocationStore = (
  initState: LocationState = defaultInitState
) => {
  return createStore<LocationStore>()((set, get) => ({
    ...initState,
    updateLocation: (coords: Coordinates) => {
      // set the location coordinates
      set({ coordinates: coords });

      // update the place
      get().updatePlace();
    },
    updatePlace: async (): Promise<void> => {
      const coords = get().coordinates;
      const response = await fetch("/api/location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coords }),
      });

      console.log(response);
      console.log(response);
      console.log(response.text);
    },
    refreshLocationInterval: () => {
      // get the current latitude and longitude every 10 seconds
      const coordsTimerId = setInterval(async () => {
        getCurrentLocation(get().updateLocation);
      }, 10000);
      set({ coordsTimerId });
    },
    clearLocationInterval: () => {
      const { coordsTimerId } = get();
      if (coordsTimerId === null) return;
      clearInterval(coordsTimerId);
    },
  }));
};
