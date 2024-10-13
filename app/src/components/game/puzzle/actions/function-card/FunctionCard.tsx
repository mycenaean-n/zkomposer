import { parseCircuitArguments } from 'circuits';
import {
  CircuitFunctions,
  ColorsKeys,
} from 'circuits/types/circuitFunctions.types';
import clsx from 'clsx';
import { HTMLAttributes, useMemo } from 'react';
import { getDisplayName } from './DisplayName';

export function FunctionCard({ funcName }: { funcName: CircuitFunctions }) {
  const { func, colorOne, colorTwo, colorThree } =
    parseCircuitArguments(funcName);

  const DisplayName = useMemo(() => getDisplayName(func), [func]);

  return (
    <div className="flex h-10 justify-center rounded-md border border-black p-1">
      <DisplayName>
        <div className="mx-1 flex items-center">
          <ColorBox color={colorOne} />
          {colorTwo ? (
            <>
              <div className="mx-1"> ↦ </div>
              <div
                className={clsx(colorThree ? 'flex flex-col gap-0.5' : 'block')}
              >
                <ColorBox color={colorTwo} />
                {colorThree && <ColorBox color={colorThree} />}
              </div>
            </>
          ) : null}
        </div>
      </DisplayName>
    </div>
  );
}

const COLOR_CLASS_MAP: Record<ColorsKeys, string> = {
  WHITE: 'bg-white',
  YELLOW: 'bg-yellow-500',
  RED: 'bg-red-500',
  BLUE: 'bg-blue-500',
} as const;

function bgColor(color: ColorsKeys): string {
  const bgClass = COLOR_CLASS_MAP[color];
  if (!bgClass) {
    throw new Error(`Unexpected color: ${color}`);
  }
  return bgClass;
}

function ColorBox({
  color,
  ...props
}: { color: ColorsKeys } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx('h-3.5 w-3.5 border border-black', bgColor(color))}
      {...props}
    />
  );
}
