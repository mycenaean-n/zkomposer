'use client';
import { useMutation } from '@tanstack/react-query';
import { usePrivyWalletAddress } from './privy/usePrivyWalletAddress';

export function useFaucetCallback(delay = 4000) {
  const { address } = usePrivyWalletAddress();

  const {
    mutateAsync: faucetCallback,
    isPending: loading,
    data: message,
    reset,
  } = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/faucet', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ address }),
      });
      const { message }: { message: string } = await response.json();
      return message;
    },
    onSuccess: () => {
      setTimeout(() => {
        reset();
      }, delay);
    },
  });

  return { loading, message, faucetCallback };
}
