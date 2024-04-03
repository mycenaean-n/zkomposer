import { Colors } from '../types/circuitFunctions.types';

type TransformTwoArguments = {
  column: Array<Colors>;
  inColor: Colors;
  outColorBot: Colors;
  outColorTop: Colors;
};

export function transformTwo({
  column,
  inColor,
  outColorBot,
  outColorTop,
}: TransformTwoArguments): Array<Colors> {
  if (column.length === 1 || column.length === 0) return column;

  const [firstElement, ...restOfColumn] = column;

  const { replacedElements, replacedColumn } =
    firstElement === inColor
      ? {
          replacedElements: [outColorBot, outColorTop],
          replacedColumn: restOfColumn.slice(0, -1),
        }
      : { replacedElements: [firstElement], replacedColumn: restOfColumn };

  return [
    ...replacedElements,
    ...transformTwo({
      column: replacedColumn,
      inColor,
      outColorBot,
      outColorTop,
    }),
  ];
}

export function transformTwoGrid(
  grid: Array<Array<Colors>>,
  inColor: Colors,
  outColorBot: Colors,
  outColorTop: Colors
): Array<Array<Colors>> {
  return grid.map((column) =>
    transformTwo({ column, inColor, outColorBot, outColorTop })
  );
}
