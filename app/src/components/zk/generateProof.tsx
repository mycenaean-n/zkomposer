import { useProof } from '@hooks/useProof';
import { getCircuitFunctionIndex } from 'circuits';
import { InputSignals } from 'circuits/types/proof.types';
import { useContext, useEffect, useState } from 'react';
import { zeroAddress } from 'viem';
import { useSubmitPuzzleSolutionCallback } from '../../hooks/callbacks/useSubmitPuzzleSolution';
import { usePrivyWalletAddress } from '../../hooks/usePrivyWalletAddress';
import { GameMode } from '../../types/Game';
import { PuzzleFunctions } from '../../types/Puzzle';
import { LevelAction } from '../game/puzzle/actions/LevelAction';
import { PuzzleContext } from '../game/puzzle/Puzzle';
import { Button } from '../ui/Button';

interface State {
  proofGenerated: boolean;
  proofGenerationError?: string;
}

const initialState: State = {
  proofGenerated: false,
  proofGenerationError: undefined,
};

export function GenerateProof({
  gameMode,
  id,
  functions,
}: {
  gameMode: GameMode;
  id: string;
  functions: PuzzleFunctions;
}) {
  const [generatingProof, setGenerationgProof] = useState<boolean>(false);
  const [inputSignals, setInputSignals] = useState<InputSignals>();
  const [proofState, setProofState] = useState<State>(initialState);
  const address = usePrivyWalletAddress() ?? zeroAddress;
  const { initConfig } = useContext(PuzzleContext);
  const proofCallback = useProof('/zk/zkube.wasm', '/zk/zkube_final.zkey');
  const submitPuzzleSolution = useSubmitPuzzleSolutionCallback(gameMode, id);

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

  if (!inputSignals) {
    return (
      <Button
        className="min-h-9 w-full border border-black bg-gray-200 p-1"
        rounded={true}
        variant="primary"
        disabled={true}
      >
        Disabled
      </Button>
    );
  }

  const handleGenerateProof = async (signals: InputSignals) => {
    const checks = {
      'Initial grid': signals.initialGrid,
      'Final grid': signals.finalGrid,
      Account: signals.account,
      'Selected functions': signals.selectedFunctionsIndexes,
    };

    for (const [name, value] of Object.entries(checks)) {
      if (!value) {
        alert(`${name} is not ready`);
        return;
      }
    }

    setGenerationgProof(true);
    try {
      const res = await proofCallback({ ...signals });
      const submitRes = await submitPuzzleSolution(res);
      setGenerationgProof(false);
      if (submitRes) {
        setProofState((prevState) => ({
          ...prevState,
          proofGenerated: submitRes.solved,
        }));
      }
    } catch (e) {
      setGenerationgProof(false);
      setProofState((prevState) => ({
        ...prevState,
        proofGenerationError: (e as Error).message,
      }));
    }
  };

  const isAnySignalMissing = Object.values(inputSignals).some(
    (signal) => signal === null || signal === undefined
  );

  return (
    <div className="relative mb-2">
      {!proofState.proofGenerated ? (
        <div className="flex flex-col">
          {proofState.proofGenerationError ? (
            <div className="absolute bottom-10 right-0 flex">
              <h2 className="text-sm md:text-base">
                {proofState.proofGenerationError}
              </h2>
            </div>
          ) : null}
          <Button
            className="min-h-9 w-full border border-black p-1"
            rounded={true}
            variant="secondary"
            disabled={isAnySignalMissing || generatingProof}
            onClick={() => handleGenerateProof(inputSignals)}
            type="button"
          >
            Submit Result
          </Button>
        </div>
      ) : (
        <LevelAction
          {...{
            proofGenerationError: proofState.proofGenerationError,
            puzzleSolved: proofState.proofGenerated,
            id,
            gameMode,
          }}
        />
      )}
    </div>
  );
}
