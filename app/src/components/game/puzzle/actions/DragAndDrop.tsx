import { CircuitFunctions } from 'circuits/types/circuitFunctions.types';
import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useOnDragEnd } from '../../../../hooks/useOnDrag';
import { PuzzleFunctionState } from '../../../../types/Puzzle';
import { Function } from './Function';

interface DragAndDropProps {
  functions: Record<PuzzleFunctionState, CircuitFunctions[]>;
  setFunctions: React.Dispatch<
    React.SetStateAction<Record<PuzzleFunctionState, CircuitFunctions[]>>
  >;
}

const DragAndDrop: React.FC<DragAndDropProps> = ({
  functions,
  setFunctions,
}) => {
  const { onDragEnd } = useOnDragEnd(functions, setFunctions);
  return (
    <div className="grid grid-cols-2 justify-center gap-2">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={PuzzleFunctionState.remaining}>
          {(provided) => (
            <div
              className="rounded-sm border border-solid border-black"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {functions.remaining.map((funcName: CircuitFunctions, i) => (
                <Function
                  key={`${funcName}-${i}`}
                  elementType="remaining"
                  funcName={funcName}
                  index={i}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId={PuzzleFunctionState.chosen}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              className="rounded-sm border border-black"
              {...provided.droppableProps}
            >
              {functions.chosen.map((funcName: CircuitFunctions, i) => (
                <Function
                  key={`${funcName}-${i}`}
                  elementType="chosen"
                  funcName={funcName}
                  index={i}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DragAndDrop;
