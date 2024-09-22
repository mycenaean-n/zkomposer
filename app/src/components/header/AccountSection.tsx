import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/solid';
import { Address } from 'viem';
import { truncateAddress } from '../../utils/truncateAddress';
import { Button } from '../ui/Button';
import { CopyAddressToClipboardButton } from './CopyAddressToClipboardButton';
import { Faucet } from './Faucet';

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
      <CopyAddressToClipboardButton
        text={address ? truncateAddress(address) : 'Connect Wallet'}
      />
      <Button
        variant="transparent"
        onClick={logout}
        className="border-l-2 border-solid border-white px-1"
      >
        <ArrowLeftEndOnRectangleIcon className="h-6 w-6 text-white" />
      </Button>
    </>
  );
}
