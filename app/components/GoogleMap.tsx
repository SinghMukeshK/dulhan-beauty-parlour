'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    google: any;
    __googleMapsInitialized?: boolean;
  }
}

interface GoogleMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  markerTitle?: string;
}

export default function GoogleMap({ lat, lng, zoom = 16, markerTitle = 'Dulhan Beauty Parlour' }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    // Fall back to iframe embed if no API key
    if (!apiKey || !mapRef.current) return;

    function initMap() {
      if (!mapRef.current || mapInstanceRef.current) return;

      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          { elementType: 'geometry', stylers: [{ color: '#f5f5f5' }] },
          { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f5f5' }] },
          { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
          { featureType: 'road.arterial', elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
          { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#dadada' }] },
          { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#c9c9c9' }] },
          { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#9e9e9e' }] },
          { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#e5e5e5' }] },
        ],
      });

      new window.google.maps.Marker({
        position: { lat, lng },
        map,
        title: markerTitle,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#9f1239',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2.5,
        },
      });

      mapInstanceRef.current = map;
    }

    // Already loaded
    if (window.google?.maps) {
      initMap();
      return;
    }

    // Script already injected (another instance beat us)
    const existingScript = document.getElementById('google-maps-script');
    if (existingScript) {
      existingScript.addEventListener('load', initMap);
      return () => existingScript.removeEventListener('load', initMap);
    }

    // Inject script
    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', initMap);
    document.head.appendChild(script);

    return () => script.removeEventListener('load', initMap);
  }, [lat, lng, zoom, markerTitle]);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Fallback: embed iframe when no API key
  if (!apiKey) {
    return (
      <iframe
        title={markerTitle}
        src={`https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`}
        className="w-full h-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        aria-label={`Map showing ${markerTitle}`}
      />
    );
  }

  return <div ref={mapRef} className="w-full h-full" />;
}
