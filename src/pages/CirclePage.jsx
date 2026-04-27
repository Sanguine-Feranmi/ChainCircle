import { useState } from "react";
import { Users, BarChart2, Wallet, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import PortfolioChart from "../components/dashboard/PortfolioChart";
import ConnectedWallets from "../components/dashboard/ConnectedWallets";

const tabs = [
  { id: "overview", label: "Overview",  icon: Users },
  { id: "analytics", label: "Analytics", icon: BarChart2 },
  { id: "wallet",    label: "Wallet",    icon: Wallet },
];

const circleMembers = [
  { name: "Jordan Lee",   role: "Admin",  avatar: "JL", status: "active",   contribution: "$4,200" },
  { name: "Sam Rivera",   role: "Member", avatar: "SR", status: "active",   contribution: "$2,800" },
  { name: "Taylor Kim",   role: "Member", avatar: "TK", status: "pending",  contribution: "$1,500" },
  { name: "Morgan Blake", role: "Member", avatar: "MB", status: "inactive", contribution: "$900"   },
];

const analyticsStats = [
  { label: "Circle Volume (30d)", value: "$128,400", change: "+18.4%", up: true },
  { label: "Avg. Transaction",    value: "$340",      change: "+5.2%",  up: true },
  { label: "Failed Txns",         value: "3",         change: "-40%",   up: true },
  { label: "Gas Saved",           value: "$214",      change: "+22%",   up: true },
];

function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Members", value: "4", icon: Users, color: "violet" },
          { label: "Circle Balance", value: "$9,400", icon: Wallet, color: "blue" },
          { label: "Active Since", value: "Jan 2025", icon: TrendingUp, color: "green" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
              color === "violet" ? "bg-violet-500/10 text-violet-400" :
              color === "blue"   ? "bg-blue-500/10 text-blue-400" :
                                   "bg-green-500/10 text-green-400"
            }`}>
              <Icon size={18} />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{value}</div>
            <div className="text-white/40 text-sm">{label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h3 className="text-white font-semibold">Circle Members</h3>
        </div>
        <div className="divide-y divide-white/5">
          {circleMembers.map((m) => (
            <div key={m.name} className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.03] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {m.avatar}
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{m.name}</div>
                  <div className="text-white/40 text-xs">{m.role}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-white/70 text-sm">{m.contribution}</span>
                <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
                  m.status === "active"   ? "bg-green-500/10 text-green-400 border-green-500/20" :
                  m.status === "pending"  ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
                                            "bg-white/5 text-white/30 border-white/10"
                }`}>
                  {m.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnalyticsTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {analyticsStats.map(({ label, value, change, up }) => (
          <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className={`flex items-center gap-1 text-xs font-medium mb-3 ${up ? "text-green-400" : "text-red-400"}`}>
              {up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {change}
            </div>
            <div className="text-2xl font-bold text-white mb-1">{value}</div>
            <div className="text-white/40 text-sm">{label}</div>
          </div>
        ))}
      </div>
      <PortfolioChart />
    </div>
  );
}

export default function CirclePage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">My Circle</h2>
        <p className="text-white/40 text-sm mt-1">Manage your trusted group, view analytics and connected wallets.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white/5 border border-white/10 rounded-xl p-1 w-fit">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === id
                ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20"
                : "text-white/50 hover:text-white"
            }`}>
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "overview"  && <OverviewTab />}
      {activeTab === "analytics" && <AnalyticsTab />}
      {activeTab === "wallet"    && (
        <div className="space-y-4">
          <p className="text-white/40 text-sm">Wallets connected to your Circle.</p>
          <ConnectedWallets />
        </div>
      )}
    </div>
  );
}
