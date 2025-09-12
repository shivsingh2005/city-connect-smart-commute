import StepTracker from "@/components/rewards/StepTracker";
import OffersGrid from "@/components/rewards/OffersGrid";

export default function RewardsTab() {
  return (
    <div className="pb-20 px-4 pt-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Rewards & Offers</h1>
        <p className="text-muted-foreground">Earn rewards and save more on lifestyle</p>
      </div>

      {/* Step Tracker */}
      <div className="mb-6">
        <StepTracker />
      </div>

      {/* Offers */}
      <OffersGrid />
    </div>
  );
}