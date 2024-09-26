import { Dispatch, SetStateAction } from 'react';

export function useInputContainerClickCallback(
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
) {
  const inputContainerClickCallback = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };
  return inputContainerClickCallback;
}
