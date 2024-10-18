import * as ethers from 'ethers';
import { LogEvent } from './abi.support';
import { ABI_JSON } from './ZKube.abi';

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
  SolutionSubmitted: new LogEvent<
    [puzzleSet: string, puzzleId: bigint, player: string, block: bigint] & {
      puzzleSet: string;
      puzzleId: bigint;
      player: string;
      block: bigint;
    }
  >(abi, '0xb2776df0a637442a6662a9f50a757a8b1a7485308d89d31e44b847c5c1600d07'),
};
