'use client';
import { localhost, scroll, scrollSepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createConfig, WagmiProvider } from '@privy-io/wagmi';
import { PrivyClientConfig, PrivyProvider } from '@privy-io/react-auth';
import { http } from 'viem';

const queryClient = new QueryClient();

export const wagmiConfig = createConfig({
  chains: [scroll, scrollSepolia, { ...localhost, id: 31337 }],
  transports: {
    [scroll.id]: http(),
    [scrollSepolia.id]: http(),
    ['31337']: http(),
  },
  ssr: true,
});

const privyConfig = {
  appearance: {
    theme: 'light',
    accentColor: '#676FFF',
  },
  embeddedWallets: {
    createOnLogin: 'users-without-wallets',
  },
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
