import { useCopyToClipboard } from '@hooks/useCopyToClipboard';
import { usePrivyWalletAddress } from '@hooks/usePrivyWalletAddress';
import { Button } from '../ui/Button';
import { Tooltip } from '../ui/Tooltip';

export function CopyAddressToClipboardButton({
  text = 'Copy Address',
}: {
  text: string;
}) {
  const address = usePrivyWalletAddress();
  const { copyToClipboard, success: copySuccess } = useCopyToClipboard();

  return (
    <div className="relative inline-block">
      <Button
        variant="transparent"
        onClick={() => copyToClipboard(address)}
        className="text-white"
        disabled={!address}
      >
        <span>{text}</span>
      </Button>
      {copySuccess && <Tooltip>Copied successfully!</Tooltip>}
    </div>
  );
}
