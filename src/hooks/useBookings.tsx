import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Booking {
  id: string;
  user_id: string;
  route_id: string;
  booking_status: string;
  booking_date: string;
  travel_date: string;
  passengers: number;
  total_cost: number | null;
  created_at: string;
  updated_at: string;
}

export interface CreateBookingData {
  route_id: string;
  travel_date: string;
  passengers?: number;
  total_cost?: number;
}

export const useBookings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: bookings,
    isLoading,
    error
  } = useQuery({
    queryKey: ['bookings', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          travel_routes (
            from_location,
            to_location,
            route_type,
            duration,
            cost,
            distance
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as any[];
    },
    enabled: !!user,
  });

  const createBookingMutation = useMutation({
    mutationFn: async (bookingData: CreateBookingData) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('bookings')
        .insert([{ 
          ...bookingData, 
          user_id: user.id,
          passengers: bookingData.passengers || 1,
          booking_status: 'confirmed'
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast({
        title: "Booking Confirmed",
        description: "Your travel booking has been confirmed successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Booking Failed",
        description: error.message || "Failed to create booking",
        variant: "destructive",
      });
    },
  });

  const cancelBookingMutation = useMutation({
    mutationFn: async (bookingId: string) => {
      const { error } = await supabase
        .from('bookings')
        .update({ booking_status: 'cancelled' })
        .eq('id', bookingId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast({
        title: "Booking Cancelled",
        description: "Your booking has been cancelled.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to cancel booking",
        variant: "destructive",
      });
    },
  });

  return {
    bookings: bookings || [],
    isLoading,
    error,
    createBooking: createBookingMutation.mutate,
    cancelBooking: cancelBookingMutation.mutate,
    isCreating: createBookingMutation.isPending,
    isCancelling: cancelBookingMutation.isPending,
  };
};