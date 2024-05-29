import { Address, Chain } from 'viem';
import { arbitrumSepolia, scrollSepolia } from 'wagmi/chains';

type AddressMap = { [chainId: Chain['id']]: Address };

export const ZKUBE_ADDRESS: AddressMap = {
  '31337': '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  [scrollSepolia.id]: '0x7C3736F3B712510a7AAaa5387704A79E4D3B693a',
  [arbitrumSepolia.id]: '0xd98f77077a776481557ff562d19799809a71e05f',
};
export const ZKUBE_PUZZLESET_ADDRESS: AddressMap = {
  '31337': '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
  [scrollSepolia.id]: '0xEFD71261427D1e1bbdD6D40C3E79F135BB43192c',
  [arbitrumSepolia.id]: '0x13cd31c4c3345e712a6501a040e8278b15107b32',
};
