import copy from 'copy-to-clipboard';
import QRCode from 'qrcode.react';
import React, { useContext, useState } from 'react';
import { GamesContext } from '../../context/GamesContext';
import styles from '../../styles/createGame.module.scss';

export default function QrModal({
  setInputsShowing,
}: {
  setInputsShowing: (showing: boolean) => void;
}) {
  const [copySuccess, setCopySuccess] = useState(false);

  function copyLinkToClipboard() {
    const isCoppied = copy(window.location.href);
    setCopySuccess(isCoppied);
  }

  function onInputContainerClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      setInputsShowing(false);
    }
  }

  return (
    <div className={styles.inputsContainer} onClick={onInputContainerClick}>
      <div className="flex flex-col relative">
        <div className="m-auto mb-2">
          <h2>Game Link</h2>
        </div>
        <div className="flex justify-center" onClick={copyLinkToClipboard}>
          <QRCode value={window.location.href} />
        </div>
        {copySuccess && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-max px-3 py-2 bg-gray-200 text-gray-800 text-sm rounded shadow-lg">
            Copied successfully!
          </div>
        )}
      </div>
    </div>
  );
}
