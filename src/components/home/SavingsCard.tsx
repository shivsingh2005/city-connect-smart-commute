import { TrendingUp, IndianRupee } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function SavingsCard() {
  return (
    <Card className="p-6 bg-gradient-success text-success-foreground shadow-elevated">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <TrendingUp size={24} />
          <h3 className="text-lg font-semibold">This Month's Savings</h3>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-baseline space-x-1">
          <IndianRupee size={28} />
          <span className="text-4xl font-bold">342</span>
        </div>
        
        <div className="text-sm opacity-90">
          <p>You saved 23% on your commute costs!</p>
          <p className="mt-1">Smart routing saved you ₹127 this week</p>
        </div>
        
        <div className="pt-2 border-t border-success-foreground/20">
          <p className="text-sm font-medium">Goal: ₹500/month • 68% achieved</p>
        </div>
      </div>
    </Card>
  );
}