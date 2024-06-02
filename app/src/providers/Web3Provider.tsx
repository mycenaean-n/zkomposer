'use client';
import {
  arbitrumSepolia,
  localhost,
  scroll,
  scrollSepolia,
} from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createConfig, WagmiProvider } from '@privy-io/wagmi';
import { PrivyClientConfig, PrivyProvider } from '@privy-io/react-auth';
import { defineChain, http } from 'viem';

const queryClient = new QueryClient();

export const wagmiConfig = createConfig({
  chains: [scroll, scrollSepolia, arbitrumSepolia, { ...localhost, id: 31337 }],
  transports: {
    [scroll.id]: http(),
    [scrollSepolia.id]: http(),
    [arbitrumSepolia.id]: http(
      `https://arbitrum-sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`
    ),
    ['31337']: http(),
  },

  ssr: true,
});

export const LocalHost = defineChain({
  id: 31337, // Replace this with your chain's ID
  name: 'Localhost',
  network: 'my-custom-chain',
  nativeCurrency: {
    decimals: 18, // Replace this with the number of decimals for your chain's native token
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:8545'],
    },
  },
});

const privyConfig = {
  appearance: {
    theme: 'light',
    accentColor: '#676FFF',
  },
  embeddedWallets: {
    createOnLogin: 'all-users',
  },
  supportedChains: [scroll, scrollSepolia, arbitrumSepolia, LocalHost],
  defaultChain: arbitrumSepolia,
} as PrivyClientConfig;

export function Web3Provider({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_PRIVY_APP_ID)
    throw new Error('Missing Privy App ID');
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
