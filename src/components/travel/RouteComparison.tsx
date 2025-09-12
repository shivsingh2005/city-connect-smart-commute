import { Clock, IndianRupee, Car, Bus, Train, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTravelRoutes } from "@/hooks/useTravelRoutes";
import { useAuth } from "@/contexts/AuthContext";

const getRouteIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'metro': return Train;
    case 'bus': return Bus;
    case 'cab': return Car;
    case 'auto': return Car;
    default: return Bus;
  }
};

interface RouteComparisonProps {
  onRouteSelect: (routeId: string) => void;
}

export default function RouteComparison({ onRouteSelect }: RouteComparisonProps) {
  const { routes, isLoading, createRoute, isCreating } = useTravelRoutes();
  const { user } = useAuth();

  const handleCreateSampleRoute = () => {
    if (!user) return;
    
    createRoute({
      from_location: "Koramangala",
      to_location: "Electronic City",
      route_type: "metro",
      duration: 32,
      cost: 28,
      distance: 15.5
    });
  };

  if (!user) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Route Options</h3>
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">Please sign in to view and save your routes</p>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Route Options</h3>
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">Loading your routes...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Your Routes</h3>
        <Button 
          onClick={handleCreateSampleRoute}
          disabled={isCreating}
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Sample Route
        </Button>
      </div>
      
      {routes.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="text-muted-foreground mb-4">No routes found. Add your first route!</p>
          <Button onClick={handleCreateSampleRoute} disabled={isCreating}>
            <Plus className="w-4 h-4 mr-2" />
            Add Sample Route
          </Button>
        </Card>
      ) : (
        routes.map((route) => {
          const RouteIcon = getRouteIcon(route.route_type);
          return (
            <Card key={route.id} className="p-4 cursor-pointer hover:shadow-card transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <RouteIcon size={24} className="text-primary" />
                  <div>
                    <h4 className="font-semibold capitalize">{route.route_type}</h4>
                    <p className="text-sm text-muted-foreground mb-1">
                      {route.from_location} → {route.to_location}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>{route.duration} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <IndianRupee size={14} />
                        <span>{route.cost}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right space-y-2">
                  <Badge className="bg-primary text-primary-foreground">
                    {route.distance} km
                  </Badge>
                </div>
              </div>
              
              <Button 
                onClick={() => onRouteSelect(route.id)}
                className="w-full" 
                variant="outline"
              >
                Select Route
              </Button>
            </Card>
          );
        })
      )}
    </div>
  );
}