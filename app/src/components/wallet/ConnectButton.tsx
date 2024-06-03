'use client';
import { usePrivy } from '@privy-io/react-auth';
import { truncateAddress } from '@utils/truncateAddress';
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
          className="btn-secondary-rounded"
          disabled={disableLogin}
          onClick={login}
        >
          Log in
        </button>
      ) : (
        <>
          {user?.wallet && (
            <div className="flex rounded-md border border-solid">
              {!isMobile && (
                <button className="btn-transparent" style={{ color: 'white' }}>
                  {truncateAddress(user.wallet.address as `0x${string}`)}
                </button>
              )}
              <CopyAddressToClipboardButton />
              <button
                onClick={logout}
                type="submit"
                className="btn-secondary rounded-r-md"
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
