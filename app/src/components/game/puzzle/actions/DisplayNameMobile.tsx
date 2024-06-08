import React from 'react';
import { parseCircuitArguments } from 'circuits';
import { CircuitFunctions } from 'circuits/types/circuitFunctions.types';
import { bgColor, getDisplayName } from '@/utils';

export function DisplayNameMobile({
  funcName,
}: {
  funcName: CircuitFunctions;
}) {
  const { func, colorOne, colorTwo, colorThree } =
    parseCircuitArguments(funcName);

  return (
    <>
      {colorThree ? (
        <div className="h-8 rounded-md border border-black p-1">
          <div className="flex justify-center">
            <div className="mr-1 flex">
              <div className="font-bold leading-snug">
                {getDisplayName(func)}
              </div>
              <div
                className={`m-1 ml-2 mt-1.5 h-2.5 w-2.5 ${bgColor(colorOne)} border border-black`}
              ></div>
              <div className="leading-tight"> ↦ </div>
            </div>
            <div className="flex flex-col">
              <div
                className={`h-2.5 w-2.5 ${bgColor(colorThree)} border border-black`}
              ></div>
              <div
                className={`h-2.5 w-2.5 ${bgColor(colorTwo)} border border-black`}
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-8 rounded-md border border-black">
          <div className="mt-1.5 flex justify-center">
            <div className="font-bold leading-4">{getDisplayName(func)}</div>
            <div
              className={`m-1 ml-2 h-2.5 w-2.5 ${bgColor(colorOne)} border border-black`}
            ></div>
            {colorTwo && (
              <>
                <div className="leading-4"> ↦ </div>
                <div
                  className={`m-1 h-2.5 w-2.5 ${bgColor(colorTwo)} border border-black`}
                ></div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
