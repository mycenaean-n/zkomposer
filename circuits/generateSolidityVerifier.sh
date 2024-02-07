#!/bin/bash
CIRCUIT=zkube
CONTRACT=ZKube

echo "----- Generate Solidity verifier -----"
# Generate a Solidity verifier that allows verifying proofs on Ethereum blockchain
yarn snarkjs zkey export solidityverifier ./zk/${CIRCUIT}_final.zkey ./zk/${CONTRACT}Verifier.sol
# Update the contract name in the Solidity verifier
sed -i '' "s/contract Groth16Verifier/contract ${CONTRACT}Verifier/g" ./zk/${CONTRACT}Verifier.sol
echo "----- Generate and print parameters of call -----"
