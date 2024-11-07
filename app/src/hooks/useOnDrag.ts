import { DropResult } from 'react-beautiful-dnd';
import { DragAndDropProps } from '../components/game/actions/DragAndDrop';
import { PuzzleFunctionState } from '../types/Puzzle';

export function useOnDragEnd({ functions, setFunctions }: DragAndDropProps) {
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
        ...(prev as DragAndDropProps['functions']),
        [sourceFunctionState]: sourceFunctions,
        [destinationFunctionState]: destinationFunctions,
      }));
    } else if (source.droppableId == destination.droppableId) {
      const functionState = source.droppableId as PuzzleFunctionState;
      const reorderedFunctions = functions[functionState];
      const [removedFunction] = reorderedFunctions.splice(source.index, 1);
      reorderedFunctions.splice(destination.index, 0, removedFunction);
      setFunctions((prev) => ({
        ...(prev as DragAndDropProps['functions']),
        [functionState]: reorderedFunctions,
      }));
    }
  };

  return { onDragEnd };
}
