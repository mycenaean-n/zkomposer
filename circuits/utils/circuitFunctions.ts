import { Colors, OnOff } from "../test/data/puzzles.types";
import { CircuitFunctions } from "./enums/circuitFunctions.enum";
import { mapIndexToCircuitFunction } from "./mapIndexToCircuitFunction";

const FUNCTION_ORDER = ["TRANSFORM", "STACK", "TRANSFORMTWO"];

export function argumentBuilder(
  arg: CircuitFunctions
): [OnOff.On, Colors, Colors] {
  const funcName = String(mapIndexToCircuitFunction(arg));

  const colorIn = funcName.split("_")[1];
  const colorOut = funcName.split("_")[2];

  return [
    OnOff.On,
    colorIn === "YELLOW"
      ? Colors.Yellow
      : colorIn === "RED"
        ? Colors.Red
        : colorIn === "BLUE"
          ? Colors.Blue
          : Colors.White,
    colorOut === "YELLOW"
      ? Colors.Yellow
      : colorOut === "RED"
        ? Colors.Red
        : colorOut === "BLUE"
          ? Colors.Blue
          : Colors.White,
  ];
}

export function argumentBuilderMain(args: CircuitFunctions[]): number[][][] {
  const numSelectedFunctions = args.length;
  const numAvailableFunctions = FUNCTION_ORDER.length;
  // cannot set nested array in JS only with fill due to object references
  const argumentsArray = Array(numSelectedFunctions)
    .fill(null)
    .map((_) => {
      return Array(numAvailableFunctions).fill(Array(3).fill(0));
    });

  args.forEach((arg, i) => {
    const funcName = mapIndexToCircuitFunction(arg);
    const func = String(funcName).split("_")[0];
    const index = FUNCTION_ORDER.indexOf(func);
    argumentsArray[i][index] = argumentBuilder(arg);
  });

  return argumentsArray;
}
