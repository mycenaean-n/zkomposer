import QRCode from 'qrcode.react';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

export default function QrInvite() {
  const { copyToClipboard, success: copySuccess } = useCopyToClipboard();

  return (
    <div className="flex flex-col relative mt-8">
      <div className="m-auto mb-2">
        <h1 className="text-4xl">Invite Link</h1>
      </div>
      <div
        className="flex flex-col justify-center mt-8 mx-auto"
        onClick={() => {
          copyToClipboard(window.location.href);
        }}
      >
        <h4 className="mb-2 mx-auto">Click to Copy!</h4>
        <QRCode value={window.location.href} />
      </div>
      {copySuccess && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-max px-3 py-2 bg-gray-200 text-gray-800 text-sm rounded shadow-lg">
          Copied successfully!
        </div>
      )}
    </div>
  );
}
