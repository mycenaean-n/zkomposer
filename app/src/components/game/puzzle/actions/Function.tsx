import React, { useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { PuzzleContext } from '../Puzzle';
import {
  AvailableFunctions,
  CircuitFunctions,
  ColorsKeys,
} from 'circuits/types/circuitFunctions.types';
import { parseCircuitArguments } from 'circuits';
import { DisplayName } from './DisplayName';

export function Function({
  elementType,
  funcName,
  index,
}: {
  elementType: 'chosen' | 'remaining';
  funcName: CircuitFunctions;
  index: number;
}) {
  const { setFunctions } = useContext(PuzzleContext);
  return (
    <Draggable
      draggableId={String(funcName)}
      key={String(funcName)}
      index={index}
    >
      {(provided) => (
        <div
          className="m-1 h-10 cursor-pointer rounded-md"
          key={index}
          onClick={() => {
            elementType === 'remaining'
              ? setFunctions((prev) => ({
                  remaining: prev.remaining.toSpliced(index, 1),
                  chosen: prev.chosen.concat(funcName),
                  available: prev.available,
                }))
              : setFunctions((prev) => ({
                  remaining: prev.remaining.concat(funcName),
                  chosen: prev.chosen.toSpliced(index, 1),
                  available: prev.available,
                }));
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <DisplayName funcName={funcName} />
        </div>
      )}
    </Draggable>
  );
}
