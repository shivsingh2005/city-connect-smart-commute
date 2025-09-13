import { Calendar, MapPin, Users, IndianRupee, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBookings } from "@/hooks/useBookings";
import { format } from "date-fns";

export default function BookingHistory() {
  const { bookings, isLoading, cancelBooking, isCancelling } = useBookings();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Your Bookings</h3>
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">Loading your bookings...</p>
        </Card>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Your Bookings</h3>
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">No bookings found. Book your first trip!</p>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success/10 text-success border-success/20';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'completed':
        return 'bg-muted/10 text-muted-foreground border-muted/20';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Your Bookings</h3>
      
      <div className="space-y-3">
        {bookings.map((booking: any) => (
          <Card key={booking.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold capitalize">
                    {booking.travel_routes?.route_type || 'Route'}
                  </h4>
                  <Badge className={getStatusColor(booking.booking_status)}>
                    {booking.booking_status}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin size={14} />
                  <span>
                    {booking.travel_routes?.from_location} → {booking.travel_routes?.to_location}
                  </span>
                </div>
              </div>

              {booking.booking_status === 'confirmed' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => cancelBooking(booking.id)}
                  disabled={isCancelling}
                  className="text-destructive hover:text-destructive"
                >
                  <X size={16} />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-1">
                <Calendar size={14} className="text-primary" />
                <span>{format(new Date(booking.travel_date), 'MMM dd')}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Users size={14} className="text-primary" />
                <span>{booking.passengers} passenger{booking.passengers > 1 ? 's' : ''}</span>
              </div>
              
              {booking.total_cost && (
                <div className="flex items-center space-x-1">
                  <IndianRupee size={14} className="text-success" />
                  <span className="font-semibold">{booking.total_cost}</span>
                </div>
              )}
            </div>

            <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
              Booked on {format(new Date(booking.created_at), 'MMM dd, yyyy')}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}