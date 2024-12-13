import { LevelAction } from '../game/actions/LevelAction';
import { Button } from '../ui/Button';
import { useProofGeneration } from './hooks/useProofGeneration';

export function GenerateProof() {
  const {
    loading: generateProofLoading,
    generateAndVerifyProof,
    error,
  } = useProofGeneration();

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
      <LevelAction />
    </div>
  );
}
