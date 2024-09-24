import { EIP1193Provider, useWallets } from '@privy-io/react-auth';
import { useEffect, useMemo, useState } from 'react';
import { createPublicClient, createWalletClient, http } from 'viem';
import { arbitrumSepolia } from 'viem/chains';
import { custom } from 'wagmi';

export function useClients() {
  const { wallets } = useWallets();
  const [provider, setProvider] = useState<EIP1193Provider | undefined>();
  const publicClient = createPublicClient({
    chain: arbitrumSepolia,
    transport: http(),
  });

  useEffect(() => {
    if (wallets[0]) {
      wallets[0].getEthereumProvider().then((p) => {
        setProvider(p as EIP1193Provider);
      });
    }
  }, [wallets[0]?.address]);

  const walletClient = useMemo(() => {
    if (provider) {
      return createWalletClient({
        chain: publicClient?.chain,
        transport: custom(provider),
      });
    }
  }, [provider, publicClient?.chain]);

  if (!publicClient) {
    throw new Error('Public client not found');
  }

  return { publicClient, walletClient };
}
