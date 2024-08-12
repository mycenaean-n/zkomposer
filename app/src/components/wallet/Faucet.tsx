import { useFaucetCallback } from '@hooks/callbacks/useFaucetCallback';

export function Faucet() {
  const { faucetCallback, message: faucetMsg, loading } = useFaucetCallback();

  return (
    <div className="relative inline-block">
      <button
        onClick={() => {
          faucetCallback();
        }}
        className="btn-secondary w-22 rounded-l-md border-2 border-r-black"
      >
        {loading ? (
          <div className="mx-auto h-6 w-6 animate-spin rounded-full border-b-2 border-gray-800"></div>
        ) : (
          'Faucet'
        )}
      </button>
      {faucetMsg && (
        <div className="absolute left-1/2 top-full mt-2 w-max -translate-x-1/2 transform rounded bg-gray-200 px-3 py-2 text-sm text-gray-800 shadow-lg">
          {faucetMsg}
        </div>
      )}
    </div>
  );
}
