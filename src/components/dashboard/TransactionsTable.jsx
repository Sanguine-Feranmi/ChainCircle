import { mockTransactions } from "../../data/mockData";

const statusColors = {
  Confirmed: "bg-green-500/10 text-green-400 border-green-500/20",
  Pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Failed: "bg-red-500/10 text-red-400 border-red-500/20",
};

const typeColors = {
  Send: "text-red-400",
  Receive: "text-green-400",
  Swap: "text-blue-400",
  Buy: "text-violet-400",
};

export default function TransactionsTable() {
  const rows = mockTransactions.slice(0, 5);

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/10">
        <h3 className="text-white font-semibold">Recent Transactions</h3>
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
            {rows.map((tx) => (
              <tr key={tx.hash} className="hover:bg-white/[0.03] transition-colors">
                <td className="px-6 py-4 text-white/60 text-sm font-mono">{tx.hash.slice(0, 10)}…</td>
                <td className={`px-6 py-4 text-sm font-medium ${typeColors[tx.type]}`}>{tx.type}</td>
                <td className="px-6 py-4 text-white text-sm">{tx.amount}</td>
                <td className="px-6 py-4 text-white/60 text-sm">{tx.chain}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[tx.status]}`}>
                    {tx.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-white/40 text-sm">{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
