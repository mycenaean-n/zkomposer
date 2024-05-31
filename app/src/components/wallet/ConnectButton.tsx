'use client';
import { usePrivy } from '@privy-io/react-auth';
import { truncateAddress } from '../../utils/truncateAddress';
import { CopyAddressToClipboardButton } from './CopyAddressToClipboardButton';
import { isMobile } from 'react-device-detect';

export function ConnectButton() {
  const { ready, authenticated, login, user, logout } = usePrivy();

  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready ?? (ready && authenticated);

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
        <>
          {user?.wallet && (
            <div className="flex border border-solid rounded">
              {!isMobile && (
                <button className="text-white font-bold py-2 px-4 rounded">
                  {truncateAddress(user.wallet.address as `0x${string}`)}
                </button>
              )}
              <CopyAddressToClipboardButton />
              <button
                onClick={logout}
                type="submit"
                className="bg-white text-black font-bold py-2 px-4"
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
