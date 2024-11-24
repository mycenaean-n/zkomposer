import { InputSignals } from 'circuits/types/proof.types';
import { GameMode } from '../../types/Game';
import { LevelAction } from '../game/actions/LevelAction';
import { Button } from '../ui/Button';
import { useProofGeneration } from './hooks/useProofGeneration';

const isSignalMissing = (inputSignals: Partial<InputSignals> | undefined) => {
  if (!inputSignals) return true;
  return Object.values(inputSignals).some((signal) => signal == null);
};

export function GenerateProof({ gameMode }: { gameMode: GameMode }) {
  const {
    loading: generateProofLoading,
    proofCalldata,
    generateAndVerifyProof,
    error,
  } = useProofGeneration();

  console.log({ error });

  return (
    <div className="relative mb-2 h-full">
      <Button
        className="min-h-8 w-full border border-black p-1 text-white shadow-md shadow-black/50 transition-transform hover:-translate-y-px hover:shadow-lg hover:shadow-black/50"
        variant="primary"
        disabled={!!error}
        loading={generateProofLoading}
        onClick={generateAndVerifyProof}
        type="button"
        rounded
      >
        Verify Result
      </Button>
      <LevelAction
        {...{
          proofCalldata,
          gameMode,
          error,
        }}
      />
    </div>
  );
}
