import { useFaucetCallback } from '@hooks/callbacks/useFaucetCallback';

export function Faucet() {
  const { faucetCallback, message: faucetMsg, loading } = useFaucetCallback();

  return (
    <div className="relative inline-block">
      <button
        onClick={faucetCallback}
        className="btn-secondary h-full w-full rounded-l-sm"
      >
        {loading ? (
          <div className="mx-auto h-6 w-6 animate-spin rounded-full border-b-2 border-black"></div>
        ) : (
          <span>Faucet</span>
        )}
      </button>
      {faucetMsg && (
        <div className="absolute left-1/2 top-full mt-1.5 h-max w-max -translate-x-1/2 transform rounded bg-gray-200 px-3 py-2 text-sm text-gray-800 shadow-lg">
          {faucetMsg}
        </div>
      )}
    </div>
  );
}
