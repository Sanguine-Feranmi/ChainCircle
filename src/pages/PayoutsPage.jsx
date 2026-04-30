import { Banknote, Clock, CheckCircle, XCircle, ArrowDownToLine } from "lucide-react";
import { useWallet } from "../context/WalletContext";

const statusIcon  = { Completed: CheckCircle, Pending: Clock, Failed: XCircle, Confirmed: CheckCircle };
const statusColor = {
  Completed: "text-green-400 bg-green-500/10 border-green-500/20",
  Confirmed: "text-green-400 bg-green-500/10 border-green-500/20",
  Pending:   "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  Failed:    "text-red-400 bg-red-500/10 border-red-500/20",
};

function fmt(n) {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function PayoutsPage() {
  const { transactions, totalPaidOut, totalPending, thisMonthTotal } = useWallet();

  // Show Send + Manual Top-Up transactions as payout history
  const payouts = transactions.filter((t) => t.type === "Send" || t.type === "Manual Top-Up");

  const summaryCards = [
    { label: "Total Paid Out", value: fmt(totalPaidOut),   icon: Banknote,        color: "violet" },
    { label: "Pending",        value: fmt(totalPending),   icon: Clock,           color: "orange" },
    { label: "This Month",     value: fmt(thisMonthTotal), icon: ArrowDownToLine, color: "green"  },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Payouts</h2>
        <p className="text-white/40 text-sm mt-1">Track all outgoing payments to your Circle members.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {summaryCards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
              color === "violet" ? "bg-violet-500/10 text-violet-400" :
              color === "orange" ? "bg-orange-500/10 text-orange-400" :
                                   "bg-green-500/10 text-green-400"
            }`}>
              <Icon size={18} />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{value}</div>
            <div className="text-white/40 text-sm">{label}</div>
          </div>
        ))}
      </div>

      {/* Payouts table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-white font-semibold">Payout History</h3>
          <button className="flex items-center gap-2 text-violet-400 hover:text-violet-300 text-sm transition-colors">
            <ArrowDownToLine size={14} /> Export
          </button>
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
              {payouts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-white/30 text-sm">No payouts yet.</td>
                </tr>
              ) : payouts.map((p) => {
                const Icon = statusIcon[p.status] ?? CheckCircle;
                return (
                  <tr key={p.hash} className="hover:bg-white/[0.03] transition-colors">
                    <td className="px-6 py-4 text-white/50 text-sm font-mono">{p.hash.slice(0, 12)}…</td>
                    <td className="px-6 py-4 text-white text-sm">{p.type}</td>
                    <td className="px-6 py-4 text-white font-semibold text-sm">{p.amount}</td>
                    <td className="px-6 py-4 text-white/60 text-sm">{p.chain}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusColor[p.status] ?? ""}`}>
                        <Icon size={11} /> {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white/40 text-sm">{p.date}</td>
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
