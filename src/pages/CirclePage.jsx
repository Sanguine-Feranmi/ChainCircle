import { useState } from "react";
import {
  Users, BarChart2, Wallet, TrendingUp, ArrowUpRight, ArrowDownRight,
  Search, Pin, MoreHorizontal, Plus, X, Loader2, Copy, ExternalLink, Trash2,
  Shield, Zap, Globe, Smartphone,
} from "lucide-react";
import PortfolioChart from "../components/dashboard/PortfolioChart";
import { useWallet } from "../context/WalletContext";
import CreateCircleModal from "../components/dashboard/CreateCircleModal";

// ─────────────────────────────────────────────
// Mock data
// ─────────────────────────────────────────────
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



const walletProviders = [
  { id: "metamask",   name: "MetaMask",        icon: Shield,      desc: "Browser extension wallet" },
  { id: "walletconnect", name: "WalletConnect", icon: Globe,       desc: "Connect via QR code" },
  { id: "coinbase",   name: "Coinbase Wallet",  icon: Zap,         desc: "Coinbase's self-custody wallet" },
  { id: "trust",      name: "Trust Wallet",     icon: Smartphone,  desc: "Mobile-first wallet" },
];

// ─────────────────────────────────────────────
// Circle card (shared between list and preview)
// ─────────────────────────────────────────────
export function CircleCard({ circle, menuOpen, onMenuToggle }) {
  return (
    <div
      className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4
                 hover:border-violet-500/20 hover:bg-white/[0.07] transition-all"
    >
      <div className={`w-11 h-11 bg-gradient-to-br ${circle.color} rounded-full flex items-center justify-center text-lg flex-shrink-0`}>
        {circle.icon}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold text-sm mb-2">{circle.name}</p>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500"
              style={{ width: `${circle.progress}%` }}
            />
          </div>
          <span className="text-white/50 text-xs flex-shrink-0">{circle.progress}%</span>
        </div>
      </div>

      <span className={`text-xs px-3 py-1 rounded-full border font-medium flex-shrink-0 ${
        circle.status === "On track"
          ? "text-green-400 border-green-500/30 bg-green-500/5"
          : "text-fuchsia-400 border-fuchsia-500/30 bg-fuchsia-500/5"
      }`}>
        {circle.status}
      </span>

      {circle.pinned && <Pin size={14} className="text-violet-400 flex-shrink-0" />}

      <div className="relative flex-shrink-0">
        <button
          onClick={() => onMenuToggle?.(circle.id)}
          className="p-1.5 text-white/30 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
        >
          <MoreHorizontal size={16} />
        </button>
        {menuOpen === circle.id && (
          <div className="absolute right-0 top-8 w-40 bg-[#13131a] border border-white/10 rounded-xl shadow-xl z-20 overflow-hidden">
            {["View Details", "Edit Circle", "Leave Circle"].map((opt) => (
              <button key={opt} onClick={() => onMenuToggle?.(null)}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  opt === "Leave Circle"
                    ? "text-red-400 hover:bg-red-500/10"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}>
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// My Circles tab
// ─────────────────────────────────────────────
function MyCirclesTab({ circles, onAddCircle }) {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(null);

  const filtered = circles.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative space-y-5 pb-20">
      {/* Header row */}
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-white font-semibold text-lg">Active Circles</h3>
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 w-56">
          <Search size={13} className="text-white/30 flex-shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a circle"
            className="bg-transparent text-white/70 text-sm outline-none w-full placeholder:text-white/30"
          />
        </div>
      </div>

      {/* Empty state */}
      {circles.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4 bg-white/[0.02] border border-white/5 rounded-2xl">
          <div className="w-16 h-16 bg-fuchsia-500/10 rounded-2xl flex items-center justify-center">
            <Users size={28} className="text-fuchsia-400/50" />
          </div>
          <div className="text-center">
            <p className="text-white/50 text-sm font-medium">No circles yet</p>
            <p className="text-white/25 text-xs mt-1">Tap the + button to create your first circle</p>
          </div>
        </div>
      )}

      {/* Circle list */}
      {circles.length > 0 && (
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <p className="text-white/30 text-sm text-center py-10">No circles found.</p>
          ) : (
            filtered.map((circle) => (
              <CircleCard
                key={circle.id}
                circle={circle}
                menuOpen={menuOpen}
                onMenuToggle={(id) => setMenuOpen(menuOpen === id ? null : id)}
              />
            ))
          )}
        </div>
      )}

      {/* FAB */}
      <button
        onClick={onAddCircle}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-fuchsia-600 to-violet-600
                   hover:from-fuchsia-500 hover:to-violet-500 rounded-2xl flex items-center justify-center
                   shadow-2xl shadow-fuchsia-500/30 transition-all hover:scale-105 z-30"
      >
        <Plus size={24} className="text-white" />
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
// Overview tab (unchanged)
// ─────────────────────────────────────────────
function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Members", value: "4",        icon: Users,      color: "violet" },
          { label: "Circle Balance", value: "$9,400",  icon: Wallet,     color: "blue"   },
          { label: "Active Since",   value: "Jan 2025", icon: TrendingUp, color: "green"  },
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
                  m.status === "active"  ? "bg-green-500/10 text-green-400 border-green-500/20" :
                  m.status === "pending" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
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

// ─────────────────────────────────────────────
// Analytics tab (unchanged)
// ─────────────────────────────────────────────
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

// ─────────────────────────────────────────────
// Wallet connect modal
// ─────────────────────────────────────────────
function WalletModal({ onClose }) {
  const { connecting, error, setError, connectMetaMask, connectMock } = useWallet();

  const handleConnect = async (providerId) => {
    if (providerId === "metamask") {
      await connectMetaMask();
    } else {
      const names = { walletconnect: "WalletConnect", coinbase: "Coinbase Wallet", trust: "Trust Wallet" };
      connectMock(names[providerId]);
    }
    // Close on success (error stays open so user can see it)
    if (!error) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-sm bg-[#13131a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h3 className="text-white font-semibold">Connect Wallet</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mx-4 mt-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        {/* Provider list */}
        <div className="p-4 space-y-2">
          {walletProviders.map(({ id, name, icon: Icon, desc }) => (
            <button
              key={id}
              onClick={() => { setError(null); handleConnect(id); }}
              disabled={connecting}
              className="w-full flex items-center gap-4 px-4 py-3.5 bg-white/5 border border-white/10
                         rounded-xl hover:border-violet-500/40 hover:bg-white/[0.08] transition-all
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="w-9 h-9 bg-violet-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                {connecting ? <Loader2 size={18} className="text-violet-400 animate-spin" /> : <Icon size={18} className="text-violet-400" />}
              </div>
              <div className="text-left">
                <p className="text-white text-sm font-medium">{name}</p>
                <p className="text-white/40 text-xs">{desc}</p>
              </div>
            </button>
          ))}
        </div>

        <p className="text-white/20 text-xs text-center pb-4">
          By connecting, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Wallet tab — connect flow
// ─────────────────────────────────────────────
function WalletTab() {
  const { wallets, removeWallet } = useWallet();
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied]       = useState(null);

  const copy = (addr, id) => {
    navigator.clipboard.writeText(addr);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  const truncAddr = (addr) => `${addr.slice(0, 8)}…${addr.slice(-6)}`;

  return (
    <div className="space-y-5">
      {/* Add wallet button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold">Connected Wallets</h3>
          <p className="text-white/40 text-xs mt-0.5">{wallets.length} wallet{wallets.length !== 1 ? "s" : ""} connected</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm
                     px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-violet-500/20"
        >
          <Plus size={15} /> Add Wallet
        </button>
      </div>

      {/* Empty state */}
      {wallets.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 gap-4 bg-white/[0.02] border border-white/5 rounded-2xl">
          <div className="w-16 h-16 bg-violet-500/10 rounded-2xl flex items-center justify-center">
            <Wallet size={28} className="text-violet-400/50" />
          </div>
          <div className="text-center">
            <p className="text-white/50 text-sm font-medium">No wallets connected</p>
            <p className="text-white/25 text-xs mt-1">Click "Add Wallet" to connect your first wallet</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm px-5 py-2.5 rounded-xl transition-all"
          >
            <Plus size={15} /> Connect Wallet
          </button>
        </div>
      )}

      {/* Wallet cards */}
      {wallets.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wallets.map((w) => (
            <div key={w.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-violet-500/30 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-violet-500/10 rounded-lg flex items-center justify-center">
                    <Wallet size={15} className="text-violet-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{w.provider}</p>
                    <p className="text-white/40 text-xs">{w.chain}</p>
                  </div>
                </div>
                <button onClick={() => removeWallet(w.id)} className="text-white/20 hover:text-red-400 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="flex items-center gap-1.5 mb-3">
                <span className="text-white/50 text-xs font-mono">{truncAddr(w.address)}</span>
                <button onClick={() => copy(w.address, w.id)} className="text-white/30 hover:text-violet-400 transition-colors">
                  <Copy size={11} />
                </button>
                {copied === w.id && <span className="text-green-400 text-xs">Copied!</span>}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-white font-bold text-sm">{w.balance}</div>
                <button className="text-white/30 hover:text-violet-400 transition-colors">
                  <ExternalLink size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && <WalletModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

// ─────────────────────────────────────────────
// Main CirclePage
// ─────────────────────────────────────────────
const tabs = [
  { id: "mycircles",  label: "My Circles",  icon: Pin       },
  { id: "overview",   label: "Overview",    icon: Users     },
  { id: "analytics",  label: "Analytics",   icon: BarChart2 },
  { id: "wallet",     label: "Wallet",      icon: Wallet    },
];

export default function CirclePage() {
  const [activeTab, setActiveTab] = useState("mycircles");
  const [circles, setCircles] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleAddCircle = () => setShowModal(true);
  const handleCreated = (newCircle) => setCircles((prev) => [newCircle, ...prev]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">My Circle</h2>
        <p className="text-white/40 text-sm mt-1">Manage your trusted group, view analytics and connected wallets.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white/5 border border-white/10 rounded-xl p-1 w-fit overflow-x-auto">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
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
      {activeTab === "mycircles"  && <MyCirclesTab circles={circles} onAddCircle={handleAddCircle} />}
      {activeTab === "overview"   && <OverviewTab />}
      {activeTab === "analytics"  && <AnalyticsTab />}
      {activeTab === "wallet"     && <WalletTab />}

      {showModal && (
        <CreateCircleModal
          onClose={() => setShowModal(false)}
          onCreated={handleCreated}
        />
      )}
    </div>
  );
}
