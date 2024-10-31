import {
  AvailableFunctions,
  CircuitFunctions,
  ColorsKeys,
} from '../types/circuitFunctions.types';

export function parseCircuitArguments(funcName: CircuitFunctions) {
  const [functionName, colorOne, colorTwo, colorThree] = funcName.split(
    '_'
  ) as [AvailableFunctions, ColorsKeys, ColorsKeys, ColorsKeys];

  return { functionName, colorOne, colorTwo, colorThree };
}
