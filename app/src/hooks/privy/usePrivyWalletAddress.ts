'use client';
import { usePrivy, User } from '@privy-io/react-auth';
import { useEffect, useState } from 'react';
import { Address } from 'viem';

const getPrivyWalletAddress = (user: User | null): Address | undefined => {
  if (!user) {
    return undefined;
  }

  if (user.wallet?.connectorType === 'embedded') {
    return user.wallet.address as Address;
  }
};

export const usePrivyWalletAddress = () => {
  const { user } = usePrivy();
  const [embeddedWalletAddress, setEmbeddedWalletAddress] = useState<
    Address | undefined
  >(getPrivyWalletAddress(user));

  useEffect(() => {
    setEmbeddedWalletAddress(getPrivyWalletAddress(user));
  }, [user?.wallet?.address, user?.wallet?.connectorType]);

  return {
    address: embeddedWalletAddress,
    isConnected: !!embeddedWalletAddress,
  };
};
