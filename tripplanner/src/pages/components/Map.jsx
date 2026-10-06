import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export default function Map({ places }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyD7b1cE5aDw7iz2c5WRf0Z1nLEamm_H5tw', // Replace with your API key
      version: 'weekly',
    });

    loader.load().then(() => {
      if (!mapRef.current) return;

      const bounds = new google.maps.LatLngBounds();
      const map = new google.maps.Map(mapRef.current, {
        zoom: 12,
        mapTypeControl: false,
        streetViewControl: false,
      });

      mapInstanceRef.current = map;

      places.forEach((place, index) => {
        const [lat, lng] = place.loc.split(',').map(Number);
        const position = { lat: parseFloat(lat), lng: parseFloat(lng) };

        if(!isNaN(position.lat) && !isNaN(position.lng)){
          const marker = new google.maps.Marker({
            position,
            map,
            title: place.visit_place,
            label: `${index + 1}`,
          });
  
          bounds.extend(position);
          markersRef.current.push(marker);
  
          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div class="p-2">
                <h3 class="font-bold">${place.visit_place}</h3>
                <p class="text-sm">${place.time}</p>
              </div>
            `,
          });
  
          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        }
      });

      map.fitBounds(bounds);
    });

    return () => {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    };
  }, [places]);

  return <div ref={mapRef} className="w-full h-[400px] rounded-lg" />;
}
