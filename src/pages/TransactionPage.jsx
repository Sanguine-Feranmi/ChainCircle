import { useState } from "react";
import { useWallet } from "../context/WalletContext";
import { Search, Filter, ArrowUpRight, ArrowDownLeft, RefreshCw, CreditCard, Download } from "lucide-react";

const statusColors = {
  Confirmed: "bg-green-500/10 text-green-400 border-green-500/20",
  Pending:   "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Failed:    "bg-red-500/10 text-red-400 border-red-500/20",
};

const typeIcon  = { Send: ArrowUpRight, Receive: ArrowDownLeft, Swap: RefreshCw, Buy: CreditCard, "Manual Top-Up": Download };
const typeColor = { Send: "text-red-400", Receive: "text-green-400", Swap: "text-blue-400", Buy: "text-violet-400", "Manual Top-Up": "text-green-400" };

const filters = ["All", "Send", "Receive", "Swap", "Buy", "Manual Top-Up"];

export default function TransactionPage() {
  const { transactions } = useWallet();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = transactions.filter((tx) => {
    const matchType   = activeFilter === "All" || tx.type === activeFilter;
    const matchSearch = tx.hash.includes(search) || tx.chain.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const counts = {
    total:     transactions.length,
    confirmed: transactions.filter((t) => t.status === "Confirmed").length,
    pending:   transactions.filter((t) => t.status === "Pending").length,
    failed:    transactions.filter((t) => t.status === "Failed").length,
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Transactions</h2>
        <p className="text-white/40 text-sm mt-1">Full history of all on-chain activity across your wallets.</p>
      </div>

      {/* Summary chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total",     value: counts.total,     color: "violet" },
          { label: "Confirmed", value: counts.confirmed, color: "green"  },
          { label: "Pending",   value: counts.pending,   color: "yellow" },
          { label: "Failed",    value: counts.failed,    color: "red"    },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
            <div className={`text-2xl font-bold mb-1 ${
              color === "violet" ? "text-violet-400" :
              color === "green"  ? "text-green-400"  :
              color === "yellow" ? "text-yellow-400" : "text-red-400"
            }`}>{value}</div>
            <div className="text-white/40 text-xs">{label}</div>
          </div>
        ))}
      </div>

      {/* Filters + search */}
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="flex gap-1 bg-white/5 border border-white/10 rounded-xl p-1 flex-wrap">
          {filters.map((f) => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeFilter === f ? "bg-violet-600 text-white" : "text-white/50 hover:text-white"
              }`}>
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 flex-1 max-w-xs">
          <Search size={14} className="text-white/40 flex-shrink-0" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search hash or chain…"
            className="bg-transparent text-white/70 text-sm outline-none w-full placeholder:text-white/30" />
        </div>
        <button className="flex items-center gap-2 bg-white/5 border border-white/10 text-white/60 hover:text-white text-sm px-4 py-2 rounded-xl transition-all">
          <Filter size={14} /> Filter
        </button>
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
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
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-white/30 text-sm">No transactions found.</td>
                </tr>
              ) : filtered.map((tx) => {
                const Icon = typeIcon[tx.type] ?? ArrowUpRight;
                return (
                  <tr key={tx.hash} className="hover:bg-white/[0.03] transition-colors">
                    <td className="px-6 py-4 text-white/50 text-sm font-mono">{tx.hash.slice(0, 12)}…</td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1.5 text-sm font-medium ${typeColor[tx.type] ?? "text-white/60"}`}>
                        <Icon size={13} /> {tx.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white text-sm">{tx.amount}</td>
                    <td className="px-6 py-4 text-white/60 text-sm">{tx.chain}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[tx.status] ?? ""}`}>
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
    </div>
  );
}
