import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Route } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MapRouteProps {
  fromLocation: string;
  toLocation: string;
  onRouteCalculated?: (distance: number, duration: number) => void;
}

export default function MapRoute({ fromLocation, toLocation, onRouteCalculated }: MapRouteProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  const { toast } = useToast();

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [77.5946, 12.9716], // Bangalore center
      zoom: 11,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      calculateRoute();
    });
  };

  const calculateRoute = async () => {
    if (!map.current || !fromLocation || !toLocation) return;

    try {
      // Geocode locations
      const fromCoords = await geocodeLocation(fromLocation);
      const toCoords = await geocodeLocation(toLocation);

      if (!fromCoords || !toCoords) {
        toast({
          title: "Location Error",
          description: "Could not find one or both locations",
          variant: "destructive"
        });
        return;
      }

      // Get route from Mapbox Directions API
      const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${fromCoords[0]},${fromCoords[1]};${toCoords[0]},${toCoords[1]}?steps=true&geometries=geojson&access_token=${mapboxToken}`;
      
      const response = await fetch(directionsUrl);
      const data = await response.json();

      if (data.routes && data.routes[0]) {
        const route = data.routes[0];
        const routeDistance = (route.distance / 1000).toFixed(1); // Convert to km
        const routeDuration = Math.round(route.duration / 60); // Convert to minutes

        setDistance(Number(routeDistance));
        setDuration(routeDuration);
        onRouteCalculated?.(Number(routeDistance), routeDuration);

        // Add route to map
        if (map.current.getSource('route')) {
          map.current.removeLayer('route');
          map.current.removeSource('route');
        }

        map.current.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: route.geometry
          }
        });

        map.current.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': 'hsl(var(--primary))',
            'line-width': 4
          }
        });

        // Add markers
        new mapboxgl.Marker({ color: 'hsl(var(--success))' })
          .setLngLat(fromCoords)
          .setPopup(new mapboxgl.Popup().setText(fromLocation))
          .addTo(map.current);

        new mapboxgl.Marker({ color: 'hsl(var(--destructive))' })
          .setLngLat(toCoords)
          .setPopup(new mapboxgl.Popup().setText(toLocation))
          .addTo(map.current);

        // Fit map to show entire route
        const bounds = new mapboxgl.LngLatBounds();
        bounds.extend(fromCoords);
        bounds.extend(toCoords);
        map.current.fitBounds(bounds, { padding: 50 });
      }
    } catch (error) {
      console.error('Route calculation error:', error);
      toast({
        title: "Route Error",
        description: "Could not calculate route between locations",
        variant: "destructive"
      });
    }
  };

  const geocodeLocation = async (location: string): Promise<[number, number] | null> => {
    try {
      const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location + ', Bangalore, India')}.json?access_token=${mapboxToken}&limit=1`;
      const response = await fetch(geocodeUrl);
      const data = await response.json();

      if (data.features && data.features[0]) {
        return data.features[0].center;
      }
      return null;
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setShowTokenInput(false);
      toast({
        title: "Token Added",
        description: "Mapbox token saved. Initializing map...",
      });
      setTimeout(() => {
        initializeMap();
      }, 500);
    }
  };

  useEffect(() => {
    if (map.current && !showTokenInput) {
      calculateRoute();
    }
  }, [fromLocation, toLocation, showTokenInput]);

  if (showTokenInput) {
    return (
      <Card className="p-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 text-primary">
            <MapPin size={24} />
            <h3 className="text-lg font-semibold">Setup Map Integration</h3>
          </div>
          <p className="text-muted-foreground text-sm">
            Enter your Mapbox public token to enable route mapping and distance calculation.
            <br />
            Get your token from: <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>
          </p>
          <div className="flex space-x-2">
            <Input
              placeholder="pk.eyJ1Ijoi..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleTokenSubmit}>
              <Route size={16} className="mr-2" />
              Initialize Map
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center space-x-2">
          <Route size={20} className="text-primary" />
          <span>Route Map</span>
        </h3>
        {distance && duration && (
          <div className="flex space-x-2">
            <Badge variant="secondary">
              {distance} km
            </Badge>
            <Badge variant="secondary">
              {duration} min
            </Badge>
          </div>
        )}
      </div>
      
      <div className="relative">
        <div 
          ref={mapContainer} 
          className="w-full h-64 rounded-lg border border-border shadow-sm"
        />
        {!distance && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded-lg">
            <p className="text-muted-foreground">Calculating route...</p>
          </div>
        )}
      </div>
      
      {distance && duration && (
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Distance</p>
            <p className="text-lg font-semibold text-primary">{distance} km</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Estimated Time</p>
            <p className="text-lg font-semibold text-primary">{duration} min</p>
          </div>
        </div>
      )}
    </Card>
  );
}