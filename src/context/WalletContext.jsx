import { createContext, useContext, useState, useMemo } from "react";

const WalletContext = createContext(null);

// ── 150+ coin catalogue ────────────────────────────────────────────────────
export const COIN_LIST = [
  // Major coins
  { symbol: "BTC",   name: "Bitcoin",          price: 67420.00 },
  { symbol: "ETH",   name: "Ethereum",         price: 3540.00  },
  { symbol: "BNB",   name: "BNB",              price: 605.00   },
  { symbol: "SOL",   name: "Solana",           price: 178.00   },
  { symbol: "XRP",   name: "XRP",              price: 0.62     },
  { symbol: "ADA",   name: "Cardano",          price: 0.48     },
  { symbol: "DOGE",  name: "Dogecoin",         price: 0.17     },
  { symbol: "MATIC", name: "Polygon",          price: 0.72     },
  { symbol: "AVAX",  name: "Avalanche",        price: 38.50    },
  { symbol: "DOT",   name: "Polkadot",         price: 7.80     },
  { symbol: "LTC",   name: "Litecoin",         price: 84.20    },
  { symbol: "LINK",  name: "Chainlink",        price: 14.60    },
  { symbol: "UNI",   name: "Uniswap",          price: 10.40    },
  { symbol: "ATOM",  name: "Cosmos",           price: 9.20     },
  { symbol: "XLM",   name: "Stellar",          price: 0.12     },
  { symbol: "ETC",   name: "Ethereum Classic", price: 28.50    },
  { symbol: "FIL",   name: "Filecoin",         price: 5.80     },
  { symbol: "VET",   name: "VeChain",          price: 0.038    },
  { symbol: "THETA", name: "Theta Network",    price: 2.10     },
  { symbol: "TRX",   name: "TRON",             price: 0.13     },
  { symbol: "EOS",   name: "EOS",              price: 0.82     },
  { symbol: "XMR",   name: "Monero",           price: 162.00   },
  { symbol: "ALGO",  name: "Algorand",         price: 0.19     },
  { symbol: "HBAR",  name: "Hedera",           price: 0.11     },
  { symbol: "ICP",   name: "Internet Computer",price: 12.40    },
  { symbol: "NEAR",  name: "NEAR Protocol",    price: 7.20     },
  { symbol: "FTM",   name: "Fantom",           price: 0.78     },
  { symbol: "SAND",  name: "The Sandbox",      price: 0.44     },
  { symbol: "MANA",  name: "Decentraland",     price: 0.38     },
  { symbol: "AXS",   name: "Axie Infinity",    price: 7.60     },
  { symbol: "GALA",  name: "Gala",             price: 0.042    },
  { symbol: "ENJ",   name: "Enjin Coin",       price: 0.28     },
  { symbol: "CHZ",   name: "Chiliz",           price: 0.092    },
  { symbol: "BAT",   name: "Basic Attention",  price: 0.24     },
  { symbol: "ZEC",   name: "Zcash",            price: 28.00    },
  { symbol: "DASH",  name: "Dash",             price: 29.50    },
  { symbol: "NEO",   name: "NEO",              price: 12.80    },
  { symbol: "WAVES", name: "Waves",            price: 2.40     },
  { symbol: "ZIL",   name: "Zilliqa",          price: 0.022    },
  { symbol: "ONT",   name: "Ontology",         price: 0.28     },
  { symbol: "ICX",   name: "ICON",             price: 0.19     },
  { symbol: "QTUM",  name: "Qtum",             price: 3.20     },
  { symbol: "OMG",   name: "OMG Network",      price: 0.62     },
  { symbol: "ZRX",   name: "0x Protocol",      price: 0.44     },
  { symbol: "BAL",   name: "Balancer",         price: 3.80     },
  { symbol: "COMP",  name: "Compound",         price: 52.00    },
  { symbol: "AAVE",  name: "Aave",             price: 92.00    },
  { symbol: "SNX",   name: "Synthetix",        price: 2.80     },
  { symbol: "YFI",   name: "yearn.finance",    price: 6800.00  },
  { symbol: "SUSHI", name: "SushiSwap",        price: 1.20     },
  { symbol: "CRV",   name: "Curve DAO",        price: 0.38     },
  { symbol: "1INCH", name: "1inch Network",    price: 0.42     },
  { symbol: "CAKE",  name: "PancakeSwap",      price: 2.60     },
  { symbol: "RUNE",  name: "THORChain",        price: 5.40     },
  { symbol: "KSM",   name: "Kusama",           price: 28.00    },
  { symbol: "EGLD",  name: "MultiversX",       price: 38.00    },
  { symbol: "FLOW",  name: "Flow",             price: 0.72     },
  { symbol: "HNT",   name: "Helium",           price: 6.20     },
  { symbol: "AR",    name: "Arweave",          price: 22.00    },
  { symbol: "KDA",   name: "Kadena",           price: 0.82     },
  { symbol: "ROSE",  name: "Oasis Network",    price: 0.088    },
  { symbol: "CELO",  name: "Celo",             price: 0.72     },
  { symbol: "ONE",   name: "Harmony",          price: 0.018    },
  { symbol: "KLAY",  name: "Klaytn",           price: 0.19     },
  { symbol: "SKL",   name: "SKALE",            price: 0.062    },
  { symbol: "ANKR",  name: "Ankr",             price: 0.048    },
  { symbol: "OCEAN", name: "Ocean Protocol",   price: 0.62     },
  { symbol: "GRT",   name: "The Graph",        price: 0.18     },
  { symbol: "LRC",   name: "Loopring",         price: 0.22     },
  { symbol: "STORJ", name: "Storj",            price: 0.48     },
  { symbol: "NMR",   name: "Numeraire",        price: 18.00    },
  { symbol: "REN",   name: "Ren",              price: 0.062    },
  { symbol: "BNT",   name: "Bancor",           price: 0.72     },
  { symbol: "KNC",   name: "Kyber Network",    price: 0.68     },
  { symbol: "BAND",  name: "Band Protocol",    price: 1.40     },
  { symbol: "OXT",   name: "Orchid",           price: 0.082    },
  { symbol: "NKN",   name: "NKN",              price: 0.092    },
  { symbol: "CTSI",  name: "Cartesi",          price: 0.18     },
  { symbol: "AUDIO", name: "Audius",           price: 0.14     },
  { symbol: "MASK",  name: "Mask Network",     price: 3.20     },
  { symbol: "DYDX",  name: "dYdX",             price: 1.80     },
  { symbol: "IMX",   name: "Immutable X",      price: 1.60     },
  { symbol: "APE",   name: "ApeCoin",          price: 1.20     },
  { symbol: "GMT",   name: "STEPN",            price: 0.18     },
  { symbol: "OP",    name: "Optimism",         price: 1.80     },
  { symbol: "ARB",   name: "Arbitrum",         price: 0.92     },
  { symbol: "SUI",   name: "Sui",              price: 1.40     },
  { symbol: "APT",   name: "Aptos",            price: 8.20     },
  { symbol: "INJ",   name: "Injective",        price: 22.00    },
  { symbol: "SEI",   name: "Sei",              price: 0.42     },
  { symbol: "TIA",   name: "Celestia",         price: 6.80     },
  { symbol: "PYTH",  name: "Pyth Network",     price: 0.38     },
  { symbol: "JTO",   name: "Jito",             price: 3.20     },
  { symbol: "WIF",   name: "dogwifhat",        price: 2.80     },
  { symbol: "BONK",  name: "Bonk",             price: 0.000028 },
  { symbol: "PEPE",  name: "Pepe",             price: 0.000012 },
  { symbol: "FLOKI", name: "FLOKI",            price: 0.00018  },
  { symbol: "SHIB",  name: "Shiba Inu",        price: 0.000024 },
  { symbol: "LUNC",  name: "Terra Classic",    price: 0.00012  },
  // Stablecoins
  { symbol: "USDT",  name: "Tether",           price: 1.00     },
  { symbol: "USDC",  name: "USD Coin",         price: 1.00     },
  { symbol: "DAI",   name: "Dai",              price: 1.00     },
  { symbol: "BUSD",  name: "Binance USD",      price: 1.00     },
  { symbol: "TUSD",  name: "TrueUSD",          price: 1.00     },
  { symbol: "FRAX",  name: "Frax",             price: 1.00     },
  { symbol: "LUSD",  name: "Liquity USD",      price: 1.00     },
  { symbol: "GUSD",  name: "Gemini Dollar",    price: 1.00     },
  { symbol: "USDP",  name: "Pax Dollar",       price: 1.00     },
  { symbol: "SUSD",  name: "sUSD",             price: 1.00     },
  // More altcoins
  { symbol: "STX",   name: "Stacks",           price: 1.80     },
  { symbol: "CFX",   name: "Conflux",          price: 0.18     },
  { symbol: "MINA",  name: "Mina Protocol",    price: 0.62     },
  { symbol: "IOTA",  name: "IOTA",             price: 0.18     },
  { symbol: "XDC",   name: "XDC Network",      price: 0.048    },
  { symbol: "GLMR",  name: "Moonbeam",         price: 0.18     },
  { symbol: "MOVR",  name: "Moonriver",        price: 12.00    },
  { symbol: "ASTR",  name: "Astar",            price: 0.062    },
  { symbol: "SGB",   name: "Songbird",         price: 0.012    },
  { symbol: "EVMOS", name: "Evmos",            price: 0.048    },
  { symbol: "KAVA",  name: "Kava",             price: 0.62     },
  { symbol: "SCRT",  name: "Secret",           price: 0.38     },
  { symbol: "JUNO",  name: "Juno",             price: 0.28     },
  { symbol: "OSMO",  name: "Osmosis",          price: 0.48     },
  { symbol: "STARS", name: "Stargaze",         price: 0.012    },
  { symbol: "HUAHUA",name: "Chihuahua",        price: 0.0008   },
  { symbol: "NTRN",  name: "Neutron",          price: 0.62     },
  { symbol: "DYM",   name: "Dymension",        price: 2.40     },
  { symbol: "ZETA",  name: "ZetaChain",        price: 0.72     },
  { symbol: "ALT",   name: "AltLayer",         price: 0.18     },
  { symbol: "PIXEL", name: "Pixels",           price: 0.38     },
  { symbol: "PORTAL",name: "Portal",           price: 0.82     },
  { symbol: "STRK",  name: "Starknet",         price: 0.48     },
  { symbol: "MANTA", name: "Manta Network",    price: 1.20     },
  { symbol: "BLAST", name: "Blast",            price: 0.018    },
  { symbol: "MODE",  name: "Mode",             price: 0.028    },
  { symbol: "TAIKO",  name: "Taiko",           price: 1.40     },
  { symbol: "ZK",    name: "ZKsync",           price: 0.12     },
  { symbol: "EIGEN", name: "EigenLayer",       price: 3.20     },
  { symbol: "ENA",   name: "Ethena",           price: 0.38     },
  { symbol: "ETHFI", name: "ether.fi",         price: 1.80     },
  { symbol: "REZ",   name: "Renzo",            price: 0.048    },
  { symbol: "PUFFER",name: "Puffer Finance",   price: 0.28     },
  { symbol: "LISTA", name: "Lista DAO",        price: 0.38     },
  { symbol: "IO",    name: "io.net",           price: 2.80     },
  { symbol: "ZRO",   name: "LayerZero",        price: 3.40     },
  { symbol: "W",     name: "Wormhole",         price: 0.28     },
  { symbol: "ONDO",  name: "Ondo Finance",     price: 0.92     },
  { symbol: "PENDLE",name: "Pendle",           price: 4.20     },
  { symbol: "RDNT",  name: "Radiant Capital",  price: 0.062    },
  { symbol: "GMX",   name: "GMX",              price: 22.00    },
  { symbol: "GNS",   name: "Gains Network",    price: 6.80     },
  { symbol: "VELA",  name: "Vela Exchange",    price: 0.48     },
  { symbol: "KWENTA",name: "Kwenta",           price: 28.00    },
];

