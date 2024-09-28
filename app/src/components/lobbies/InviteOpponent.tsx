import { useCopyToClipboard } from '@hooks/useCopyToClipboard';
import QRCode from 'qrcode.react';

export function InviteOpponent({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { copyToClipboard, success: copySuccess } = useCopyToClipboard();

  return (
    <div className="mx-auto flex flex-col">
      <div className="mt-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold">Invite Opponent</h1>
      </div>
      <div className="mx-auto mt-8 max-w-56">
        <div
          className="bg-secondary mx-auto mt-2 flex w-full flex-col justify-center rounded-md"
          onClick={() => {
            copyToClipboard(window.location.href);
          }}
        >
          <QRCode
            style={{ width: '100%', height: '100%' }}
            size={208}
            value={window.location.href}
            bgColor="transparent"
          />
        </div>
        <div className="bg-secondary border-primary my-4 grid grid-cols-3 gap-4 rounded-md border-2 p-2">
          <div className="flex items-center justify-center">
            <TwitterIcon />
          </div>
          <div className="flex items-center justify-center">
            <FarcasterIcon />
          </div>
          <div className="flex items-center justify-center">
            <CopyIcon />
          </div>
        </div>
        <div className="text-primary bg-secondary overflow-hidden overflow-ellipsis rounded-md p-1 text-sm">
          {window.location.href}
        </div>
        {copySuccess && (
          <div className="absolute left-1/2 top-full mt-2 w-max -translate-x-1/2 transform rounded bg-gray-200 px-3 py-2 text-sm text-gray-800 shadow-lg">
            Copied successfully!
          </div>
        )}
      </div>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-primary"
    >
      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
    </svg>
  );
}

function FarcasterIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-primary"
    >
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm-1-8.5V7h2v6.5h-2zm0 3v-2h2v2h-2z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-primary"
    >
      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
    </svg>
  );
}
