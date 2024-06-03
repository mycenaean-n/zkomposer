import copy from 'copy-to-clipboard';

function copyToClipboard(stringToCopy?: string) {
  return () => {
    if (!stringToCopy) {
      console.error('Nothing to copy!');
      return { success: false };
    }

    const success = copy(stringToCopy);
    return { success };
  };
}

export function delayedCopyToClipboard(stringToCopy?: string) {
  const initialCopy = copyToClipboard(stringToCopy);

  return () => {
    const result = initialCopy();

    if (result.success) {
      setTimeout(() => {
        return { success: false };
      }, 1500);
    }

    return result;
  };
}
