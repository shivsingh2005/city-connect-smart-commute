import { useState } from "react";
import { Calendar, Users, IndianRupee, Clock, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useBookings } from "@/hooks/useBookings";
import { TravelRoute } from "@/hooks/useTravelRoutes";

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  route: TravelRoute | null;
}

export default function BookingDialog({ open, onOpenChange, route }: BookingDialogProps) {
  const [travelDate, setTravelDate] = useState(new Date().toISOString().split('T')[0]);
  const [passengers, setPassengers] = useState(1);
  const { createBooking, isCreating } = useBookings();

  const handleBooking = () => {
    if (!route) return;

    const totalCost = (route.cost || 0) * passengers;
    
    createBooking({
      route_id: route.id,
      travel_date: travelDate,
      passengers,
      total_cost: totalCost,
    });

    onOpenChange(false);
  };

  if (!route) return null;

  const totalCost = (route.cost || 0) * passengers;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book Your Trip</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Route Summary */}
          <Card className="p-4 bg-gradient-card">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold capitalize">{route.route_type}</h3>
                <div className="flex items-center space-x-1 text-success">
                  <IndianRupee size={16} />
                  <span className="font-semibold">{route.cost}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin size={14} />
                <span>{route.from_location} → {route.to_location}</span>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Clock size={14} />
                  <span>{route.duration} min</span>
                </div>
                <span>•</span>
                <span>{route.distance} km</span>
              </div>
            </div>
          </Card>

          {/* Booking Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="travel-date" className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>Travel Date</span>
              </Label>
              <Input
                id="travel-date"
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="passengers" className="flex items-center space-x-2">
                <Users size={16} />
                <span>Number of Passengers</span>
              </Label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPassengers(Math.max(1, passengers - 1))}
                  disabled={passengers <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center font-semibold">{passengers}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPassengers(Math.min(10, passengers + 1))}
                  disabled={passengers >= 10}
                >
                  +
                </Button>
              </div>
            </div>
          </div>

          {/* Total Cost */}
          <Card className="p-4 bg-primary/5 border-primary/20">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Total Cost</span>
              <div className="flex items-center space-x-1 text-xl font-bold text-primary">
                <IndianRupee size={20} />
                <span>{totalCost}</span>
              </div>
            </div>
            {passengers > 1 && (
              <p className="text-sm text-muted-foreground mt-1">
                ₹{route.cost} × {passengers} passengers
              </p>
            )}
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-gradient-primary hover:opacity-90"
              onClick={handleBooking}
              disabled={isCreating}
            >
              {isCreating ? "Booking..." : "Confirm Booking"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}