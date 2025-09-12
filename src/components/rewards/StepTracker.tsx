import { Footprints, Target, Gift } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function StepTracker() {
  const todaySteps = 7850;
  const weeklySteps = 45670;
  const weeklyTarget = 70000;
  const progress = (weeklySteps / weeklyTarget) * 100;
  
  return (
    <Card className="p-6 bg-gradient-card shadow-card">
      <div className="flex items-center space-x-2 mb-4">
        <Footprints size={24} className="text-primary" />
        <h3 className="text-lg font-semibold">Move-to-Earn Rewards</h3>
      </div>
      
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">{todaySteps.toLocaleString()}</div>
          <p className="text-sm text-muted-foreground">steps today</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center space-x-1">
              <Target size={16} />
              <span>Weekly Goal</span>
            </span>
            <span className="font-medium">{weeklySteps.toLocaleString()} / {weeklyTarget.toLocaleString()}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="bg-success-light rounded-lg p-3 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Gift size={20} className="text-success" />
            <span className="font-semibold text-success">Next Reward</span>
          </div>
          <p className="text-sm text-success">
            {(100000 - weeklySteps).toLocaleString()} more steps = ₹100 voucher
          </p>
        </div>
        
        <div className="text-center text-xs text-muted-foreground">
          Steps are tracked automatically when you travel
        </div>
      </div>
    </Card>
  );
}