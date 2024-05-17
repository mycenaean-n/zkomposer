'use client';
import { usePrivy } from '@privy-io/react-auth';

export function ConnectButton() {
  const { ready, authenticated, login } = usePrivy();

  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  return (
    // design login button with tailwindcss. it will appear on a black background
    <button
      className="bg-white text-black font-bold py-2 px-4 rounded "
      disabled={disableLogin}
      onClick={login}
    >
      Log in
    </button>
  );
}
