import { Crown, Check, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SubscriptionCard() {
  const isSubscribed = true;
  const nextBilling = "Jan 15, 2024";
  
  return (
    <Card className="p-6 bg-gradient-primary text-primary-foreground shadow-elevated">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Crown size={24} />
          <h3 className="text-lg font-semibold">Smart Commuter Pass</h3>
        </div>
        {isSubscribed && (
          <Badge className="bg-success text-success-foreground">
            Active
          </Badge>
        )}
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <Check size={16} />
            <span>Up to 30% savings on all rides</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Check size={16} />
            <span>Priority booking & support</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Check size={16} />
            <span>Exclusive offers & cashback</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Check size={16} />
            <span>Move-to-earn bonus rewards</span>
          </div>
        </div>
        
        {isSubscribed ? (
          <div className="pt-4 border-t border-primary-foreground/20">
            <div className="flex items-center space-x-2 text-sm">
              <Calendar size={16} />
              <span>Next billing: {nextBilling}</span>
            </div>
            <p className="text-sm mt-2 opacity-90">₹99/month • Cancel anytime</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-center">
              <div className="text-2xl font-bold">₹99/month</div>
              <div className="text-sm opacity-90">or ₹999/year (save ₹189)</div>
            </div>
            <Button 
              className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              Subscribe Now
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}