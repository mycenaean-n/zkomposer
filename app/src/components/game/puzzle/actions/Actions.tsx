import { usePrivyWalletAddress } from '@hooks/usePrivyWalletAddress';
import { getCircuitFunctionIndex } from 'circuits';
import { InputSignals } from 'circuits/types/proof.types';
import { useCallback, useContext, useEffect, useState } from 'react';
import { GameMode } from 'types/Game';
import { zeroAddress } from 'viem';
import { useSubmitPuzzleSolutionCallback } from '../../../../hooks/callbacks/useSubmitPuzzleSolution';
import { GenerateProof } from '../../../zk/generateProof';
import { PuzzleContext } from '../Puzzle';
import DragAndDrop from './DragAndDrop';
import { LevelAction } from './LevelAction';

interface State {
  proofGenerated: boolean;
  proofGenerationError?: string;
}

const initialState: State = {
  proofGenerated: false,
  proofGenerationError: undefined,
};

export function Actions({ id, gameMode }: { id: string; gameMode: GameMode }) {
  const { functions, setFunctions, initConfig } = useContext(PuzzleContext);
  const address = usePrivyWalletAddress() ?? zeroAddress;
  const [inputSignals, setInputSignals] = useState<InputSignals>();
  const [proofState, setProofState] = useState<State>(initialState);
  const submitPuzzleSolution = useSubmitPuzzleSolutionCallback(gameMode, id);

  const setPuzzleSolved = useCallback((solved: boolean) => {
    setProofState((prevState) => ({ ...prevState, proofGenerated: solved }));
  }, []);

  const setPuzzleProofGenerationError = useCallback((error?: string) => {
    setProofState((prevState) => ({
      ...prevState,
      proofGenerationError: error,
    }));
  }, []);

  useEffect(() => {
    const _inputSignals: InputSignals = {
      initialGrid: initConfig.initialGrid,
      finalGrid: initConfig.finalGrid,
      account: address,
      selectedFunctionsIndexes: getCircuitFunctionIndex(functions.chosen),
      availableFunctionsIndexes: getCircuitFunctionIndex(functions.available),
    };

    setInputSignals(_inputSignals);
  }, [functions, address]);

  return (
    <div className="flex flex-col px-2">
      <div className="relative mb-2">
        <div className="absolute -top-24 right-2 flex flex-col md:-top-32 md:right-14">
          <LevelAction
            {...{
              proofGenerationError: proofState.proofGenerationError,
              puzzleSolved: proofState.proofGenerated,
              id,
              gameMode,
            }}
          />
        </div>
        <GenerateProof
          inputSignals={inputSignals}
          onClick={submitPuzzleSolution}
          onError={setPuzzleProofGenerationError}
          onResult={setPuzzleSolved}
        />
      </div>
      <DragAndDrop {...{ functions, setFunctions }} />
    </div>
  );
}
