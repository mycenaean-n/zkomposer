'use client';
import { WalletIcon } from '@heroicons/react/24/solid';
import { usePrivy } from '@privy-io/react-auth';
import { Address } from 'viem';
import { AccountSection } from '../header/AccountSection';

function LogInButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="flex items-center gap-2 rounded-md border border-solid border-white p-2 text-white"
    >
      <WalletIcon className="h-5 w-5" />
      <span className="hidden sm:inline">Log in</span>
    </button>
  );
}

export function ConnectButton() {
  const { ready, authenticated, login, user, logout } = usePrivy();

  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  return (
    <div className="flex justify-between">
      {!disableLogin ? (
        <LogInButton onClick={login} disabled={disableLogin} />
      ) : (
        <>
          {user?.wallet?.address ? (
            <AccountSection
              logout={logout}
              address={user.wallet.address as Address}
            />
          ) : null}
        </>
      )}
    </div>
  );
}
