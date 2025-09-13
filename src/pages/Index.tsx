import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import BottomNavigation from "@/components/layout/BottomNavigation";
import HomeTab from "./HomeTab";
import TravelTab from "./TravelTab";
import RewardsTab from "./RewardsTab";
import WalletTab from "./WalletTab";
import ProfileTab from "./ProfileTab";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { LogIn, Loader2 } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const { toast } = useToast();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect to auth if not authenticated (except for loading state)
  useEffect(() => {
    if (!loading && !user) {
      // Allow users to see the home page but require auth for other actions
    }
  }, [user, loading, navigate]);

  const handleTravelOptionSelect = (option: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please sign in to access travel options.",
        variant: "destructive",
      });
      return;
    }
    setActiveTab("travel");
    toast({
      title: "Redirected to Travel",
      description: `Finding best ${option} options for you...`,
    });
  };

  const handleRouteSelect = (routeId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please sign in to select routes.",
        variant: "destructive",
      });
      return;
    }
    // Route selection is now handled by the RouteComparison component
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "home":
        return <HomeTab onTravelOptionSelect={handleTravelOptionSelect} />;
      case "travel":
        return <TravelTab onRouteSelect={handleRouteSelect} />;
      case "rewards":
        return <RewardsTab />;
      case "wallet":
        return <WalletTab />;
      case "profile":
        return <ProfileTab />;
      default:
        return <HomeTab onTravelOptionSelect={handleTravelOptionSelect} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="text-lg">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {!user && (
        <div className="bg-primary/10 border-b border-border p-4 text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="text-sm text-muted-foreground">
              Sign in to access all features and save your travel data
            </span>
            <Link to="/auth">
              <Button variant="outline" size="sm">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      )}
      <main className="relative">
        {renderActiveTab()}
      </main>
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
