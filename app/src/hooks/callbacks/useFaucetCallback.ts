'use client';
import { useCallback, useEffect, useState } from 'react';
import { usePrivyWalletAddress } from '../usePrivyWalletAddress';

export function useFaucetCallback(delay = 4000) {
  const address = usePrivyWalletAddress();
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
      const response = await fetch('/api/faucet', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ address }),
      });
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
