import {
  CircuitFunctions,
  COLORS,
  Colors,
  OnOff,
} from '../types/circuitFunctions.types';
import { parseCircuitArguments } from './parseCircuitArguments';

function mapColor(color: string): Colors {
  switch (color) {
    case 'YELLOW':
      return COLORS.YELLOW;
    case 'RED':
      return COLORS.RED;
    case 'BLUE':
      return COLORS.BLUE;
    default:
      return COLORS.WHITE;
  }
}

export function argumentBuilder(
  arg: CircuitFunctions
): [OnOff.On, Colors, Colors, Colors] {
  const { colorOne, colorTwo, colorThree } = parseCircuitArguments(arg);
  return [
    OnOff.On,
    mapColor(colorOne),
    mapColor(colorTwo),
    mapColor(colorThree),
  ];
}
