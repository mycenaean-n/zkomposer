'use client';
import { usePrivy } from '@privy-io/react-auth';
import { truncateAddress } from '../../utils/truncateAddress';
import { CopyAddressToClipboardButton } from './CopyAddressToClipboardButton';
import { isMobile } from 'react-device-detect';

export function ConnectButton() {
  const { ready, authenticated, login, user, logout } = usePrivy();

  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  return (
    <>
      {!disableLogin ? (
        <button
          className="rounded bg-white px-4 py-2 font-bold text-black"
          disabled={disableLogin}
          onClick={login}
        >
          Log in
        </button>
      ) : (
        <>
          {user?.wallet && (
            <div className="flex rounded border border-solid">
              {!isMobile && (
                <button className="rounded px-4 py-2 font-bold text-white">
                  {truncateAddress(user.wallet.address as `0x${string}`)}
                </button>
              )}
              <CopyAddressToClipboardButton />
              <button
                onClick={logout}
                type="submit"
                className="bg-white px-4 py-2 font-bold text-black"
              >
                Sign out
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
