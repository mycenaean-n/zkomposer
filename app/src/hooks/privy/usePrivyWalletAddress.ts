'use client';
import { usePrivy, User } from '@privy-io/react-auth';
import { useEffect, useState } from 'react';
import { Address } from 'viem';
import { WALLET_TYPES } from './constants';

interface WalletAddress {
  address: Address | undefined;
  type: string | undefined;
}

const getWalletAddress = (user: User | null): WalletAddress => {
  if (!user) {
    return { address: undefined, type: undefined };
  }

  // Prioritize injected wallets (MetaMask, Rabby)
  if (user.wallet?.connectorType === WALLET_TYPES.INJECTED) {
    return {
      address: user.wallet.address as Address,
      type: WALLET_TYPES.INJECTED,
    };
  }

  // Fallback to embedded wallet (Privy email wallet)
  if (user.wallet?.connectorType === WALLET_TYPES.EMBEDDED) {
    return {
      address: user.wallet.address as Address,
      type: WALLET_TYPES.EMBEDDED,
    };
  }

  return { address: undefined, type: undefined };
};

export const usePrivyWalletAddress = () => {
  const { user } = usePrivy();
  const [walletInfo, setWalletInfo] = useState<WalletAddress>(
    getWalletAddress(user)
  );

  console.log({ user });

  useEffect(() => {
    setWalletInfo(getWalletAddress(user));
  }, [user?.wallet?.address, user?.wallet?.connectorType]);

  console.log({ walletInfo });

  return {
    address: walletInfo.address,
    walletType: walletInfo.type,
    isInjected: walletInfo.type === WALLET_TYPES.INJECTED,
    isEmbedded: walletInfo.type === WALLET_TYPES.EMBEDDED,
    isConnected: !!walletInfo.address,
  };
};
