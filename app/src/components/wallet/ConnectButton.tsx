'use client';
import { usePrivy } from '@privy-io/react-auth';
import { truncateAddress } from '@utils/truncateAddress';
import { CopyAddressToClipboardButton } from './CopyAddressToClipboardButton';
import { Faucet } from './Faucet';
import {
  ArrowLeftEndOnRectangleIcon,
  WalletIcon,
} from '@heroicons/react/24/solid';
import { Address } from 'viem';

export function ConnectButton() {
  const { ready, authenticated, login, user, logout } = usePrivy();

  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  return (
    <>
      {!disableLogin ? (
        <button
          disabled={disableLogin}
          onClick={login}
          className="flex items-center gap-2 rounded-md border border-solid border-white p-1.5 text-white"
        >
          <WalletIcon className="h-6 w-6" />
          <span className="hidden sm:inline">Log in</span>
        </button>
      ) : (
        <>
          {user?.wallet && (
            <div className="flex rounded-md border border-solid">
              <Faucet />
              <div className="flex">
                <CopyAddressToClipboardButton
                  text={truncateAddress(user.wallet.address as Address)}
                />
                <button onClick={logout} type="submit" className="mr-2">
                  <ArrowLeftEndOnRectangleIcon className="h-6 w-6 text-white" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
