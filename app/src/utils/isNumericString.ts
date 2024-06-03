import { StringNumberBI } from '../types/Puzzle';

type T = string | undefined;
type isNumericStringReturnType<T> = T extends StringNumberBI ? true : false;

export function isNumberNumericStringBI(value: StringNumberBI): boolean {
  if (typeof value === 'bigint' || typeof value === 'number') {
    return true;
  }

  return (typeof value === 'string' &&
    !isNaN(Number(value))) as isNumericStringReturnType<T>;
}
