import QRCode from 'qrcode.react';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

export default function QrInvite() {
  const { copyToClipboard, success: copySuccess } = useCopyToClipboard();

  return (
    <div className="relative mt-8 flex flex-col">
      <div className="m-auto mb-2">
        <h1 className="text-4xl">Invite Link</h1>
      </div>
      <div
        className="mx-auto mt-8 flex flex-col justify-center"
        onClick={() => {
          copyToClipboard(window.location.href);
        }}
      >
        <h4 className="mx-auto mb-2">Click to Copy!</h4>
        <QRCode value={window.location.href} />
      </div>
      {copySuccess && (
        <div className="absolute left-1/2 top-full mt-2 w-max -translate-x-1/2 transform rounded bg-gray-200 px-3 py-2 text-sm text-gray-800 shadow-lg">
          Copied successfully!
        </div>
      )}
    </div>
  );
}
