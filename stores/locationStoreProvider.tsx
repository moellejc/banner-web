'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import { type LocationStore, createLocationStore, initLocationStore } from '@/stores/locationStore';

export type LocationStoreApi = ReturnType<typeof createLocationStore>

export const LocationStoreContext = createContext<LocationStoreApi | undefined>(
  undefined,
);

export interface LocationStoreProviderProps {
  children: ReactNode
};

export const LocationStoreProvider = ({ children }: LocationStoreProviderProps) => {
  const storeRef = useRef<LocationStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createLocationStore();
  }

  return (
    <LocationStoreContext.Provider value={storeRef.current}>
      {children}
    </LocationStoreContext.Provider>
  );
};

export const useLocationStore = <T,>( selector: (store: LocationStore) => T, ): T => {
  const locationStoreContext = useContext(LocationStoreContext);

  if (!locationStoreContext) {
    throw new Error(`useLocationStore must be used within LocationStoreProvider`);
  }

  return useStore(locationStoreContext, selector);
}