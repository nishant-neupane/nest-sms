import { DisclosureCard } from "./DisclosureCard";
import { PromoCard } from "./PromoCard";
import { SenderIDCard } from "./SenderIDCard";
import { SplitStatCard } from "./SplitStatCard";
import { StatCard } from "./StatCard";
import { TierProgress } from "./TierProgress";
import { UsersOverview } from "./UsersOverview";
import { WeeklyAnalysisChart } from "./WeeklyAnalysisChart";

const Body = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      <div className="xl:col-span-2 2xl:col-span-3 space-y-6">
        <div className="grid sm:grid-cols-3 gap-2">
          <StatCard
            title="Current Balance"
            value="20,000"
            subtitle="Increase from last month"
            gradient={true}
            icon={true}
          />
          <SplitStatCard
            title="Contacts"
            leftValue="720"
            leftLabel="Individual"
            rightValue="120"
            rightLabel="Group"
          />
          <StatCard
            title="SMS sent this month"
            value="220"
            subtitle="Increase from last month"
            icon={true}
          />
        </div>

        <div className="grid grid-cols-3 gap-2 items-stretch">
          <WeeklyAnalysisChart />
          <SenderIDCard />
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          <UsersOverview />
          <TierProgress />
        </div>
      </div>

      <div className="space-y-4">
        <DisclosureCard />
        <PromoCard />
      </div>
    </div>
  );
};

export default Body;
