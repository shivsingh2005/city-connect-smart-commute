import { CreditCard, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SubscriptionCard from "@/components/wallet/SubscriptionCard";
import ExpenseInsights from "@/components/wallet/ExpenseInsights";

export default function WalletTab() {
  return (
    <div className="pb-20 px-4 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Wallet</h1>
          <p className="text-muted-foreground">Manage payments & subscriptions</p>
        </div>
        <Button variant="outline" size="icon">
          <Plus size={20} />
        </Button>
      </div>

      {/* Balance Card */}
      <Card className="p-4 mb-6 bg-gradient-card shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">CityConnect Balance</h3>
          <CreditCard size={20} className="text-primary" />
        </div>
        
        <div className="space-y-2">
          <div className="text-3xl font-bold text-foreground">₹247</div>
          <p className="text-sm text-muted-foreground">Available for bookings</p>
          
          <div className="flex space-x-2 pt-2">
            <Button size="sm" className="flex-1">
              Add Money
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              History
            </Button>
          </div>
        </div>
      </Card>

      {/* Subscription */}
      <div className="mb-6">
        <SubscriptionCard />
      </div>

      {/* Expense Insights */}
      <ExpenseInsights />
    </div>
  );
}