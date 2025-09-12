import { Clock, IndianRupee, Car, Bus, Train } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const routes = [
  {
    id: "metro-bus",
    type: "Metro + Bus",
    icon: Train,
    duration: "32 min",
    cost: 28,
    savings: 17,
    badge: "Cheapest",
    badgeColor: "bg-success text-success-foreground",
  },
  {
    id: "cab",
    type: "Cab (Ola)",
    icon: Car,
    duration: "25 min",
    cost: 45,
    savings: 0,
    badge: "Fastest",
    badgeColor: "bg-primary text-primary-foreground",
  },
  {
    id: "bus-direct",
    type: "Direct Bus",
    icon: Bus,
    duration: "40 min",
    cost: 15,
    savings: 30,
    badge: "Most Savings",
    badgeColor: "bg-success text-success-foreground",
  },
];

interface RouteComparisonProps {
  onRouteSelect: (routeId: string) => void;
}

export default function RouteComparison({ onRouteSelect }: RouteComparisonProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Route Options</h3>
      
      {routes.map((route) => (
        <Card key={route.id} className="p-4 cursor-pointer hover:shadow-card transition-all duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <route.icon size={24} className="text-primary" />
              <div>
                <h4 className="font-semibold">{route.type}</h4>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{route.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <IndianRupee size={14} />
                    <span>{route.cost}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-right space-y-2">
              <Badge className={route.badgeColor}>
                {route.badge}
              </Badge>
              {route.savings > 0 && (
                <p className="text-sm text-success font-medium">
                  Save ₹{route.savings}
                </p>
              )}
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
      ))}
    </div>
  );
}