// Build default coin holdings for a new wallet (all balances start at 0)
function buildDefaultCoins() {
  return COIN_LIST.map((c) => ({ ...c, balance: 0 }));
}

export function WalletProvider({ children }) {
  const [wallets, setWallets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState(null);

  const primaryWallet = wallets.find((w) => w.type === "primary") ?? wallets[0] ?? null;

  // ── Derived financial values ──────────────────────────────────────────
  const totalBalance = useMemo(
    () => wallets.reduce((sum, w) => sum + (w.balanceUsd ?? 0), 0),
    [wallets]
  );

  const totalSent = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "Send" && t.status === "Confirmed")
        .reduce((sum, t) => sum + (t.amountUsd ?? 0), 0),
    [transactions]
  );

  const totalReceived = useMemo(
    () =>
      transactions
        .filter((t) => (t.type === "Receive" || t.type === "Manual Top-Up") && t.status === "Confirmed")
        .reduce((sum, t) => sum + (t.amountUsd ?? 0), 0),
    [transactions]
  );

  const totalPortfolio = totalBalance;

  const totalPaidOut = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "Send" && t.status === "Completed")
        .reduce((sum, t) => sum + (t.amountUsd ?? 0), 0),
    [transactions]
  );

  const totalPending = useMemo(
    () =>
      transactions
        .filter((t) => t.status === "Pending")
        .reduce((sum, t) => sum + (t.amountUsd ?? 0), 0),
    [transactions]
  );

  const thisMonthTotal = useMemo(() => {
    const now = new Date();
    return transactions
      .filter((t) => {
        const d = new Date(t.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      })
      .reduce((sum, t) => sum + (t.amountUsd ?? 0), 0);
  }, [transactions]);

  // ── Actions ───────────────────────────────────────────────────────────
  const addTransaction = (tx) =>
    setTransactions((prev) => [
      { ...tx, date: tx.date ?? new Date().toISOString().slice(0, 10) },
      ...prev,
    ]);

  const addBalance = (walletId, amount) => {
    const usd = parseFloat(amount);
    if (!usd || usd <= 0) return;
    setWallets((prev) =>
      prev.map((w) =>
        w.id === walletId ? { ...w, balanceUsd: (w.balanceUsd ?? 0) + usd } : w
      )
    );
    addTransaction({
      hash: "0x" + Math.random().toString(16).slice(2, 18),
      type: "Manual Top-Up",
      amount: `+$${usd.toFixed(2)}`,
      amountUsd: usd,
      chain: wallets.find((w) => w.id === walletId)?.chain ?? "—",
      status: "Confirmed",
    });
  };

  const connectMetaMask = async (walletType = "primary") => {
    setError(null);
    setConnecting(true);
    try {
      if (!window.ethereum)
        throw new Error("MetaMask is not installed. Please install the MetaMask extension.");
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const address = accounts[0];
      const chainIdHex = await window.ethereum.request({ method: "eth_chainId" });
      const chainId = parseInt(chainIdHex, 16);
      const chainNames = { 1: "Ethereum", 137: "Polygon", 56: "BNB Chain", 8453: "Base", 42161: "Arbitrum" };
      const chain = chainNames[chainId] ?? `Chain ${chainId}`;
      const balHex = await window.ethereum.request({ method: "eth_getBalance", params: [address, "latest"] });
      const balEth = (parseInt(balHex, 16) / 1e18).toFixed(4);
      const wallet = {
        id: Date.now(),
        address,
        chain,
        balance: `${balEth} ETH`,
        balanceUsd: 0,
        provider: "MetaMask",
        type: walletType,
        coins: buildDefaultCoins(),
      };
      setWallets((prev) => {
        if (prev.find((w) => w.address.toLowerCase() === address.toLowerCase())) return prev;
        return [wallet, ...prev];
      });
    } catch (err) {
      setError(err.message ?? "Failed to connect MetaMask.");
    } finally {
      setConnecting(false);
    }
  };

  const connectMock = (providerName, walletType = "primary") => {
    setError(null);
    setConnecting(true);
    setTimeout(() => {
      const mockAddr = "0x" + Math.random().toString(16).slice(2, 42).padEnd(40, "0");
      const wallet = {
        id: Date.now(),
        address: mockAddr,
        chain: "Ethereum",
        balance: "0.0000 ETH",
        balanceUsd: 0,
        provider: providerName,
        type: walletType,
        coins: buildDefaultCoins(),
      };
      setWallets((prev) => [wallet, ...prev]);
      setConnecting(false);
    }, 1200);
  };

  const removeWallet = (id) => setWallets((prev) => prev.filter((w) => w.id !== id));

  return (
    <WalletContext.Provider
      value={{
        wallets,
        primaryWallet,
        connecting,
        error,
        setError,
        transactions,
        totalBalance,
        totalSent,
        totalReceived,
        totalPortfolio,
        totalPaidOut,
        totalPending,
        thisMonthTotal,
        connectMetaMask,
        connectMock,
        removeWallet,
        addBalance,
        addTransaction,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);
