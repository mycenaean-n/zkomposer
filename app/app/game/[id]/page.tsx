'use client';
import { MultiplayerGame } from '../../../src/components/game/MultiplayerGame';
import { LoginCTA } from '../../../src/components/wallet/LoginCTA';
import { useBlockNumber } from '../../../src/hooks/useBlockNumber';
import { usePrivyWalletAddress } from '../../../src/hooks/usePrivyWalletAddress';

export default function Page({ params }: { params: { id: string } }) {
  const blockNumber = useBlockNumber();
  const account = usePrivyWalletAddress();

  return blockNumber && !account ? (
    <LoginCTA />
  ) : (
    <MultiplayerGame id={params.id} />
  );
}
