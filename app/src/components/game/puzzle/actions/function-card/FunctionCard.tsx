import { parseCircuitArguments } from 'circuits';
import {
  CircuitFunctions,
  ColorsKeys,
} from 'circuits/types/circuitFunctions.types';
import clsx from 'clsx';
import { HTMLAttributes } from 'react';
import { DisplayName } from './DisplayName';

export function FunctionCard({ funcName }: { funcName: CircuitFunctions }) {
  const { functionName, colorOne, colorTwo, colorThree } =
    parseCircuitArguments(funcName);

  return (
    <div className="flex h-8 justify-center rounded-md border border-black bg-white p-1 shadow-md shadow-black/30 transition-transform hover:-translate-y-px hover:shadow-lg hover:shadow-black/30">
      <div className="flex items-center">
        <DisplayName functionName={functionName}>
          <div className="mx-1 flex items-center">
            <ColorBox color={colorOne} />
            {colorTwo ? (
              <>
                <div className="mx-1"> ↦ </div>
                <div
                  className={clsx(
                    colorThree ? 'flex flex-col gap-0.5' : 'block'
                  )}
                >
                  {colorThree ? <ColorBox color={colorThree} /> : null}
                  <ColorBox color={colorTwo} />
                </div>
              </>
            ) : null}
          </div>
        </DisplayName>
      </div>
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
      className={clsx('h-3 w-3 border border-black', bgColor(color))}
      {...props}
    />
  );
}
