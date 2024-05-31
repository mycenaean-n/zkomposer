import { useCallback, useContext, useEffect, useState } from 'react';
import { PuzzleContext } from '../Puzzle';
import styles from '../../../../styles/actions.module.scss';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { PuzzleFunctionState } from '@/src/types/Puzzle';
import { InputSignals } from 'circuits/types/proof.types';
import { ZKUBE_PUZZLESET_ADDRESS } from '../../../../config';
import { useZkube } from '../../../../hooks/useContract';
import { getCircuitFunctionIndex } from 'circuits';
import { Function } from './Function';
import { ZKProof } from '../../../../types/Proof';
import { GenerateProof } from '../../../zk/generateProof';
import { usePrivyWalletAddress } from '../../../../hooks/usePrivyWalletAddress';
import { useRouter } from 'next/navigation';

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

export function Actions({
  id,
  gameMode,
}: {
  id: string;
  gameMode: 'singleplayer' | 'multiplayer';
}) {
  const { functions, setFunctions, initConfig } = useContext(PuzzleContext);
  const address = usePrivyWalletAddress();
  const [inputSignals, setInputSignals] = useState<InputSignals>();
  const [puzzleSolved, setPuzzleSolved] = useState<boolean>(false);
  const [proofGenerationError, setProofGenerationError] = useState<
    Error | undefined
  >();
  const { submitPuzzle, verifyPuzzleSolution } = useZkube();
  const router = useRouter();

  useEffect(() => {
    if (!address) return;

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

  const submitPuzzleSolution = useCallback(
    (result: ZKProof) => {
      try {
        if (gameMode === 'multiplayer' && id && submitPuzzle) {
          submitPuzzle(BigInt(id), result).then((res) => {
            if (res) {
              setProofGenerationError(undefined);
              setPuzzleSolved(true);
            }
          });
        }
        if (gameMode === 'singleplayer' && id && verifyPuzzleSolution) {
          verifyPuzzleSolution(
            ZKUBE_PUZZLESET_ADDRESS,
            BigInt(id),
            result
          ).then((res) => {
            if (res) {
              setProofGenerationError(undefined);
              setPuzzleSolved(true);
            }
          });
        }
      } catch (e) {
        console.error('Error submitting puzzle solution', e);
      }
    },
    [id, submitPuzzle, verifyPuzzleSolution]
  );

  return (
    <div className="flex flex-col px-2">
      <div className="mb-2 relative">
        <div className="flex flex-col absolute -top-32 right-14">
          {(proofGenerationError?.message && (
            <h2 className="text-2xl mt-2">{proofGenerationError?.message}</h2>
          )) ??
            (puzzleSolved && (
              <>
                <div className="flex">
                  <Tick />
                  <h2 className="text-2xl mt-2">Puzzle Solved</h2>
                </div>
                {gameMode === 'singleplayer' && (
                  <button
                    onClick={() => router.push(`/puzzle/${Number(id) + 1}`)}
                    className="text-center border-2 bg-white text-black border-black p-2 rounded-md w-full cursor-pointer font-bold mt-2"
                  >
                    Next Level
                  </button>
                )}
              </>
            ))}
        </div>
        <GenerateProof
          inputSignals={inputSignals}
          onResult={submitPuzzleSolution}
          onError={setProofGenerationError}
        />
      </div>
      <div className={styles.gameUI}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={PuzzleFunctionState.remaining}>
            {(provided) => (
              <div
                className="border border-black border-solid rounded-sm "
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {functions.remaining.map((funcName, i) => (
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
                className="border border-black  rounded-sm"
                {...provided.droppableProps}
              >
                {functions.chosen.map((funcName, i) => (
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
