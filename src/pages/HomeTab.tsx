import { Bell, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import SavingsCard from "@/components/home/SavingsCard";
import TravelOptions from "@/components/home/TravelOptions";
import SmartRoute from "@/components/home/SmartRoute";

interface HomeTabProps {
  onTravelOptionSelect: (option: string) => void;
}

export default function HomeTab({ onTravelOptionSelect }: HomeTabProps) {
  return (
    <div className="pb-20 px-4 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Good morning!</h1>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <MapPin size={14} />
            <span className="text-sm">Bangalore, India</span>
          </div>
        </div>
        <Button variant="outline" size="icon" className="relative">
          <Bell size={20} />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"></div>
        </Button>
      </div>

      {/* Savings Card */}
      <div className="mb-6">
        <SavingsCard />
      </div>

      {/* Smart Route Suggestion */}
      <div className="mb-6">
        <SmartRoute />
      </div>

      {/* Travel Options */}
      <TravelOptions onOptionSelect={onTravelOptionSelect} />
    </div>
  );
}