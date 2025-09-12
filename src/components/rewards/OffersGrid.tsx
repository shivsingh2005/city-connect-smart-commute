import { Dumbbell, Coffee, ShoppingBag, Utensils } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const offers = [
  {
    id: "gym",
    title: "Cult.fit Membership",
    description: "20% off on annual plans",
    discount: "₹2000 OFF",
    icon: Dumbbell,
    category: "Fitness",
    validUntil: "Dec 31",
  },
  {
    id: "coffee",
    title: "Starbucks",
    description: "Buy 1 Get 1 Free",
    discount: "BOGO",
    icon: Coffee,
    category: "Food",
    validUntil: "Dec 15",
  },
  {
    id: "shopping", 
    title: "Amazon Prime",
    description: "3 months free trial",
    discount: "FREE",
    icon: ShoppingBag,
    category: "Shopping",
    validUntil: "Jan 31",
  },
  {
    id: "food",
    title: "Zomato Gold",
    description: "50% off delivery fees",
    discount: "50% OFF",
    icon: Utensils,
    category: "Food",  
    validUntil: "Dec 20",
  },
];

export default function OffersGrid() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Lifestyle Offers</h3>
      
      <div className="grid grid-cols-1 gap-4">
        {offers.map((offer) => (
          <Card key={offer.id} className="p-4 hover:shadow-card transition-all duration-200">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <offer.icon size={24} className="text-primary" />
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold">{offer.title}</h4>
                    <p className="text-sm text-muted-foreground">{offer.description}</p>
                  </div>
                  <Badge variant="secondary" className="bg-success/10 text-success">
                    {offer.discount}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Valid until {offer.validUntil}
                  </span>
                  <Button size="sm" variant="outline">
                    Claim Offer
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}