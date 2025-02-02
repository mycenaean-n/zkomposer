'use client';
import { CircuitFunctions } from 'circuits/types/circuitFunctions.types';
import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useOnDragEnd } from '../../../hooks/useOnDrag';
import { usePuzzleContext } from '../../../providers/PuzzleContext';
import { PuzzleFunctionState } from '../../../types/Puzzle';
import { Skeleton } from '../../ui/skeleton/Skeleton';
import { Function } from './Function';

export const DragAndDrop: React.FC = () => {
  const { functions, setFunctions } = usePuzzleContext();
  const { onDragEnd } = useOnDragEnd({
    functions,
    setFunctions,
  });

  const isLoading = !functions || !setFunctions;

  return (
    <div className="grid h-auto grid-cols-2 justify-center gap-2">
      <DragDropContext onDragEnd={onDragEnd}>
        {!isLoading ? (
          <Droppable droppableId={PuzzleFunctionState.remaining}>
            {(provided) => (
              <div
                className="h-[18.5rem] border border-black"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {functions?.remaining?.map((funcName: CircuitFunctions, i) => (
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
        ) : (
          <Skeleton className="h-[300px]" />
        )}
        {!isLoading ? (
          <Droppable droppableId={PuzzleFunctionState.chosen}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                className="h-[18.5rem] rounded-sm border border-black"
                {...provided.droppableProps}
              >
                {functions?.chosen?.map((funcName: CircuitFunctions, i) => (
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
        ) : (
          <Skeleton className="h-[300px]" />
        )}
      </DragDropContext>
    </div>
  );
};
