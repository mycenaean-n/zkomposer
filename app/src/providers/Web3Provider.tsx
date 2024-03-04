'use client';
import { WagmiProvider, createConfig } from 'wagmi';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { arbitrumSepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID!,

    chains: [arbitrumSepolia],
    ssr: true,
    // Required
    appName: 'zKubes',

    // Optional
    appDescription: 'P2P Grid Based ZK On-Chain Game',
  })
);

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider theme="retro">{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
