import { useLogin, useWallets } from '@privy-io/react-auth';
import { useSetActiveWallet } from '@privy-io/wagmi';
import { useEffect } from 'react';
import { arbitrumSepolia } from 'viem/chains';

export const usePrivyLogin = (onComplete: () => void = () => {}) => {
  const { login } = useLogin({ onComplete });
  const { setActiveWallet } = useSetActiveWallet();
  const { wallets } = useWallets();

  useEffect(() => {
    if (wallets.length > 0) {
      const privyWallet = wallets.find(
        (wallet) => wallet.walletClientType === 'privy'
      );

      privyWallet?.switchChain(arbitrumSepolia.id).then(() => {
        if (privyWallet) {
          setActiveWallet(privyWallet);
        }
      });
    }
  }, [wallets, setActiveWallet]);

  return {
    login,
    wallets,
    setActiveWallet,
  };
};
