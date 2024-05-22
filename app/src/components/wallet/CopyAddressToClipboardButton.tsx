import React, { useState } from 'react';
import { usePrivyWalletAddress } from '../../hooks/usePrivyWalletAddress';
import copy from 'copy-to-clipboard';

export const CopyAddressToClipboardButton = () => {
  const address = usePrivyWalletAddress();
  const [copySuccess, setCopySuccess] = useState(false);

  function copyAddressToClipboard() {
    const isCoppied = copy(address);
    setCopySuccess(isCoppied);
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={copyAddressToClipboard}
        className="bg-white text-black font-bold py-2 px-4  border-r-2 border-black "
      >
        Copy Address
      </button>
      {copySuccess && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-max px-3 py-2 bg-gray-200 text-gray-800 text-sm rounded shadow-lg">
          Copied successfully!
        </div>
      )}
    </div>
  );
};
