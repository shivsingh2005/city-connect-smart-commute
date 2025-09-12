import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface TravelRoute {
  id: string;
  user_id: string;
  from_location: string;
  to_location: string;
  route_type: 'bus' | 'metro' | 'auto' | 'cab';
  duration: number;
  cost: number;
  distance: number;
  created_at: string;
}

export interface CreateRouteData {
  from_location: string;
  to_location: string;
  route_type: 'bus' | 'metro' | 'auto' | 'cab';
  duration: number;
  cost: number;
  distance: number;
}

export const useTravelRoutes = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: routes,
    isLoading,
    error
  } = useQuery({
    queryKey: ['travel-routes', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('travel_routes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as TravelRoute[];
    },
    enabled: !!user,
  });

  const createRouteMutation = useMutation({
    mutationFn: async (routeData: CreateRouteData) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('travel_routes')
        .insert([{ ...routeData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['travel-routes'] });
      toast({
        title: "Route Saved",
        description: "Your travel route has been saved successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save route",
        variant: "destructive",
      });
    },
  });

  const deleteRouteMutation = useMutation({
    mutationFn: async (routeId: string) => {
      const { error } = await supabase
        .from('travel_routes')
        .delete()
        .eq('id', routeId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['travel-routes'] });
      toast({
        title: "Route Deleted",
        description: "Your travel route has been deleted.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete route",
        variant: "destructive",
      });
    },
  });

  return {
    routes: routes || [],
    isLoading,
    error,
    createRoute: createRouteMutation.mutate,
    deleteRoute: deleteRouteMutation.mutate,
    isCreating: createRouteMutation.isPending,
    isDeleting: deleteRouteMutation.isPending,
  };
};