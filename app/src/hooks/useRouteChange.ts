import { useEffect, useState } from 'react';
import { Address } from 'viem';

const parsePath = (
  path: string
): { puzzleSet: Address | null; id: string | null } => {
  const segments = path.split('/');
  const puzzleSet = segments.at(-2) ?? null;
  const id = segments.at(-1) ?? null;

  return {
    puzzleSet: puzzleSet as Address,
    id,
  };
};

export function useRouteParams() {
  const [url, setUrl] = useState(parsePath(window.location.href));

  useEffect(() => {
    const handleUrlChange = () => {
      const parsedPath = parsePath(window.location.href);
      setUrl(parsedPath);
    };

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
  }, []);

  return url;
}
