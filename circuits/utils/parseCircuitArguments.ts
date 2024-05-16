import {
  AvailableFunctions,
  CircuitFunctions,
  ColorsKeys,
} from '../types/circuitFunctions.types';

export function parseCircuitArguments(funcName: CircuitFunctions) {
  const [func, colorOne, colorTwo, colorThree] = funcName.split('_') as [
    AvailableFunctions,
    ColorsKeys,
    ColorsKeys,
    ColorsKeys,
  ];

  return { func, colorOne, colorTwo, colorThree };
}
