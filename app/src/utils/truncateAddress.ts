import { Address } from 'viem';

export function truncateAddress(address: Address) {
  return `${address.slice(0, 7)}...${address.slice(-5)}`;
}
