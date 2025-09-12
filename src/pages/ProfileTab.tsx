import { User, Settings, HelpCircle, Shield, LogOut, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const menuItems = [
  { icon: Settings, label: "Settings", description: "App preferences & notifications" },
  { icon: HelpCircle, label: "Help & Support", description: "Get help or contact us" },
  { icon: Shield, label: "Privacy & Security", description: "Manage your data & privacy" },
];

export default function ProfileTab() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const getUserInitials = (email: string) => {
    return email.split('@')[0].substring(0, 2).toUpperCase();
  };

  const getUserDisplayName = (email: string) => {
    return email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (!user) {
    return (
      <div className="pb-20 px-4 pt-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        </div>
        
        <Card className="p-6 text-center">
          <div className="mb-4">
            <User className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Not Signed In</h3>
            <p className="text-muted-foreground mb-6">
              Sign in to access your profile and travel history
            </p>
          </div>
          <Link to="/auth">
            <Button>
              Sign In
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="pb-20 px-4 pt-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
      </div>

      {/* User Info Card */}
      <Card className="p-6 mb-6 bg-gradient-card shadow-card">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
              {getUserInitials(user.email || '')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h3 className="text-xl font-semibold">{getUserDisplayName(user.email || '')}</h3>
            <p className="text-muted-foreground">{user.email}</p>
            <div className="flex items-center space-x-2 mt-2">
              <Badge className="bg-success/10 text-success">
                Smart Commuter
              </Badge>
              <Badge variant="secondary">
                Member since {new Date(user.created_at).toLocaleDateString('en-US', { 
                  month: 'short', 
                  year: 'numeric' 
                })}
              </Badge>
            </div>
          </div>
          
          <Button variant="outline" size="icon">
            <Edit size={16} />
          </Button>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">0</div>
            <p className="text-xs text-muted-foreground">Trips</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-success">₹0</div>
            <p className="text-xs text-muted-foreground">Saved</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">100%</div>
            <p className="text-xs text-muted-foreground">Green Score</p>
          </div>
        </div>
      </Card>

      {/* Menu Items */}
      <div className="space-y-3 mb-6">
        {menuItems.map((item) => (
          <Card key={item.label} className="p-4 cursor-pointer hover:shadow-card transition-all duration-200">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <item.icon size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">{item.label}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Logout */}
      <Button 
        onClick={handleSignOut}
        variant="outline" 
        className="w-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
      >
        <LogOut size={16} className="mr-2" />
        Sign Out
      </Button>
    </div>
  );
}