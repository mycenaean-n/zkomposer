import { CircuitFunctions } from 'circuits/types/circuitFunctions.types';
import { Draggable } from 'react-beautiful-dnd';
import { usePuzzleContext } from '../../../../context/PuzzleContext';
import { PuzzleFunctions } from '../../../../types/Puzzle';
import { FunctionCard } from './function-card/FunctionCard';

export function Function({
  elementType,
  funcName,
  index,
}: {
  elementType: 'chosen' | 'remaining';
  funcName: CircuitFunctions;
  index: number;
}) {
  const { setFunctions } = usePuzzleContext();
  return (
    <Draggable
      draggableId={String(funcName)}
      key={String(funcName)}
      index={index}
    >
      {(provided) => (
        <div
          className="m-1 cursor-pointer rounded-md"
          key={index}
          onClick={() => {
            elementType === 'remaining'
              ? setFunctions((prev: PuzzleFunctions | undefined) => {
                  if (!prev) return prev;
                  return {
                    remaining: prev.remaining.toSpliced(index, 1),
                    chosen: prev.chosen.concat(funcName),
                    available: prev.available,
                  };
                })
              : setFunctions((prev: PuzzleFunctions | undefined) => {
                  if (!prev) return prev;
                  return {
                    remaining: prev.remaining.concat(funcName),
                    chosen: prev.chosen.toSpliced(index, 1),
                    available: prev.available,
                  };
                });
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <FunctionCard funcName={funcName} />
        </div>
      )}
    </Draggable>
  );
}
