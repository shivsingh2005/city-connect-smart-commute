import { useState } from "react";
import BottomNavigation from "@/components/layout/BottomNavigation";
import HomeTab from "./HomeTab";
import TravelTab from "./TravelTab";
import RewardsTab from "./RewardsTab";
import WalletTab from "./WalletTab";
import ProfileTab from "./ProfileTab";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const { toast } = useToast();

  const handleTravelOptionSelect = (option: string) => {
    setActiveTab("travel");
    toast({
      title: "Redirected to Travel",
      description: `Finding best ${option} options for you...`,
    });
  };

  const handleRouteSelect = (routeId: string) => {
    toast({
      title: "Route Selected",
      description: "Redirecting to booking confirmation...",
    });
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

  return (
    <div className="min-h-screen bg-background">
      <main className="relative">
        {renderActiveTab()}
      </main>
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
