import { usePrivyWalletAddress } from '@hooks/usePrivyWalletAddress';
import { useCopyToClipboard } from '@hooks/useCopyToClipboard';

export function CopyAddressToClipboardButton({
  text = 'Copy Address',
}: {
  text: string;
}) {
  const address = usePrivyWalletAddress();
  const { copyToClipboard, success: copySuccess } = useCopyToClipboard();

  return (
    <div className="relative inline-block">
      <button
        onClick={() => {
          copyToClipboard(address);
        }}
        className="btn-transparent"
        style={{ color: 'white' }}
      >
        {text}
      </button>
      {copySuccess && (
        <div className="absolute left-1/2 top-full mt-2 w-max -translate-x-1/2 transform rounded bg-gray-200 px-3 py-2 text-sm text-gray-800 shadow-lg">
          Copied successfully!
        </div>
      )}
    </div>
  );
}
