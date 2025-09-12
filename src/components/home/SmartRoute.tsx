import { Navigation, Clock, IndianRupee, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SmartRoute() {
  return (
    <Card className="p-4 bg-gradient-card shadow-card">
      <div className="flex items-center space-x-2 mb-4">
        <Zap size={20} className="text-accent" />
        <h3 className="font-semibold text-foreground">Smart Route Suggestion</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Navigation size={16} />
            <span className="text-sm">Home → Office</span>
          </div>
          <span className="text-sm font-medium text-success">22% cheaper</span>
        </div>
        
        <div className="bg-secondary/50 rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Clock size={16} className="text-primary" />
              <span>Metro + Bus</span>
            </div>
            <div className="flex items-center space-x-1">
              <IndianRupee size={14} />
              <span className="font-semibold">28</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">vs Cab: ₹45</span>
            <span className="text-success font-medium">Save ₹17</span>
          </div>
        </div>
        
        <Button className="w-full bg-gradient-primary hover:opacity-90">
          Book This Route
        </Button>
      </div>
    </Card>
  );
}