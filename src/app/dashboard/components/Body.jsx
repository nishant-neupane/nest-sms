import { useEffect, useState } from "react";
import { DisclosureCard } from "./DisclosureCard";
import { PromoCard } from "./PromoCard";
import { SenderIDCard } from "./SenderIDCard";
import { SplitStatCard } from "./SplitStatCard";
import { StatCard } from "./StatCard";
import { TierProgress } from "./TierProgress";
import { UsersOverview } from "./UsersOverview";
import { WeeklyAnalysisChart } from "./WeeklyAnalysisChart";
import { contacts, fetchGroup, getWalletBalance } from "../../../services/api";

const Body = () => {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  const [contactCount, setContactCount] = useState(0);
  const [groupCount, setGroupCount] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const walletData = await getWalletBalance();
      if (walletData) setWallet(walletData);

      const contactsData = await contacts();
      if (contactsData?.data?.contacts) {
        setContactCount(contactsData.data.contacts.length);
      } else {
        setContactCount(0);
      }

      const resGroup = await fetchGroup();
      if (resGroup.ok) {
        const groupData = await resGroup.json();
        setGroupCount(groupData.groups?.length || 0);
      } else {
        setGroupCount(0);
      }

      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
      <div className="xl:col-span-2 2xl:col-span-3 space-y-2">
        <div className="grid sm:grid-cols-3 gap-2">
          <StatCard
            title="Current Balance"
            value={loading ? "xxx.xx" : ` ${wallet.balance}`}
            subtitle="Increase from last month"
            gradient={true}
            icon={true}
          />

          <SplitStatCard
            title="Contacts"
            leftValue={contactCount}
            leftLabel="Individual"
            rightValue={groupCount}
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

        <div className="grid sm:grid-cols-3 gap-2">
          <UsersOverview />
          <TierProgress />
        </div>
      </div>

      <div className="space-y-2">
        <DisclosureCard />
        <PromoCard />
      </div>
    </div>
  );
};

export default Body;
