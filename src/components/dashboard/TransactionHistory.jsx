import { useState } from "react";
import { ArrowUpRight, ArrowDownLeft, RefreshCw, CreditCard, Download, Filter, Search } from "lucide-react";
import { useWallet } from "../../context/WalletContext";

const statusColors = {
  Confirmed: "bg-green-500/10 text-green-400 border-green-500/20",
  Pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Failed: "bg-red-500/10 text-red-400 border-red-500/20",
  Completed: "bg-green-500/10 text-green-400 border-green-500/20",
};

const typeIcon = { 
  Send: ArrowUpRight, 
  Receive: ArrowDownLeft, 
  Swap: RefreshCw, 
  Buy: CreditCard, 
  "Manual Top-Up": Download 
};

const typeColor = { 
  Send: "text-red-400", 
  Receive: "text-green-400", 
  Swap: "text-blue-400", 
  Buy: "text-violet-400", 
  "Manual Top-Up": "text-green-400" 
};

export default function TransactionHistory({ mode = "full" }) {
  const { transactions } = useWallet();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredTransactions = transactions.filter(tx => {
    const matchesFilter = filter === "all" || tx.type.toLowerCase() === filter.toLowerCase();
    const matchesSearch = search === "" || 
      tx.hash.toLowerCase().includes(search.toLowerCase()) ||
      tx.type.toLowerCase().includes(search.toLowerCase()) ||
      tx.chain.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const displayTransactions = mode === "condensed" ? filteredTransactions.slice(0, 5) : filteredTransactions;

  if (mode === "condensed") {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h3 className="text-white font-semibold">Recent Activity</h3>
        </div>
        {displayTransactions.length === 0 ? (
          <p className="text-white/30 text-sm text-center py-8">No transactions yet.</p>
        ) : (
          <div className="divide-y divide-white/5">
            {displayTransactions.map((tx) => {
              const Icon = typeIcon[tx.type] ?? ArrowUpRight;
              return (
                <div key={tx.hash} className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.03] transition-colors">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${typeColor[tx.type]} bg-white/5`}>
                    <Icon size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-medium">{tx.type}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[tx.status]}`}>
                        {tx.status}
                      </span>
                    </div>
                    <div className="text-white/40 text-xs">{tx.chain} • {tx.date}</div>
                  </div>
                  <div className="text-white text-sm font-medium">{tx.amount}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-white font-semibold">Transaction History</h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
              <Search size={14} className="text-white/30" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search transactions..."
                className="bg-transparent text-white text-sm outline-none w-32 placeholder:text-white/30"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none"
            >
              <option value="all" className="bg-[#13131a]">All Types</option>
              <option value="send" className="bg-[#13131a]">Send</option>
              <option value="receive" className="bg-[#13131a]">Receive</option>
              <option value="swap" className="bg-[#13131a]">Swap</option>
              <option value="buy" className="bg-[#13131a]">Buy</option>
            </select>
          </div>
        </div>
      </div>

      {displayTransactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
            <ArrowUpRight size={20} className="text-white/30" />
          </div>
          <div className="text-center">
            <p className="text-white/50 text-sm font-medium">No transactions found</p>
            <p className="text-white/25 text-xs mt-1">
              {search || filter !== "all" ? "Try adjusting your filters" : "Your transactions will appear here"}
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-3 text-left text-white/40 text-xs font-medium uppercase tracking-wider">Hash</th>
                <th className="px-6 py-3 text-left text-white/40 text-xs font-medium uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-white/40 text-xs font-medium uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-white/40 text-xs font-medium uppercase tracking-wider">Chain</th>
                <th className="px-6 py-3 text-left text-white/40 text-xs font-medium uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-white/40 text-xs font-medium uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {displayTransactions.map((tx) => {
                const Icon = typeIcon[tx.type] ?? ArrowUpRight;
                return (
                  <tr key={tx.hash} className="hover:bg-white/[0.03] transition-colors">
                    <td className="px-6 py-4 text-white/60 text-sm font-mono">{tx.hash.slice(0, 10)}…</td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1.5 text-sm font-medium ${typeColor[tx.type]}`}>
                        <Icon size={13} /> {tx.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white text-sm font-medium">{tx.amount}</td>
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