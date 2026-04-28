import { DollarSign, Send, Download, Layers, ArrowUpRight, ArrowDownLeft, RefreshCw, CreditCard } from "lucide-react";
import StatCard from "../components/dashboard/StatCard";
import PortfolioChart from "../components/dashboard/PortfolioChart";
import QuickActions from "../components/dashboard/QuickActions";
import ConnectedWallets from "../components/dashboard/ConnectedWallets";
import { mockTransactions } from "../data/mockData";

const overviewStats = [
  { icon: DollarSign, label: "Total Balance",   value: "$41,652", trend: "+12.5%", trendUp: true,  color: "violet" },
  { icon: Send,       label: "Total Sent",       value: "$8,240",  trend: "-3.2%",  trendUp: false, color: "orange" },
  { icon: Download,   label: "Total Received",   value: "$14,890", trend: "+8.1%",  trendUp: true,  color: "green"  },
  { icon: Layers,     label: "Active Chains",    value: "3",       trend: "+1",     trendUp: true,  color: "blue"   },
];

const statusColors = {
  Confirmed: "bg-green-500/10 text-green-400 border-green-500/20",
  Pending:   "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Failed:    "bg-red-500/10 text-red-400 border-red-500/20",
};

const typeIcon  = { Send: ArrowUpRight, Receive: ArrowDownLeft, Swap: RefreshCw, Buy: CreditCard };
const typeColor = { Send: "text-red-400", Receive: "text-green-400", Swap: "text-blue-400", Buy: "text-violet-400" };

// Reactive: always takes the last 6 from the source array
function RecentActivities() {
  const recent = mockTransactions.slice(0, 6);

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/10">
        <h3 className="text-white font-semibold">Recent Activities</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              {["Hash", "Type", "Amount", "Chain", "Status", "Date"].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-white/40 text-xs font-medium uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {recent.map((tx) => {
              const Icon = typeIcon[tx.type] ?? ArrowUpRight;
              return (
                <tr key={tx.hash} className="hover:bg-white/[0.03] transition-colors">
                  <td className="px-6 py-4 text-white/60 text-sm font-mono">{tx.hash.slice(0, 10)}…</td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 text-sm font-medium ${typeColor[tx.type]}`}>
                      <Icon size={13} /> {tx.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white text-sm">{tx.amount}</td>
                  <td className="px-6 py-4 text-white/60 text-sm">{tx.chain}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[tx.status]}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white/40 text-sm">{tx.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function OverviewPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {overviewStats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Chart + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2"><PortfolioChart /></div>
        <QuickActions />
      </div>

      {/* Connected wallets */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2" />
        <ConnectedWallets />
      </div>

      {/* Recent Activities — last 6 transactions */}
      <RecentActivities />
    </div>
  );
}
