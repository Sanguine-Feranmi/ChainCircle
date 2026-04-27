import { DollarSign, Send, Download, Layers } from "lucide-react";
import StatCard from "../components/dashboard/StatCard";
import PortfolioChart from "../components/dashboard/PortfolioChart";
import TransactionsTable from "../components/dashboard/TransactionsTable";
import QuickActions from "../components/dashboard/QuickActions";
import ConnectedWallets from "../components/dashboard/ConnectedWallets";

const overviewStats = [
  { icon: DollarSign, label: "Total Balance",   value: "$41,652", trend: "+12.5%", trendUp: true,  color: "violet" },
  { icon: Send,       label: "Total Sent",       value: "$8,240",  trend: "-3.2%",  trendUp: false, color: "orange" },
  { icon: Download,   label: "Total Received",   value: "$14,890", trend: "+8.1%",  trendUp: true,  color: "green"  },
  { icon: Layers,     label: "Active Chains",    value: "3",       trend: "+1",     trendUp: true,  color: "blue"   },
];

export default function OverviewPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {overviewStats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2"><PortfolioChart /></div>
        <QuickActions />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2"><TransactionsTable /></div>
        <ConnectedWallets />
      </div>
    </div>
  );
}
