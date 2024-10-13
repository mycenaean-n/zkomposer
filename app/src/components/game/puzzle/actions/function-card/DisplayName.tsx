import { AvailableFunctions } from 'circuits/types/circuitFunctions.types';
import { ReactNode } from 'react';

const functionDisplayNames: Record<
  AvailableFunctions,
  (props: { children: React.ReactNode }) => ReactNode
> = {
  EMPTY: () => <></>,
  TRANSFORM: ({ children }) => <>map {children}</>,
  STACK: ({ children }) => <>map (stack {children})</>,
  TRANSFORMTWO: ({ children }) => <>map {children}</>,
  REJECT: ({ children }) => <>map (reject {children})</>,
  FILTER: ({ children }) => <>filter (contains {children})</>,
} as const;

export function getDisplayName(
  func: AvailableFunctions
): (props: { children: ReactNode }) => ReactNode {
  const displayName = functionDisplayNames[func];
  if (!displayName) {
    throw new Error(`Unexpected function: ${func}`);
  }

  return (props) => (
    <div className="flex items-center leading-snug">{displayName(props)}</div>
  );
}
