import { Colors, OnOff } from "../test/data/puzzles.types";

const FUNCTION_ORDER = ["TRANSFORM", "STACK", "TRANSFORMTWO"];

const ARGUMENTS = {
  EMPTY: [OnOff.Off, 0, 0],
  // STACK
  STACK_YELLOW: [OnOff.On, Colors.Yellow, 0],
  STACK_RED: [OnOff.On, Colors.Red, 0],
  STACK_BLUE: [OnOff.On, Colors.Blue, 0],

  // TRANSFORM
  TRANSFORM_YELLOW_RED: [OnOff.On, Colors.Yellow, Colors.Red],
  TRANSFORM_YELLOW_BLUE: [OnOff.On, Colors.Yellow, Colors.Blue],
  TRANSFORM_RED_YELLOW: [OnOff.On, Colors.Red, Colors.Yellow],
  TRANSFORM_RED_BLUE: [OnOff.On, Colors.Red, Colors.Blue],
  TRANSFORM_BLUE_YELLOW: [OnOff.On, Colors.Blue, Colors.Yellow],
  TRANSFORM_BLUE_RED: [OnOff.On, Colors.Blue, Colors.Red],

  // TRANSFORM TWO
  TRANSFORMTWO_YELLOW_RED: [OnOff.On, Colors.Yellow, Colors.Red],
  TRANSFORMTWO_YELLOW_BLUE: [OnOff.On, Colors.Yellow, Colors.Blue],
  TRANSFORMTWO_RED_YELLOW: [OnOff.On, Colors.Red, Colors.Yellow],
  TRANSFORMTWO_RED_BLUE: [OnOff.On, Colors.Red, Colors.Blue],
  TRANSFORMTWO_BLUE_YELLOW: [OnOff.On, Colors.Blue, Colors.Yellow],
  TRANSFORMTWO_BLUE_RED: [OnOff.On, Colors.Blue, Colors.Red],
};

export function functionBuilder(args: (keyof typeof ARGUMENTS)[]) {
  const numSelectedFunctions = args.length;
  const numAvailableFunctions = FUNCTION_ORDER.length;
  // cannot set nested array in JS only with fill due to object references
  const argumentsArray = Array(numSelectedFunctions)
    .fill(null)
    .map((_) => {
      return Array(numAvailableFunctions).fill(Array(3).fill(0));
    });

  args.forEach((arg, i) => {
    const func = arg.split("_")[0];
    const index = FUNCTION_ORDER.indexOf(func);

    if (arg !== "EMPTY") argumentsArray[i][index] = ARGUMENTS[arg];
  });

  return argumentsArray;
}
