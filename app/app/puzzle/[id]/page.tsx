'use client';
import { usePrivy } from '@privy-io/react-auth';
import { SinglePlayerGame } from '../../../src/components/game/SinglePlayerGame';
import { LoginCTA } from '../../../src/components/wallet/LoginCTA';
import { usePrivyWalletAddress } from '../../../src/hooks/usePrivyWalletAddress';

export default function Page({ params }: { params: { id: string } }) {
  const address = usePrivyWalletAddress();

  return address ? <SinglePlayerGame id={params.id} /> : <LoginCTA />;
}
