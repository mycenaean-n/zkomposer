import { useCallback } from 'react';
import { Proof, ZKProof } from '../types/Proof';
import { Hex } from 'viem';
import { InputSignals } from 'circuits/types/proof.types';
import { exportCalldataGroth16 } from 'circuits';

async function generateGroth16ProofCalldata(
  input: InputSignals,
  wasmPath: string,
  zkeyPath: string
): Promise<Proof & { Input: string[] }> {
  const calldata = await exportCalldataGroth16(input, wasmPath, zkeyPath);

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

export function useProof(wasmPath: string, zkeyPath: string) {
  return useCallback(
    async (input: InputSignals) => {
      const { a, b, c, Input } = await generateGroth16ProofCalldata(
        input,
        wasmPath,
        zkeyPath
      );

      return {
        a: [BigInt(a[0]), BigInt(a[1])],
        b: [
          [BigInt(b[0][0]), BigInt(b[0][1])],
          [BigInt(b[1][0]), BigInt(b[1][1])],
        ],
        c: [BigInt(c[0]), BigInt(c[1])],
        input: Input.map((x) => BigInt(x)),
      } as ZKProof;
    },
    [wasmPath, zkeyPath]
  );
}
