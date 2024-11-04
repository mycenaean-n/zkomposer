import { useEffect } from 'react';

export function useWindowFocusRefetch(fetcher: () => void) {
  useEffect(() => {
    const handleFocus = () => {
      fetcher();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [fetcher]);
}
