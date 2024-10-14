import { Proof } from 'circuits/types/proof.types';
// @ts-ignore
import { groth16 } from 'snarkjs';
import { Hex } from 'viem';

type VerificationKey = {
  protocol: string;
  curve: string;
  nPublic: number;
  vk_alpha_1: string[];
  vk_beta_2: string[][];
  vk_gamma_2: string[][];
  vk_delta_2: string[][];
  vk_alphabeta_12: string[][][];
  IC: string[][];
};

export async function verifyGroth16Proof(
  verificationKey: VerificationKey,
  publicSignals: Hex[],
  proof: Proof
): Promise<boolean> {
  try {
    return await groth16.verify(verificationKey, publicSignals, proof);
  } catch (error) {
    console.error('Error verifying proof:', error);
    throw error;
  }
}
