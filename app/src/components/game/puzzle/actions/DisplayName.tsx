import { parseCircuitArguments } from 'circuits';
import {
  AvailableFunctions,
  CircuitFunctions,
  ColorsKeys,
} from 'circuits/types/circuitFunctions.types';

function bgColor(color: ColorsKeys) {
  switch (color) {
    case 'YELLOW':
      return 'bg-yellow-500';
    case 'RED':
      return 'bg-red-500';
    case 'BLUE':
      return 'bg-blue-500';
    default:
      throw Error('Not expected colour.');
  }
}

function getDisplayName(func: AvailableFunctions) {
  switch (func) {
    case 'TRANSFORM':
      return 'transform';
    case 'STACK':
      return 'stack';
    case 'TRANSFORMTWO':
      return 'map';
    case 'REJECT':
      return 'reject';
    case 'FILTER':
      return 'filter';
    default:
      throw Error('Not expected function.');
  }
}

export function DisplayName({ funcName }: { funcName: CircuitFunctions }) {
  const { func, colorOne, colorTwo, colorThree } =
    parseCircuitArguments(funcName);

  return (
    <>
      {colorThree ? (
        <div className="h-10 rounded-md border border-black p-1">
          <div className="flex justify-center">
            <div className="mr-1 flex pt-1">
              <div className="font-bold leading-snug">
                {getDisplayName(func)}
              </div>
              <div
                className={`m-1 ml-2 mt-1.5 h-3.5 w-3.5 ${bgColor(colorOne)} border border-black`}
              ></div>
              <div> ↦ </div>
            </div>
            <div className="flex flex-col">
              <div
                className={`mb-1 h-3.5 w-3.5 ${bgColor(colorThree)} border border-black`}
              ></div>
              <div
                className={`h-3.5 w-3.5 ${bgColor(colorTwo)} border border-black`}
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-10 rounded-md border border-black p-1">
          <div className="mt-1.5 flex justify-center">
            <div className="font-bold leading-snug">{getDisplayName(func)}</div>
            <div
              className={`m-1 ml-2 h-3.5 w-3.5 ${bgColor(colorOne)} border border-black`}
            ></div>
            {colorTwo && (
              <>
                <div className="leading-5"> ↦ </div>
                <div
                  className={`m-1 h-3.5 w-3.5 ${bgColor(colorTwo)} border border-black`}
                ></div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
