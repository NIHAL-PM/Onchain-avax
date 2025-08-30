export const CONTRACT_ADDRESS = "0xd8540A08f770BAA3b66C4d43728CDBDd1d7A9c3b"; // your deployed address

export const AVAX_FUJI_CHAIN = {
  id: 43113,
  name: "Avalanche Fuji Testnet",
  network: "avaxFuji",
  nativeCurrency: {
    name: "Avalanche",
    symbol: "AVAX",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://api.avax-test.network/ext/bc/C/rpc"],
    },
    public: {
      http: ["https://api.avax-test.network/ext/bc/C/rpc"],
    },
  },
  blockExplorers: {
    default: { name: "SnowTrace", url: "https://testnet.snowtrace.io" },
    etherscan: { name: "SnowTrace", url: "https://testnet.snowtrace.io" },
  },
  testnet: true,
};
