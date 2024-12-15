import { useProof } from '../../context/ProofContext';

export function useProofSubmission() {
  const {
    generateAndVerifyProof,
    loading,
    error: inputSignalError,
  } = useProof();
  const { nullifyProofCalldata, proofCalldata, error: proofError } = useProof();

  const error = inputSignalError || proofError || null;

  return {
    error,
    loading,
    generateAndVerifyProof,
    proofCalldata,
    nullifyProofCalldata,
  };
}
