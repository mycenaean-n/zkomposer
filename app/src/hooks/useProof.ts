import { groth16 } from 'snarkjs';
import { Hex } from 'viem';
import { Proof, ZKProofCalldata } from '../types/Proof';

async function generateGroth16ProofCalldata(
  proof: Proof,
  publicSignals: Hex[]
): Promise<Proof & { Input: string[] }> {
  const calldata = await groth16.exportSolidityCallData(proof, publicSignals);

  const argv = calldata
    .replace(/["[\]\s]/g, '')
    .split(',')
    .map((x: string) => BigInt(x).toString()) as Hex[];

  const a: Proof['a'] = [argv[0], argv[1]];
  const b: Proof['b'] = [
    [argv[2], argv[3]],
    [argv[4], argv[5]],
  ];
  const c: Proof['c'] = [argv[6], argv[7]];
  const Input = [];

  for (let i = 8; i < argv.length; i++) {
    Input.push(argv[i]);
  }

  return { a, b, c, Input };
}

export async function generateGroth16ProofCalldataParsed(
  proof: Proof,
  publicSignals: `0x${string}`[]
): Promise<ZKProofCalldata> {
  const { a, b, c, Input } = await generateGroth16ProofCalldata(
    proof,
    publicSignals
  );

  return {
    a: [BigInt(a[0]), BigInt(a[1])],
    b: [
      [BigInt(b[0][0]), BigInt(b[0][1])],
      [BigInt(b[1][0]), BigInt(b[1][1])],
    ],
    c: [BigInt(c[0]), BigInt(c[1])],
    input: Input.map((x) => BigInt(x)),
  };
}
