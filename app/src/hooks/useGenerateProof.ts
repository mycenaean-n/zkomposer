import { useMutation } from '@tanstack/react-query';
import {
  generateGroth16Proof,
  getCircuitFunctionIndex,
  verifyGroth16Proof,
} from 'circuits';
import { AVAILABLE_CIRCUITS } from 'circuits/config';
import { InputSignals } from 'circuits/types/proof.types';
import { groth16 } from 'snarkjs';
import { Address, Hex } from 'viem';
import { usePuzzleContext } from '../providers/PuzzleProvider';
import { Proof, ZKProofCalldata } from '../types/Proof';
import { Puzzle, PuzzleFunctions } from '../types/Puzzle';
import { usePrivyWalletAddress } from './privy/usePrivyWalletAddress';

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

const generateInputSignals = (
  initConfig?: Puzzle,
  functions?: PuzzleFunctions,
  account?: Address
) => {
  if (!account) {
    throw new Error('No account');
  }

  if (!initConfig) {
    throw new Error('No init config');
  }

  if (!functions) {
    throw new Error('No puzzle functions available');
  }

  if (functions.chosen.length > AVAILABLE_CIRCUITS) {
    throw new Error(`More than ${AVAILABLE_CIRCUITS} functions chosen`);
  }

  if (!functions.chosen || !functions.available) {
    throw new Error('No puzzle functions available');
  }

  return {
    initialGrid: initConfig.initialGrid,
    finalGrid: initConfig.finalGrid,
    account,
    selectedFunctionsIndexes: getCircuitFunctionIndex(functions.chosen),
    availableFunctionsIndexes: getCircuitFunctionIndex(functions.available),
  };
};

const generateProof = async (signals: InputSignals | undefined) => {
  if (!signals) {
    throw new Error('No signals');
  }

  const checks = {
    'Initial grid': signals.initialGrid,
    'Final grid': signals.finalGrid,
    Account: signals.account,
    'Selected functions': signals.selectedFunctionsIndexes,
  };

  for (const [name, value] of Object.entries(checks)) {
    if (!value) {
      throw new Error(`${name} is not ready`);
    }
  }

  const { proof, publicSignals } = await generateGroth16Proof(
    signals,
    '/zk/zkube.wasm',
    '/zk/zkube_final.zkey'
  );

  const success = await verifyGroth16Proof(
    await import('../../public/zk/zkube_verification_key.json'),
    publicSignals,
    proof
  );

  if (!success) {
    throw new Error('Proof verification failed');
  }

  return generateGroth16ProofCalldataParsed(proof, publicSignals);
};

export const useGenerateProof = () => {
  const { initConfig, functions } = usePuzzleContext();
  const { address } = usePrivyWalletAddress();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: () => {
      const inputSignals = generateInputSignals(initConfig, functions, address);
      const proof = generateProof(inputSignals);
      return proof;
    },
  });

  return { mutateAsync, isPending, error };
};
