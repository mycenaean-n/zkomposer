'use client';
import { usePrivy, User } from '@privy-io/react-auth';
import { Address } from 'viem';

const getPrivyWalletAddress = (user: User | null): Address | undefined => {
  if (!user) {
    return undefined;
  }

  if (user.wallet?.connectorType === 'embedded') {
    return user.wallet.address as Address;
  }
};

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
