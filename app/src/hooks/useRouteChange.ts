import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Address } from 'viem';

type RouteParams = {
  puzzleSet: Address | null;
  id: string | null;
};

const useParsePath = () => {
  const searchParams = useSearchParams();

  return useCallback(() => {
    const puzzleSet = searchParams.get('puzzleSet');
    const puzzleId = searchParams.get('puzzleId');

    return {
      puzzleSet: puzzleSet as Address,
      id: puzzleId,
    };
  }, [searchParams]);
};

export function useRouteParams() {
  const parsePath = useParsePath();
  const [url, setUrl] = useState<RouteParams>(parsePath());

  useEffect(() => {
    const handleUrlChange = () => {
      const parsedPath = parsePath();
      setUrl(parsedPath);
    };

    handleUrlChange();

    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args) {
      originalPushState.apply(this, args);
      handleUrlChange();
    };

    history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      handleUrlChange();
    };

    window.addEventListener('popstate', handleUrlChange);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, [parsePath]);

  return url;
}
