import { useContext } from 'react';
import { BlockContext } from '../context/BlockContext';

export const useBlockNumber = () => {
  const blockNumber = useContext(BlockContext);
  return blockNumber
};
