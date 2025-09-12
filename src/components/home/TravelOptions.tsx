import { Car, Bus, Train, Bike } from "lucide-react";
import { Card } from "@/components/ui/card";

const travelOptions = [
  {
    id: "cab",
    name: "Cab",
    icon: Car,
    description: "Uber, Ola, Rapido",
    color: "bg-gradient-primary text-primary-foreground",
  },
  {
    id: "bus",
    name: "Bus",
    icon: Bus,
    description: "City & Private",
    color: "bg-accent/10 text-accent border border-accent/20",
  },
  {
    id: "metro",
    name: "Metro",
    icon: Train,
    description: "Fast & Reliable",
    color: "bg-success/10 text-success border border-success/20",
  },
  {
    id: "bike",
    name: "Bike",
    icon: Bike,
    description: "Rapido, Uber",
    color: "bg-warning/10 text-warning border border-warning/20",
  },
];

interface TravelOptionsProps {
  onOptionSelect: (option: string) => void;
}

export default function TravelOptions({ onOptionSelect }: TravelOptionsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Quick Book</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {travelOptions.map((option) => (
          <Card
            key={option.id}
            className={`p-4 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-glow ${option.color}`}
            onClick={() => onOptionSelect(option.id)}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <option.icon size={32} />
              <div>
                <h4 className="font-semibold">{option.name}</h4>
                <p className="text-xs opacity-80">{option.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}