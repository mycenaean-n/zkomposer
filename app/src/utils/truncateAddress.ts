import { Address } from 'viem';

export function truncateAddress(address: Address) {
  return `${address.slice(0, 5)}...${address.slice(-4)}`;
}
