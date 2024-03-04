import { useCallback } from 'react';
import { Proof } from '../types/Proof';
import { exportCalldataGroth16 } from 'circuits';
import { Hex } from 'viem';
import { InputSignals } from 'circuits/types/proof.types';

async function exportCallDataGroth16(
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
      return await exportCallDataGroth16(input, wasmPath, zkeyPath);
    },
    [wasmPath, zkeyPath]
  );
}
