'use client';
import { useCallback, useEffect, useState } from 'react';
import { Address } from 'viem';
import { usePrivyWalletAddress } from './privy/usePrivyWalletAddress';

type FaucetRequestBody = {
  address?: Address;
};

export function useFaucetCallback(delay = 4000) {
  const { address } = usePrivyWalletAddress();
  const [message, setMessage] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(undefined);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [message, delay]);

  const faucetCallback = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const body: FaucetRequestBody = { address };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/faucet`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(body),
        }
      );
      const { message }: { message: string } = await response.json();
      setMessage(message);
      setLoading(false);
    } catch (error) {
      setMessage((error as Error).message);
      setLoading(false);
    }
  }, [address]);

  return { loading, message, faucetCallback };
}
