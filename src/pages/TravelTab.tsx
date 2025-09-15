import { ArrowLeft, MapPin, Navigation, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RouteComparison from "@/components/travel/RouteComparison";
import BookingHistory from "@/components/booking/BookingHistory";
import MapRoute from "@/components/travel/MapRoute";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";

interface TravelTabProps {
  onRouteSelect: (routeId: string) => void;
}

export default function TravelTab({ onRouteSelect }: TravelTabProps) {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [routeInfo, setRouteInfo] = useState<{distance: number, duration: number} | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by this browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Reverse geocode to get address
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=YOUR_MAPBOX_TOKEN&limit=1`
          );
          const data = await response.json();
          
          if (data.features && data.features.length > 0) {
            setFromLocation(data.features[0].place_name);
            toast.success("Current location detected!");
          } else {
            setFromLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
            toast.success("Current coordinates set!");
          }
        } catch (error) {
          setFromLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          toast.success("Current coordinates set!");
        }
      },
      (error) => {
        toast.error("Unable to get your location. Please enter it manually.");
      }
    );
  };

  const handleCalculateDistance = () => {
    if (!fromLocation.trim()) {
      toast.error("Please enter your current location");
      return;
    }
    if (!toLocation.trim()) {
      toast.error("Please enter your destination");
      return;
    }
    
    setIsCalculating(true);
    setRouteInfo(null);
    toast.success("Calculating route...");
    
    // The MapRoute component will handle the actual calculation
    // and call onRouteCalculated when done
  };

  const handleRouteCalculated = (distance: number, duration: number) => {
    setRouteInfo({ distance, duration });
    setIsCalculating(false);
    toast.success(`Route calculated: ${distance}km, ${Math.round(duration)}min`);
  };

  const handleLocationSearch = (locationType: 'from' | 'to') => {
    const location = locationType === 'from' ? fromLocation : toLocation;
    if (!location.trim()) {
      toast.error(`Please enter a ${locationType === 'from' ? 'current location' : 'destination'} first`);
      return;
    }
    
    // In a real app, this could open a location picker or validate the address
    toast.success(`Searching for: ${location}`);
  };

  return (
    <div className="pb-20 px-4 pt-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <h1 className="text-2xl font-bold text-foreground">Plan Your Trip</h1>
      </div>

      {/* Journey Input */}
      <Card className="p-4 mb-6 bg-gradient-card shadow-card">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <Input 
              placeholder="Enter your current location"
              className="flex-1"
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
            />
            <Button 
              variant="outline" 
              size="icon"
              onClick={getCurrentLocation}
              title="Use current location"
            >
              <Navigation size={16} />
            </Button>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-destructive rounded-full"></div>
            <Input 
              placeholder="Enter your destination"
              className="flex-1"
              value={toLocation}
              onChange={(e) => setToLocation(e.target.value)}
            />
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleLocationSearch('to')}
              title="Search destination"
            >
              <MapPin size={16} />
            </Button>
          </div>
          
          <Button 
            className="w-full bg-gradient-primary hover:opacity-90"
            onClick={handleCalculateDistance}
            disabled={isCalculating}
          >
            {isCalculating ? "Calculating..." : "Calculate Distance & Find Routes"}
          </Button>
        </div>
        </Card>

      {/* Distance Calculation Results */}
      {routeInfo && (
        <Card className="mb-6 p-4 bg-gradient-subtle border-primary/20">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-primary mb-2">Route Calculated</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background/50 rounded-lg p-3">
                <p className="text-sm text-muted-foreground">Distance</p>
                <p className="text-xl font-bold text-primary">{routeInfo.distance} km</p>
              </div>
              <div className="bg-background/50 rounded-lg p-3">
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="text-xl font-bold text-primary">{routeInfo.duration} min</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Map Route */}
      {fromLocation && toLocation && (
        <div className="mb-6">
          <MapRoute 
            fromLocation={fromLocation} 
            toLocation={toLocation}
            onRouteCalculated={handleRouteCalculated}
          />
        </div>
      )}

      {/* Tabs for Routes and Bookings */}
      <Tabs defaultValue="routes" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="routes">Available Routes</TabsTrigger>
          <TabsTrigger value="bookings" className="flex items-center space-x-2">
            <History size={16} />
            <span>My Bookings</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="routes">
          <RouteComparison onRouteSelect={onRouteSelect} />
        </TabsContent>
        
        <TabsContent value="bookings">
          <BookingHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}