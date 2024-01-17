import { CircuitFunctions } from "./enums/circuitFunctions.enum";

export function mapIndexToCircuitFunction(id: number): CircuitFunctions {
  const circuitFunction = CircuitFunctions[id];
  if (!circuitFunction) {
    throw Error("Invalid function ID");
  }
  return circuitFunction as unknown as CircuitFunctions;
}
