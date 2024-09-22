import { useFaucetCallback } from '@hooks/callbacks/useFaucetCallback';
import { Button } from '../ui/Button';
import { Tooltip } from '../ui/Tooltip';

export function Faucet() {
  const { faucetCallback, message: faucetMsg, loading } = useFaucetCallback();

  return (
    <div className="relative inline-block">
      <Button
        variant="secondary"
        onClick={faucetCallback}
        className="min-w-[5rem] rounded-l-sm"
        disabled={loading}
      >
        Faucet
      </Button>
      {faucetMsg && <Tooltip>{faucetMsg}</Tooltip>}
    </div>
  );
}
