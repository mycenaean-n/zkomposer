import { InputSignals } from 'circuits/types/proof.types';
import { useEffect, useState } from 'react';
import { zeroAddress } from 'viem';
import { usePrivyWalletAddress } from '../../hooks/usePrivyWalletAddress';
import { GameMode } from '../../types/Game';
import { PuzzleFunctions } from '../../types/Puzzle';
import { LevelAction } from '../game/puzzle/actions/LevelAction';
import { Button } from '../ui/Button';
import { useInputSignals } from './hooks/useInputSignal';
import { useProofGeneration } from './hooks/useProofGeneration';

const isSignalMissing = (inputSignals: Partial<InputSignals> | undefined) => {
  if (!inputSignals) return true;
  return Object.values(inputSignals).some((signal) => signal == null);
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
  const [error, setError] = useState<Error | null>(null);
  const {
    loading: generateProofLoading,
    proofCalldata,
    generateAndVerifyProof,
    error: generateProofError,
  } = useProofGeneration();
  const address = usePrivyWalletAddress() ?? zeroAddress;
  const { inputSignals, error: inputSignalError } = useInputSignals(
    address,
    functions
  );

  useEffect(() => {
    setError(generateProofError);
  }, [generateProofError]);

  useEffect(() => {
    setError(inputSignalError);
  }, [inputSignalError]);

  return (
    <div className="relative mb-2">
      <div className="flex flex-col">
        <Button
          className="min-h-9 w-full border border-black p-1"
          variant="secondary"
          disabled={isSignalMissing(inputSignals)}
          loading={generateProofLoading}
          onClick={() => {
            inputSignals && generateAndVerifyProof(inputSignals);
          }}
          type="button"
          rounded
        >
          Verify Result
        </Button>
      </div>
      <LevelAction
        {...{
          proofCalldata,
          id,
          gameMode,
          error,
        }}
      />
    </div>
  );
}
