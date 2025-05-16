'use client';
import { usePrivy } from '@privy-io/react-auth';
import { Address } from 'viem';

let prevAddress: Address | undefined;

export const usePrivyWalletAddress = () => {
  const { user } = usePrivy();

  if (!user) {
    return { address: undefined, isConnected: false };
  }

  if (user.wallet?.connectorType === 'embedded') {
    prevAddress = user.wallet.address as Address;
    return { address: prevAddress, isConnected: true };
  }

  return { address: prevAddress, isConnected: !!prevAddress };
};
