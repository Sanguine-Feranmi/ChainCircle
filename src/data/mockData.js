export const mockUser = {
  name: "Alex Morgan",
  email: "alex@chaincircle.io",
  avatar: "AM",
  joinDate: "Jan 2024",
};

// mockWallets and mockTransactions removed — all wallet/transaction data
// now lives exclusively in WalletContext (single source of truth).

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
