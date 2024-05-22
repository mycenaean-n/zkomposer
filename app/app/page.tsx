'use client';
import { Games } from '@/src/components/lobbies/Games';
import { usePrivyWalletAddress } from '../src/hooks/usePrivyWalletAddress';
import { LoginCTA } from '../src/components/wallet/LoginCTA';

export default function Home() {
  return <Games />;
}
