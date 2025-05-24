import { useEffect, useState } from 'react';
import { useLocationStore } from '@/stores/locationStoreProvider';

export const GreetingLocation = () => {

    const { place } = useLocationStore((state)=>state);

    const loadingLocation = (placeData: any):string => {
        
        const loadingText = "Loading Your Location...";
        if (placeData === null) return loadingText;
        if (!('displayName' in placeData) || !('text' in placeData.displayName) || !('formattedAddress' in placeData)) return loadingText;

        return `Welcome to ${placeData.displayName.text ? placeData.displayName.text : placeData.formattedAddress }`;
    };

    return (
        <div>
            {loadingLocation(place)}
        </div>
    );
};