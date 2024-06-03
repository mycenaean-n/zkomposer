import { groth16 } from 'snarkjs';
import { InputSignals } from '../types/proof.types';

export async function exportCalldataGroth16(
  input: InputSignals,
  wasmPath: string,
  zkeyPath: string
): Promise<string> {
  let _proof, _publicSignals;
  try {
    ({ proof: _proof, publicSignals: _publicSignals } = await groth16.fullProve(
      input,
      wasmPath,
      zkeyPath
    ));
  } catch (err) {
    // prettier-ignore
    if ((err as Error).message.includes('Error in template ForceEqualIfEnabled_15')) {
      throw new Error('Wrong answer, try again!');
    }

    throw new Error((err as Error).message);
  }

  return await groth16.exportSolidityCallData(_proof, _publicSignals);
}
