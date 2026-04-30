import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useWallet } from "../../context/WalletContext";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-[#13131a] border border-white/10 rounded-xl px-4 py-3 shadow-xl">
        <p className="text-white/50 text-xs mb-1">{label}</p>
        <p className="text-white font-bold">${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

function fmt(n) {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function PortfolioChart() {
  const { transactions, totalBalance } = useWallet();

  // Build a rolling monthly balance from confirmed transactions
  const chartData = useMemo(() => {
    const now = new Date();
    // Last 7 months
    const months = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (6 - i), 1);
      return {
        date: d.toLocaleString("default", { month: "short" }),
        month: d.getMonth(),
        year: d.getFullYear(),
      };
    });

    // Cumulative balance up to end of each month
    let running = 0;
    return months.map(({ date, month, year }) => {
      const monthTxs = transactions.filter((t) => {
        const d = new Date(t.date);
        return (
          d.getFullYear() < year ||
          (d.getFullYear() === year && d.getMonth() <= month)
        );
      });
      const received = monthTxs
        .filter((t) => t.type === "Receive" || t.type === "Manual Top-Up" || t.type === "Buy")
        .reduce((s, t) => s + (t.amountUsd ?? 0), 0);
      const sent = monthTxs
        .filter((t) => t.type === "Send")
        .reduce((s, t) => s + (t.amountUsd ?? 0), 0);
      running = received - sent;
      return { date, balance: Math.max(0, running) };
    });
  }, [transactions]);

  // Month-over-month change
  const lastTwo = chartData.slice(-2);
  const monthChange = lastTwo.length === 2 && lastTwo[0].balance > 0
    ? (((lastTwo[1].balance - lastTwo[0].balance) / lastTwo[0].balance) * 100).toFixed(1)
    : null;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-semibold">Portfolio Value</h3>
          <p className="text-white/40 text-sm">Balance over time</p>
        </div>
        <div className="text-right">
          <div className="text-white font-bold text-xl">{fmt(totalBalance)}</div>
          {monthChange !== null ? (
            <div className={`text-sm ${parseFloat(monthChange) >= 0 ? "text-green-400" : "text-red-400"}`}>
              {parseFloat(monthChange) >= 0 ? "+" : ""}{monthChange}% this month
            </div>
          ) : (
            <div className="text-white/30 text-sm">No activity yet</div>
          )}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="date" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="balance" stroke="#8b5cf6" strokeWidth={2} fill="url(#balanceGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
