"use client";

import { ReactNode } from "react";
import { WagmiProvider, http } from "wagmi";
import { avalancheFuji } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";

// Import RainbowKit styles
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: "OnchainSIP",
  projectId: "e64f9452181aabc5712f9288d93d41cd",
  chains: [avalancheFuji],
  transports: {
    [avalancheFuji.id]: http(),
  },
  // Add SSR support
  ssr: true,
});

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          // Fixed: Removed invalid props and kept only valid ones
          showRecentTransactions={true}
          modalSize="compact"
          initialChain={avalancheFuji}
          // Removed 'chains' prop as it doesn't exist on RainbowKitProvider
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
