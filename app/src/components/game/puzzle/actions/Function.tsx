import React, { useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { PuzzleContext } from '../Puzzle';
import styles from '../../../styles/actions.module.scss';
import { CircuitFunctions } from 'circuits/types/circuitFunctions.types';

export default function Function({
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
          className={styles.function}
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
          {funcName}
        </div>
      )}
    </Draggable>
  );
}
