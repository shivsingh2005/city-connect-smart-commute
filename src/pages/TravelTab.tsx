import { ArrowLeft, MapPin, Navigation, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RouteComparison from "@/components/travel/RouteComparison";
import BookingHistory from "@/components/booking/BookingHistory";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TravelTabProps {
  onRouteSelect: (routeId: string) => void;
}

export default function TravelTab({ onRouteSelect }: TravelTabProps) {
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
              placeholder="From: Current Location" 
              className="flex-1"
              defaultValue="Koramangala"
            />
            <Button variant="outline" size="icon">
              <Navigation size={16} />
            </Button>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-destructive rounded-full"></div>
            <Input 
              placeholder="To: Enter destination" 
              className="flex-1"
              defaultValue="Electronic City"
            />
            <Button variant="outline" size="icon">
              <MapPin size={16} />
            </Button>
          </div>
          
          <Button className="w-full bg-gradient-primary hover:opacity-90">
            Find Best Routes
          </Button>
        </div>
      </Card>

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