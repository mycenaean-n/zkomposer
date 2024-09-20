import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/solid';
import { Address } from 'viem';
import { truncateAddress } from '../../utils/truncateAddress';
import { CopyAddressToClipboardButton } from './CopyAddressToClipboardButton';
import { Faucet } from './Faucet';

function LogOutButton({ logout }: { logout: () => void }) {
  return (
    <button
      onClick={logout}
      type="submit"
      className="border-l-2 border-solid px-2"
    >
      <ArrowLeftEndOnRectangleIcon className="h-6 w-6 text-white" />
    </button>
  );
}

export function AccountSection({
  logout,
  address,
}: {
  logout: () => void;
  address: Address;
}) {
  return (
    <>
      <Faucet />
      <CopyAddressToClipboardButton text={truncateAddress(address)} />
      <LogOutButton logout={logout} />
    </>
  );
}
