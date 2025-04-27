import { useEffect, useState } from 'react';
import { useLocation } from '@/hooks/use-location';
import { useLocationStore } from '@/stores/locationStoreProvider';

export const GreetingLocation = () => {

    const [loadingPlace, setLoadingPlaces] = useState<boolean>(true);
    const [place, setPlace] = useState<string>("");
    const { location, error, loadingLocation } = useLocation();
    const { coordinates } = useLocationStore((state)=>state);

    useEffect(()=>{
        // const fetchCurrentPlace = async ()=>{
        //     try{
        //         if(location) {
        //             const places = await callPlacesNearby(location.latitude, location.longitude);
        //         }

        //         setPlace("A Place's Name");
        //     } catch (error) {
        //         console.error('Error fetching place:', error);
        //         setPlace("Couldn't find your location");
        //     } finally {
        //         setLoadingPlaces(false);
                
        //     }
            
        // };
        

        // if (!loadingLocation) fetchCurrentPlace();

    },[]);

    return (
        <div>
            Welcome to PLACE!
            <hr/>
            Coordinates: { JSON.stringify(coordinates) }
        </div>
    );
};