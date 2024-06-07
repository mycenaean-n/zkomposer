import { NextResponse } from 'next/server';
import {
  Address,
  createClient,
  createPublicClient,
  Hex,
  http,
  parseEther,
} from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { arbitrumSepolia } from 'viem/chains';
import dotenv from 'dotenv';
import { sendTransaction, waitForTransactionReceipt } from 'viem/actions';
import { NextApiRequest } from 'next';

dotenv.config();
// Set up the provider and wallet
const client = createClient({
  transport: http(),
  chain: arbitrumSepolia,
  account: privateKeyToAccount(process.env.PRIV_KEY as Hex),
});

export async function POST(req: NextApiRequest) {
  if (!req.body) {
    return NextResponse.json({ message: 'Invalid address' }, { status: 400 });
  }
  const { address }: { address: string } = await req.body;

  try {
    // Amount to send (0.01 ETH)
    const amount = parseEther('0.001');

    const txHash = await sendTransaction(client, {
      to: address as Address,
      value: amount,
      chain: arbitrumSepolia,
    });
    const receipt = await waitForTransactionReceipt(client, {
      hash: txHash,
    });

    return NextResponse.json({
      message: `Sent 0.001 ETH to ${address}. Transaction hash: ${receipt.transactionHash}`,
    });
  } catch (error) {
    console.error((error as Error).message);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
