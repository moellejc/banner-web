'use client'

import { Coordinates } from "@/types/coordinates";
import {createStore} from "zustand/vanilla";
import { getCurrentLocation } from "@/lib/location/utilsClient";

export type LocationState = {
    coordinates: Coordinates,
    coordsTimerId: NodeJS.Timeout | null,
}

export type LocationActions = {
    updateLocation: (coords: Coordinates) => void,
    refreshLocationInterval: () => void,
    clearLocationInterval: () => void
};

export type LocationStore = LocationState & LocationActions;

// TODO: update with actual current location
export const initLocationStore = (): LocationState => {
    return { 
        coordinates: {
            latitude: 0,
            longitude: 0
        },
        coordsTimerId: null
    };
}

export const defaultInitState: LocationState = {
    coordinates: {
        latitude: 0,
        longitude: 0
    },
    coordsTimerId: null
};

export const createLocationStore = (initState: LocationState = defaultInitState) => {
    return createStore<LocationStore>()((set, get) => ({
        ...initState,
        updateLocation: (coords: Coordinates) => set({coordinates: coords}),
        refreshLocationInterval: () => {
            // get the current latitude and longitude every 10 seconds
            const coordsTimerId = setInterval(async() => {
                getCurrentLocation(get().updateLocation);
            }, 5000);
            set({ coordsTimerId });
        },
        clearLocationInterval: () => {
            const { coordsTimerId } = get();
            if (coordsTimerId === null) return;
            clearInterval(coordsTimerId);
        }
    }))
};


// entire location store
// const useLocationStore = create<LocationStore>((set) => ({
//     coordinates: {
//         latitude: 0,
//         longitude: 0,
//     },
//     actions: {
//         updateLocation: (coords: Coordinates) => set({coordinates: coords}),
//     },
    
// }));

// // individual selectors to reduce unnecessary rerenders
// export const useLocation = () => useLocationStore((state) => state.coordinates);

// export const useLocationActions = () => useLocationStore((state) => state.actions);
