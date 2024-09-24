'use client';
import copy from 'copy-to-clipboard';
import { useCallback, useEffect, useState } from 'react';

export function useCopyToClipboard(delay = 1500) {
  const [success, setSuccess] = useState(false);

  const copyToClipboard = useCallback(
    (value = '') => {
      if (!value) {
        console.error('Nothing to copy!');
        setSuccess(false);
        return { success: false };
      }

      const result = copy(value);
      setSuccess(result);
    },
    [success, delay]
  );

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [success, delay]);

  return { success, copyToClipboard };
}
