import { useEffect, useState } from 'react';
import { callPlacesNearby } from '@/lib/maps/google';
import { useLocation } from '@/hooks/use-location';

export const GreetingLocation = () => {

    const [loadingPlace, setLoadingPlaces] = useState<boolean>(true);
    const [place, setPlace] = useState<string>("");
    const { location, error, loadingLocation } = useLocation();

    useEffect(()=>{
        const fetchCurrentPlace = async ()=>{
            try{
                if(location) {
                    const places = await callPlacesNearby(location.latitude, location.longitude);
                }

                setPlace("A Place's Name");
            } catch (error) {
                console.error('Error fetching place:', error);
                setPlace("Couldn't find your location");
            } finally {
                setLoadingPlaces(false);
                
            }
            
        };
        

        if (!loadingLocation) fetchCurrentPlace();

    },[]);

    return (
        <div>
            {loadingPlace ? "Hold tight finding location!" : `Welcome to PLACE!`}
        </div>
    );
};