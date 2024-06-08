import { NextRequest, NextResponse } from 'next/server';
import { Address, createClient, Hex, http, parseEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { arbitrumSepolia } from 'viem/chains';
import dotenv from 'dotenv';
import { sendTransaction, waitForTransactionReceipt } from 'viem/actions';
import { truncateAddress } from '../../../src/utils/truncateAddress';

dotenv.config();
// Set up the provider and wallet
const client = createClient({
  transport: http(),
  chain: arbitrumSepolia,
  account: privateKeyToAccount(process.env.PRIV_KEY as Hex),
});

export async function POST(req: NextRequest) {
  if (!req.body) {
    return NextResponse.json({ message: 'Invalid address' }, { status: 400 });
  }
  const { address } = await req.json();

  try {
    const amount = parseEther('0.001');

    console.log({ address });

    const txHash = await sendTransaction(client, {
      to: address as Address,
      value: amount,
      chain: arbitrumSepolia,
    });

    await waitForTransactionReceipt(client, {
      hash: txHash,
    });

    return NextResponse.json({
      message: `Sent 0.001 ETH to ${truncateAddress(address as Address)}`,
    });
  } catch (error) {
    console.error((error as Error).message);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
