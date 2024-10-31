'use client';
import { PrivyClientConfig, PrivyProvider } from '@privy-io/react-auth';
import { createConfig, WagmiProvider } from '@privy-io/wagmi';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { useEffect } from 'react';
import { defineChain, http } from 'viem';
import { deserialize, serialize } from 'wagmi';
import { arbitrumSepolia, scroll, scrollSepolia } from 'wagmi/chains';

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

function getQueryClient() {
  if (typeof window === 'undefined') return null;

  return new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  });
}

function getLocalStoragePersister() {
  if (typeof window === 'undefined') return null;

  return createSyncStoragePersister({
    serialize,
    storage: window.localStorage,
    deserialize,
  });
}

const SUPPORTED_CHAINS = [
  arbitrumSepolia,
  LocalHost,
  scroll,
  scrollSepolia,
] as const;

export const wagmiConfig = createConfig({
  chains: SUPPORTED_CHAINS,
  transports: {
    [arbitrumSepolia.id]: http(
      `https://arbitrum-sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`
    ),
    ['31337']: http(),
    [scroll.id]: http(),
    [scrollSepolia.id]: http(),
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
  supportedChains: SUPPORTED_CHAINS as unknown,
  defaultChain: SUPPORTED_CHAINS[0],
} as PrivyClientConfig;

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const localStoragePersister = getLocalStoragePersister();

  useEffect(() => {
    window.localStorage.removeItem('wagmi.store');
  }, []);

  if (!process.env.NEXT_PUBLIC_PRIVY_APP_ID)
    throw new Error('Missing Privy App ID');

  if (!queryClient || !localStoragePersister) {
    return null;
  }

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}
      config={privyConfig}
    >
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: localStoragePersister }}
      >
        <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
      </PersistQueryClientProvider>
    </PrivyProvider>
  );
}
