"use client";

import { Coordinates } from "@/types/coordinates";
import { createStore } from "zustand/vanilla";
import { getCurrentLocation } from "@/lib/location/utilsClient";
import { Place } from "@/types/places";
import { distance } from "@turf/distance";
import { point } from "@turf/helpers";

const DISTANCE_UPDATE_THRESHOLD = 50; // 50 meters

export type LocationState = {
  coordinates: Coordinates;
  place: any | null;
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
    place: null,
    coordsTimerId: null,
  };
};

export const defaultInitState: LocationState = {
  coordinates: {
    latitude: 0,
    longitude: 0,
  },
  place: null,
  coordsTimerId: null,
};

export const createLocationStore = (
  initState: LocationState = defaultInitState
) => {
  return createStore<LocationStore>()((set, get) => ({
    ...initState,
    updateLocation: (coords: Coordinates) => {
      // set the location coordinates
      const oldCoords = get().coordinates;
      const locationDistance = distance(
        point([coords.latitude, coords.longitude]),
        point([oldCoords.latitude, oldCoords.longitude]),
        { units: "meters" }
      );

      // update the place if distance threshold for new location is exceeded
      // or if the place info isn't populated yet
      if (
        locationDistance > DISTANCE_UPDATE_THRESHOLD ||
        Object.keys(get().place).length == 0
      ) {
        console.log("UPDATE PLACE INFO!!");
        set({ coordinates: coords });
        get().updatePlace();
      }
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
      const data = await response.json();
      set({place: data});
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
