import {
  CircuitFunctions,
  circuitFunctionsArray,
} from "../types/circuitFunctions.types";

export function getCircuitFunctionIndex(funcName: CircuitFunctions) {
  const index = circuitFunctionsArray.indexOf(funcName);
  if (index === -1)
    throw new Error(`function with name ${funcName} does not exist`);
  return index;
}

export function getCircuitFunctionName(index: number) {
  const funcName = circuitFunctionsArray[index];
  if (!funcName) throw new Error(`function with index ${index} does not exist`);
  return funcName;
}
