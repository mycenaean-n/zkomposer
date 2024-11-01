'use client';
import { usePrivy, User } from '@privy-io/react-auth';
import { useEffect, useState } from 'react';
import { Address } from 'viem';

const stateUpdater = (user: User | null) => {
  if (!user) {
    return undefined;
  } else if (user?.wallet?.walletClientType === 'privy') {
    return user?.wallet?.address as Address;
  }
};

export const usePrivyWalletAddress = () => {
  const { user } = usePrivy();
  const [address, setAddress] = useState<Address | undefined>(
    stateUpdater(user)
  );

  useEffect(() => {
    setAddress(stateUpdater(user));
  }, [user?.wallet?.address]);

  return address;
};
