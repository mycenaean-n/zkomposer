import { DropResult } from 'react-beautiful-dnd';
import { PuzzleContextType } from '../providers/PuzzleProvider';
import { PuzzleFunctionState } from '../types/Puzzle';

type DragAndDropProps = {
  functions: PuzzleContextType['functions'];
  setFunctions: PuzzleContextType['setFunctions'];
};

type NonNullableDragAndDropProps = {
  functions: NonNullable<PuzzleContextType['functions']>;
  setFunctions: NonNullable<PuzzleContextType['setFunctions']>;
};

export function useOnDragEnd({ functions, setFunctions }: DragAndDropProps) {
  const areFunctionsDefined =
    functions?.remaining &&
    functions?.chosen &&
    functions?.available &&
    setFunctions;

  if (!areFunctionsDefined) {
    return { onDragEnd: () => {} };
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId !== destination.droppableId) {
      const sourceFunctionState = source.droppableId as PuzzleFunctionState;
      const destinationFunctionState =
        destination.droppableId as PuzzleFunctionState;
      const sourceFunctions = [...functions[sourceFunctionState]];
      const [removedFunction] = sourceFunctions.splice(source.index, 1);
      const destinationFunctions = [...functions[destinationFunctionState]];

      destinationFunctions.splice(destination.index, 0, removedFunction);
      setFunctions((prev) => ({
        ...(prev as NonNullableDragAndDropProps['functions']),
        [sourceFunctionState]: sourceFunctions,
        [destinationFunctionState]: destinationFunctions,
      }));
    } else if (source.droppableId == destination.droppableId) {
      const functionState = source.droppableId as PuzzleFunctionState;
      const reorderedFunctions = functions[functionState];
      const [removedFunction] = reorderedFunctions.splice(source.index, 1);
      reorderedFunctions.splice(destination.index, 0, removedFunction);
      setFunctions((prev) => ({
        ...(prev as NonNullableDragAndDropProps['functions']),
        [functionState]: reorderedFunctions,
      }));
    }
  };

  return { onDragEnd };
}
