'use client';
import { usePrivy } from '@privy-io/react-auth';
import { useEffect, useState } from 'react';
import { Address } from 'viem';

export const usePrivyWalletAddress = () => {
  const { user } = usePrivy();
  const [address, setAddress] = useState<Address | undefined>();

  useEffect(() => {
    if (!user) {
      setAddress(undefined);
    } else if (user?.wallet?.walletClientType === 'privy') {
      setAddress(user?.wallet?.address as Address);
    }
  }, [user?.wallet?.address]);

  return address;
};
