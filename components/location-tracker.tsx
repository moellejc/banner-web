'use client'

import { useEffect } from 'react';
import { useLocationStore } from '@/stores/locationStoreProvider';

// this componenet is solely used to start the location tracker 
// interval once the client loads
export const LocationTracker = () => {

    const { refreshLocationInterval } = useLocationStore((state)=>state);

    useEffect(() => {
        refreshLocationInterval();
    }, [refreshLocationInterval]);

    return (
        <></>
    );
};