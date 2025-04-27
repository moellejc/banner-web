import { useEffect, useState } from 'react';
import { Coordinates } from '@/types/coordinates';

export const useLocation = () => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoadingLocation(false);
      },
      (err) => {
        setError(`Error getting location: ${err.message}`);
        setLoadingLocation(false);
      }
    );
  }, []);

  return { location, error, loadingLocation };
};
