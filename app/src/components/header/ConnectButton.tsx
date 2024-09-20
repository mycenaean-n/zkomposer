'use client';
import { WalletIcon } from '@heroicons/react/24/solid';
import { usePrivy } from '@privy-io/react-auth';
import { Address } from 'viem';
import { AccountSection } from './AccountSection';

export function ConnectButton() {
  const { ready, authenticated, login, user, logout } = usePrivy();

  return (
    <div className="flex justify-between rounded-md border-2 border-solid">
      {!ready ? (
        <div className="flex items-center gap-2 px-2 py-0.5 text-white md:px-4 md:py-1">
          <span>Retrieving data</span>
          <div className="spinner border-white"></div>
        </div>
      ) : null}
      {ready && !user?.wallet?.address ? (
        <LogInButton onClick={login} disabled={authenticated} />
      ) : null}
      {user?.wallet?.address && authenticated ? (
        <AccountSection
          logout={logout}
          address={user.wallet.address as Address}
        />
      ) : null}
    </div>
  );
}

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
      className="btn-primary flex items-center gap-2 rounded-md"
    >
      <WalletIcon className="h-5 w-5" />
      <span className="inline">Log in</span>
    </button>
  );
}
