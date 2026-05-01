import { useState } from "react";
import { DollarSign, Send, Download, Layers, ArrowUpRight, ArrowDownLeft, RefreshCw, CreditCard, X, Plus } from "lucide-react";
import StatCard from "../components/dashboard/StatCard";
import PortfolioChart from "../components/dashboard/PortfolioChart";
import QuickActions from "../components/dashboard/QuickActions";
import ConnectedWallets from "../components/dashboard/ConnectedWallets";
import { useWallet } from "../context/WalletContext";

const statusColors = {
  Confirmed: "bg-green-500/10 text-green-400 border-green-500/20",
  Pending:   "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Failed:    "bg-red-500/10 text-red-400 border-red-500/20",
};
const typeIcon  = { Send: ArrowUpRight, Receive: ArrowDownLeft, Swap: RefreshCw, Buy: CreditCard, "Manual Top-Up": Download };
const typeColor = { Send: "text-red-400", Receive: "text-green-400", Swap: "text-blue-400", Buy: "text-violet-400", "Manual Top-Up": "text-green-400" };

function fmt(n) {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function AddBalanceModal({ onClose }) {
  const { wallets, addBalance } = useWallet();
  const [amount, setAmount] = useState("");
  const [walletId, setWalletId] = useState(wallets[0]?.id ?? "");
  const [err, setErr] = useState("");

  const confirm = () => {
    const n = parseFloat(amount);
    if (!n || n <= 0) { setErr("Enter a valid positive amount."); return; }
    if (!walletId) { setErr("Select a wallet."); return; }
    addBalance(Number(walletId), n);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-[#13131a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h3 className="text-white font-semibold">Add Balance</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors"><X size={18} /></button>
        </div>
        <div className="p-6 space-y-4">
          {err && <p className="text-red-400 text-xs">{err}</p>}
          <div>
            <label className="text-white/50 text-xs mb-1.5 block">Amount</label>
            <input
              type="number"
              min="0"
              value={amount}
              onChange={(e) => { setAmount(e.target.value); setErr(""); }}
              placeholder="Enter amount"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-violet-500/50 transition-colors"
            />
          </div>
          <div>
            <label className="text-white/50 text-xs mb-1.5 block">Wallet</label>
            {wallets.length === 0 ? (
              <p className="text-white/30 text-sm">No wallets connected. Add a wallet first.</p>
            ) : (
              <select
                value={walletId}
                onChange={(e) => setWalletId(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-violet-500/50 transition-colors"
              >
                {wallets.map((w) => (
                  <option key={w.id} value={w.id} className="bg-[#13131a]">
                    {w.provider} — {w.chain} ({w.address.slice(0, 8)}…)
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 bg-white/5 border border-white/10 text-white/70 hover:text-white text-sm py-2.5 rounded-xl transition-all">
              Cancel
            </button>
            <button
              onClick={confirm}
              disabled={wallets.length === 0}
              className="flex-1 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white text-sm py-2.5 rounded-xl transition-all font-medium"
            >
              Add Balance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecentActivities() {
  const { transactions } = useWallet();
  const recent = transactions.slice(0, 6);

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/10">
        <h3 className="text-white font-semibold">Recent Activities</h3>
      </div>
      {recent.length === 0 ? (
        <p className="text-white/30 text-sm text-center py-12">No transactions yet.</p>
      ) : (
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
      )}
    </div>
  );
}

export default function OverviewPage() {
  const { totalBalance, totalSent, totalReceived, wallets } = useWallet();
  const [showAddBalance, setShowAddBalance] = useState(false);

  const overviewStats = [
    { icon: DollarSign, label: "Total Balance",   value: fmt(totalBalance), color: "violet" },
    { icon: Send,       label: "Total Sent",       value: fmt(totalSent),    color: "orange" },
    { icon: Download,   label: "Total Received",   value: fmt(totalReceived), color: "green" },
    { icon: Layers,     label: "Connected Wallets", value: String(wallets.length), color: "blue" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {overviewStats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Add Balance button — below the cards */}
      <div>
        <button
          onClick={() => setShowAddBalance(true)}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-violet-500/20"
        >
          <Plus size={15} /> Add Balance
        </button>
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

      <RecentActivities />

      {showAddBalance && <AddBalanceModal onClose={() => setShowAddBalance(false)} />}
    </div>
  );
}
