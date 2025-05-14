import { useLogin, useWallets } from '@privy-io/react-auth';
import { useSetActiveWallet } from '@privy-io/wagmi';
import { useCallback } from 'react';

export const usePrivyLogin = (onComplete: () => void = () => {}) => {
  const { login: privyLogin } = useLogin({ onComplete });
  const { setActiveWallet } = useSetActiveWallet();
  const { wallets } = useWallets();

  const login = useCallback(async () => {
    await privyLogin();
    const privyWallet = wallets.find(
      (wallet) => wallet.walletClientType === 'privy'
    );
    if (privyWallet) {
      setActiveWallet(privyWallet);
    }
  }, [privyLogin, wallets, setActiveWallet]);

  return {
    login,
    wallets,
    setActiveWallet,
  };
};
