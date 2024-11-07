import { AvailableFunctions } from 'circuits/types/circuitFunctions.types';
import { ReactNode } from 'react';

const FunctionDisplayNamesMap: Record<
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

export function DisplayName({
  functionName,
  children,
}: {
  functionName: AvailableFunctions;
  children: ReactNode;
}): ReactNode {
  const FunctionDisplayName = FunctionDisplayNamesMap[functionName];

  if (!FunctionDisplayName) {
    throw new Error(`Unexpected function: ${functionName}`);
  }

  return <FunctionDisplayName>{children}</FunctionDisplayName>;
}
