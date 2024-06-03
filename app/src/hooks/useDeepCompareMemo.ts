import { useRef, useMemo } from 'react';
// use lodash instead of JSON.stringify since it fails for bigint
import { isEqual } from 'lodash';

export function useDeepCompareMemo<T extends any>(value: T) {
  const prevConfigRef = useRef<T>();

  return useMemo(() => {
    if (prevConfigRef.current && isEqual(prevConfigRef.current, value)) {
      return prevConfigRef.current;
    }
    prevConfigRef.current = value;
    return value;
  }, [value]);
}
