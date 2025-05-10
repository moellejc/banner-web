import { useEffect, useState } from 'react';
import { useLocation } from '@/hooks/use-location';
import { useLocationStore } from '@/stores/locationStoreProvider';

export const GreetingLocation = () => {

    const { location, error, loadingLocation } = useLocation();
    const { coordinates, place } = useLocationStore((state)=>state);
    
    const getDisplayName = (placeData:any):string => {
        
        // check for at least an address
        if(!Object.hasOwn(place, "formattedAddress")) return "";

        // check for key attributes in place data for place name
        if (!Object.hasOwn(placeData, 'displayName') || !Object.hasOwn(placeData.displayName, 'text')) return placeData.formattedAddress;

        // check if the display name is just the street from the formatted address
        if (placeData.formattedAddress.startsWith(placeData.displayName.text)) return placeData.formattedAddress;

        return placeData.displayName.text;
    };

    return (
        <div>
            { Object.hasOwn(place, "formattedAddress") ?  `Welcome to ${place.formattedAddress}` : "Waiting on place information..."}!
            <hr/>
            Coordinates: { JSON.stringify(coordinates) }
        </div>
    );
};