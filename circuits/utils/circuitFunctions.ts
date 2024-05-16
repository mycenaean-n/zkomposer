import {
  CircuitFunctions,
  COLORS,
  Colors,
  OnOff,
} from '../types/circuitFunctions.types';
import { parseCircuitArguments } from './parseCircuitArguments';

export function argumentBuilder(
  arg: CircuitFunctions
): [OnOff.On, Colors, Colors, Colors] {
  const { colorOne, colorTwo, colorThree } = parseCircuitArguments(arg);
  return [
    OnOff.On,
    colorOne === 'YELLOW'
      ? COLORS.YELLOW
      : colorOne === 'RED'
        ? COLORS.RED
        : colorOne === 'BLUE'
          ? COLORS.BLUE
          : COLORS.WHITE,
    colorTwo === 'YELLOW'
      ? COLORS.YELLOW
      : colorTwo === 'RED'
        ? COLORS.RED
        : colorTwo === 'BLUE'
          ? COLORS.BLUE
          : COLORS.WHITE,
    colorThree === 'YELLOW'
      ? COLORS.YELLOW
      : colorThree === 'RED'
        ? COLORS.RED
        : colorThree === 'BLUE'
          ? COLORS.BLUE
          : COLORS.WHITE,
  ];
}
