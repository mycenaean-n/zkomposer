import {
  AvailableFunctions,
  ColorsKeys,
} from 'circuits/types/circuitFunctions.types';

export function bgColor(color: ColorsKeys) {
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

export function getDisplayName(func: AvailableFunctions) {
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
