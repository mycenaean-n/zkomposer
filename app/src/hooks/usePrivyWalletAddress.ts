import { usePrivy } from '@privy-io/react-auth';
import { Address } from 'viem';

export const usePrivyWalletAddress = () => {
  const { user } = usePrivy();

  return user?.wallet?.address as Address;
};
