import React, { useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { PuzzleContext } from '../Puzzle';
import styles from '../../../styles/actions.module.scss';
import { CircuitFunctions } from 'circuits/types/circuitFunctions.types';

function DisplayName({ funcName }: { funcName: CircuitFunctions }) {
  const [func, colorOne, colorTwo, colorThree] = funcName.split('_');

  let displayName = '';
  if (func === 'STACK') {
    displayName += 'stack';
  } else if (func === 'TRANSFORM') {
    displayName += 'transform';
  } else if (func === 'REJECT') {
    displayName += 'reject';
  } else if (func === 'TRANSFORMTWO') {
    displayName += 'map ';
  }

  function bgColor(color: string) {
    if (color === 'YELLOW') return 'bg-yellow-500';
    if (color === 'BLUE') return 'bg-blue-500';
    if (color === 'RED') return 'bg-red-500';
  }

  return (
    <>
      {colorThree ? (
        <div className="p-1 h-10 rounded-md">
          <div className="flex justify-center">
            <div className="flex pt-1 mr-1">
              <div className="leading-6">{displayName}</div>
              <div
                className={`m-1 ml-2 mt-1.5 h-3.5 w-3.5 ${bgColor(colorOne)} border-black border`}
              ></div>
              <div> ↦ </div>
            </div>
            <div className="flex flex-col">
              <div
                className={`mb-1 h-3.5 w-3.5 ${bgColor(colorThree)} border-black border`}
              ></div>
              <div
                className={`h-3.5 w-3.5 ${bgColor(colorTwo)} border-black border`}
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <div className=" p-1 h-10 rounded-md">
          <div className="flex justify-center mt-1.5">
            <div className="leading-5">{displayName}</div>
            <div
              className={`m-1 ml-2 h-3.5 w-3.5 ${bgColor(colorOne)} border-black border`}
            ></div>
            {colorTwo && (
              <>
                <div className="leading-5"> ↦ </div>
                <div
                  className={`m-1 h-3.5 w-3.5 ${bgColor(colorTwo)} border-black border`}
                ></div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

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
          <DisplayName funcName={funcName} />
        </div>
      )}
    </Draggable>
  );
}
