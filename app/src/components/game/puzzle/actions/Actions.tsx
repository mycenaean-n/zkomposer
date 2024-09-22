import { useSubmitPuzzleCallback } from '@hooks/callbacks/useSubmitPuzzleCallback';
import { useVerifyPuzzleSolutionCallback } from '@hooks/callbacks/useVerifyPuzzleCallback';
import { usePrivyWalletAddress } from '@hooks/usePrivyWalletAddress';
import { getCircuitFunctionIndex } from 'circuits';
import { CircuitFunctions } from 'circuits/types/circuitFunctions.types';
import { InputSignals } from 'circuits/types/proof.types';
import { ZKUBE_PUZZLESET_ADDRESS } from 'config';
import { useRouter } from 'next/navigation';
import { useCallback, useContext, useEffect, useState } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { GameMode } from 'types/Game';
import { ZKProof } from 'types/Proof';
import { PuzzleFunctionState } from 'types/Puzzle';
import { zeroAddress } from 'viem';
import { GenerateProof } from '../../../zk/generateProof';
import { PuzzleContext } from '../Puzzle';
import { Function } from './Function';
import { LevelAction } from './LevelAction';

export function Tick() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="3"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function Actions({ id, gameMode }: { id: string; gameMode: GameMode }) {
  const { functions, setFunctions, initConfig } = useContext(PuzzleContext);
  const address = usePrivyWalletAddress() ?? zeroAddress;
  const [inputSignals, setInputSignals] = useState<InputSignals>();
  const [puzzleSolved, setPuzzleSolved] = useState<boolean>(false);
  const [proofGenerationError, setProofGenerationError] = useState<string>();
  const submitPuzzleCallback = useSubmitPuzzleCallback();
  const verifyPuzzleSolutionCallback = useVerifyPuzzleSolutionCallback();
  const router = useRouter();

  useEffect(() => {
    setInputSignals({
      ...initConfig,
      account: address,
      selectedFunctionsIndexes: getCircuitFunctionIndex(functions.chosen),
      availableFunctionsIndexes: getCircuitFunctionIndex(functions.available),
    });
  }, [functions, address]);

  function onDragEnd(result: DropResult) {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId !== destination.droppableId) {
      const sourceFunctionState = source.droppableId as PuzzleFunctionState;
      const destinationFunctionState =
        destination.droppableId as PuzzleFunctionState;
      const sourceFunctions = [...functions[sourceFunctionState]];
      const [removedFunction] = sourceFunctions.splice(source.index, 1);
      const destinationFunctions = [...functions[destinationFunctionState]];
      console.log({ destinationFunctions });

      destinationFunctions.splice(destination.index, 0, removedFunction);
      setFunctions((prev) => ({
        ...prev,
        [sourceFunctionState]: sourceFunctions,
        [destinationFunctionState]: destinationFunctions,
      }));
      console.log({ destinationFunctions });
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

  const submitPuzzleSolution = useCallback(
    (result: ZKProof) => {
      try {
        if (gameMode === 'multiplayer' && id && submitPuzzleCallback) {
          submitPuzzleCallback(BigInt(id), result).then(({ success }) => {
            if (success) {
              setProofGenerationError(undefined);
              setPuzzleSolved(true);
            }
          });
        }
        if (gameMode === 'singleplayer' && id && verifyPuzzleSolutionCallback) {
          verifyPuzzleSolutionCallback(
            ZKUBE_PUZZLESET_ADDRESS,
            BigInt(id),
            result,
            address
          ).then(({ success }) => {
            if (success) {
              setProofGenerationError(undefined);
              setPuzzleSolved(true);
            }
          });
        }
      } catch (e) {
        // TODO: Handle error
        console.error(e);
      }
    },
    [id, submitPuzzleCallback, verifyPuzzleSolutionCallback]
  );

  return (
    <div className="flex flex-col px-2">
      <div className="relative mb-2">
        <div className="absolute -top-24 right-2 flex flex-col md:-top-32 md:right-14">
          <LevelAction
            {...{
              proofGenerationError,
              puzzleSolved,
              id,
              gameMode,
            }}
          />
        </div>
        <GenerateProof
          inputSignals={inputSignals}
          onResult={submitPuzzleSolution}
          onError={setProofGenerationError}
        />
      </div>
      <div className="h-20vh grid grid-cols-2 justify-center gap-2">
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
    </div>
  );
}
