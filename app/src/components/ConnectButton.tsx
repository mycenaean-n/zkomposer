'use client';
import { usePrivy } from '@privy-io/react-auth';
import { truncateAddress } from '../utils/truncateAddress';

export function ConnectButton() {
  const { ready, authenticated, login, user } = usePrivy();

  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  return (
    <>
      {!disableLogin ? (
        <button
          className="bg-white text-black font-bold py-2 px-4 rounded "
          disabled={disableLogin}
          onClick={login}
        >
          Log in
        </button>
      ) : (
        <div className="text-white font-bold py-2 px-4 rounded ">
          {user?.wallet &&
            truncateAddress(user.wallet.address as `0x${string}`)}
        </div>
      )}
    </>
  );
}
