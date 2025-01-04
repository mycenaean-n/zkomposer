'use client';
import { PrivyClientConfig, PrivyProvider } from '@privy-io/react-auth';
import { createConfig, WagmiProvider } from '@privy-io/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { defineChain, http } from 'viem';
import { arbitrumSepolia } from 'wagmi/chains';

export const LocalHost = defineChain({
  id: 31337,
  name: 'Localhost',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:8545'],
    },
  },
});

const queryClient = new QueryClient();
const SUPPORTED_CHAINS = [arbitrumSepolia, LocalHost] as const;

export const wagmiConfig = createConfig({
  chains: SUPPORTED_CHAINS,
  transports: {
    [arbitrumSepolia.id]: http(
      `https://arbitrum-sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`
    ),
    ['31337']: http(),
  },
});

const privyConfig = {
  appearance: {
    theme: 'light',
    accentColor: '#676FFF',
  },
  embeddedWallets: {
    createOnLogin: 'users-without-wallets',
  },
  supportedChains:
    SUPPORTED_CHAINS as unknown as PrivyClientConfig['supportedChains'],
  defaultChain: SUPPORTED_CHAINS[0],
} as PrivyClientConfig;

export function Web3Provider({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_PRIVY_APP_ID) {
    throw new Error('Missing Privy App ID');
  }

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}
      config={privyConfig}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
