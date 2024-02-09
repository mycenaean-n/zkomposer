import { useContext, useEffect, useState } from 'react';
import { PuzzleContext } from './Puzzle';
import { Proof } from '../zk/types';
import styles from '../styles/actions.module.scss';
import { GenerateProof } from '../zk/generateProof';
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
  ResponderProvided,
} from 'react-beautiful-dnd';
import { PuzzleFunctionState } from '@/types/Puzzle';
import { useAccount } from 'wagmi';
import { getCircuitFunctionIndex } from 'circuits';
import { InputSignals } from 'circuits/types/proof.types';


export function Actions() {
  const { functions, setFunctions, initConfig } = useContext(PuzzleContext);
  const { address } = useAccount();
  const [inputSignals, setInputSignals] = useState<InputSignals>();
  const [proof, setProof] = useState<Proof>();

  useEffect(() => {
    if (!address) return;

    setInputSignals({
      ...initConfig,
      account: address,
      selectedFunctionsIndexes: getCircuitFunctionIndex(functions.chosen),
    });
  }, [functions, address]);

  useEffect(() => {
    if (!proof) return;

    console.log('Proof: ', proof);
  }, [proof]);

  const remainingFunctionsElements = functions.remaining.map(
    (funcName, index) => (
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
              setFunctions((prev) => ({
                remaining: prev.remaining.toSpliced(index, 1),
                chosen: prev.chosen.concat(funcName),
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
    )
  );

  const chosenFunctionsElements = functions.chosen.map((funcName, index) => {
    return (
      <Draggable draggableId={String(funcName)} key={funcName} index={index}>
        {(provided) => (
          <div
            className={styles.function}
            key={index}
            onClick={() => {
              setFunctions((prev) => ({
                remaining: prev.remaining.concat(funcName),
                chosen: prev.chosen.toSpliced(index, 1),
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
  });

  function onDragEnd(result: DropResult, provided: ResponderProvided) {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId != destination.droppableId) {
      const sourceFunctionState = source.droppableId as PuzzleFunctionState;
      const destinationFunctionState =
        destination.droppableId as PuzzleFunctionState;
      const sourceFunctions = [...functions[sourceFunctionState]];
      const [removedFunction] = sourceFunctions.splice(source.index, 1);
      const destinationFunctions = [...functions[destinationFunctionState]];
      destinationFunctions.splice(destination.index, 0, removedFunction);
      setFunctions((prev) => ({
        ...prev,
        [sourceFunctionState]: sourceFunctions,
        [destinationFunctionState]: destinationFunctions,
      }));
    } else if (source.droppableId == destination.droppableId) {
      const functionState = source.droppableId as PuzzleFunctionState;
      const reorderedFunctions = functions[functionState];
      const [removedFunction] = reorderedFunctions.splice(source.index, 1);
      reorderedFunctions.splice(destination.index, 0, removedFunction);
      setFunctions((prev) => ({
        ...prev,
        [functionState]: reorderedFunctions,
      }));
    }
  }

  return (
    <div className={styles.actions}>
      <div className={styles.gameUI}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={PuzzleFunctionState.remaining}>
            {(provided) => (
              <div
                className={styles.availableFunctions}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {remainingFunctionsElements}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId={PuzzleFunctionState.chosen}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                className={styles.chosenFunctions}
                {...provided.droppableProps}
              >
                {chosenFunctionsElements}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className={styles.submit}>
          <GenerateProof
            inputSignals={inputSignals}
            onResult={(result) => setProof(result)}
          />
        </div>
      </div>
    </div>
  );
}
