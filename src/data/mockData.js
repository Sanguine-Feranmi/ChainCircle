export const mockUser = {
  name: "Alex Morgan",
  email: "alex@chaincircle.io",
  avatar: "AM",
  joinDate: "Jan 2024",
};

export const mockWallets = [
  { id: 1, address: "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE", chain: "Ethereum", balance: "4.821 ETH", usd: "$18,432" },
  { id: 2, address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", chain: "Bitcoin", balance: "0.342 BTC", usd: "$22,104" },
  { id: 3, address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", chain: "Polygon", balance: "1,240 MATIC", usd: "$1,116" },
];

export const mockTransactions = [
  { hash: "0xabc123def456", type: "Send", amount: "-0.5 ETH", chain: "Ethereum", status: "Confirmed", date: "2025-07-10" },
  { hash: "0x789xyz012abc", type: "Receive", amount: "+1.2 ETH", chain: "Ethereum", status: "Confirmed", date: "2025-07-09" },
  { hash: "0xdef456ghi789", type: "Swap", amount: "500 MATIC → 0.1 ETH", chain: "Polygon", status: "Confirmed", date: "2025-07-08" },
  { hash: "0x321cba654fed", type: "Send", amount: "-0.02 BTC", chain: "Bitcoin", status: "Pending", date: "2025-07-08" },
  { hash: "0xfed987cba654", type: "Receive", amount: "+0.15 BTC", chain: "Bitcoin", status: "Confirmed", date: "2025-07-07" },
  { hash: "0x111aaa222bbb", type: "Buy", amount: "+200 MATIC", chain: "Polygon", status: "Confirmed", date: "2025-07-06" },
  { hash: "0x333ccc444ddd", type: "Send", amount: "-1.0 ETH", chain: "Ethereum", status: "Failed", date: "2025-07-05" },
  { hash: "0x555eee666fff", type: "Receive", amount: "+0.5 ETH", chain: "Ethereum", status: "Confirmed", date: "2025-07-04" },
  { hash: "0x777ggg888hhh", type: "Swap", amount: "0.1 ETH → 300 MATIC", chain: "Polygon", status: "Confirmed", date: "2025-07-03" },
  { hash: "0x999iii000jjj", type: "Buy", amount: "+0.05 BTC", chain: "Bitcoin", status: "Confirmed", date: "2025-07-02" },
];

export const chartData = [
  { date: "Jan", balance: 12000 },
  { date: "Feb", balance: 19500 },
  { date: "Mar", balance: 15200 },
  { date: "Apr", balance: 28000 },
  { date: "May", balance: 24500 },
  { date: "Jun", balance: 35800 },
  { date: "Jul", balance: 41652 },
];

export const testimonials = [
  {
    name: "Sarah Chen",
    role: "DeFi Investor",
    avatar: "SC",
    quote: "Chain Circle completely transformed how I manage my crypto portfolio. The cross-chain support is unmatched.",
  },
  {
    name: "Marcus Williams",
    role: "Blockchain Developer",
    avatar: "MW",
    quote: "The smart contract integration is seamless. I've cut my gas fees by 40% since switching to Chain Circle.",
  },
  {
    name: "Priya Patel",
    role: "Crypto Trader",
    avatar: "PP",
    quote: "Real-time analytics and the clean dashboard make it the best crypto management platform I've used.",
  },
];

export const stats = [
  { label: "Total Transactions", value: 4820000, suffix: "+" },
  { label: "Active Wallets", value: 128000, suffix: "+" },
  { label: "Supported Chains", value: 24, suffix: "" },
  { label: "Uptime", value: 99.9, suffix: "%" },
];
