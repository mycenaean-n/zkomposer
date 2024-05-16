import { stackGrid } from './stack';
import { transformGrid } from './transform';
import { transformTwoGrid } from './transformTwo';
import { rejectGrid } from './reject';
import { filter } from './filter';
import {
  CircuitFunctions,
  COLORS,
  Colors,
  ColorsKeys,
} from '../../types/circuitFunctions.types';

function selectColor(color: ColorsKeys) {
  return color === 'YELLOW'
    ? COLORS.YELLOW
    : color === 'RED'
      ? COLORS.RED
      : color === 'BLUE'
        ? COLORS.BLUE
        : COLORS.WHITE;
}

export function gridMutator(
  grid: Array<Array<Colors>>,
  args: CircuitFunctions[]
) {
  if (args.length === 0) return grid;

  const splitAtguments = args[0].split('_');
  const mutator = splitAtguments[0];
  const colorIn = selectColor(splitAtguments[1] as ColorsKeys);
  //manipulate grid with calls to transformGrid, stackGrid, and/or transformTwoGrid
  switch (mutator) {
    case 'TRANSFORM': {
      const colorOut = selectColor(splitAtguments[2] as ColorsKeys);
      return gridMutator(transformGrid(grid, colorIn, colorOut), args.slice(1));
    }
    case 'STACK': {
      return gridMutator(stackGrid(grid, colorIn), args.slice(1));
    }
    case 'TRANSFORMTWO': {
      const colorOutBot = selectColor(splitAtguments[2] as ColorsKeys);
      const colorOutTop = selectColor(splitAtguments[3] as ColorsKeys);
      return gridMutator(
        transformTwoGrid(grid, colorIn, colorOutBot, colorOutTop),
        args.slice(1)
      );
    }
    case 'REJECT': {
      return gridMutator(rejectGrid(grid, colorIn), args.slice(1));
    }
    case 'FILTER': {
      return gridMutator(filter(grid, colorIn), args.slice(1));
    }
    default: {
      return grid;
    }
  }
}
