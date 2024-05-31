import { usePrivy } from '@privy-io/react-auth';
import { useEffect, useState } from 'react';
import { Address } from 'viem';

export const usePrivyWalletAddress = () => {
  const { user } = usePrivy();
  const [address, setAddress] = useState<Address>();

  useEffect(() => {
    if (user?.wallet?.walletClientType === 'privy')
      setAddress(user?.wallet?.address as Address);
  }, [user?.wallet?.address]);

  return address;
};
