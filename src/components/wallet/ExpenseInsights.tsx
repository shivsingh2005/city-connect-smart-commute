import { TrendingDown, BarChart3, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const monthlyData = [
  { month: "Oct", spent: 1250, saved: 280 },
  { month: "Nov", spent: 1180, saved: 320 },
  { month: "Dec", spent: 1080, saved: 370 },
];

export default function ExpenseInsights() {
  const currentMonth = monthlyData[monthlyData.length - 1];
  const totalSavings = monthlyData.reduce((sum, month) => sum + month.saved, 0);
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Expense Insights</h3>
      
      <Card className="p-4 bg-gradient-card shadow-card">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart3 size={20} className="text-primary" />
          <h4 className="font-semibold">This Month Summary</h4>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">₹{currentMonth.spent}</div>
            <p className="text-sm text-muted-foreground">Total Spent</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">₹{currentMonth.saved}</div>
            <p className="text-sm text-muted-foreground">Money Saved</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-2">
          <TrendingDown size={16} className="text-success" />
          <span className="text-success font-medium">
            25% less than last month
          </span>
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Calendar size={20} className="text-primary" />
          <h4 className="font-semibold">3-Month Trend</h4>
        </div>
        
        <div className="space-y-3">
          {monthlyData.map((month, index) => (
            <div key={month.month} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium w-8">{month.month}</span>
                <div className="flex-1">
                  <div className="text-sm">₹{month.spent} spent</div>
                  <div className="text-xs text-success">₹{month.saved} saved</div>
                </div>
              </div>
              {index === monthlyData.length - 1 && (
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Current
                </Badge>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            Total savings in 3 months: <span className="font-semibold text-success">₹{totalSavings}</span>
          </p>
        </div>
      </Card>
    </div>
  );
}