#!/bin/bash

# Number of blocks to mine
NUM_BLOCKS=30

# URL of the Anvil node
URL="http://127.0.0.1:8545"

for ((i=1; i<=NUM_BLOCKS; i++))
do
  curl -X POST --header "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"evm_mine","params":[],"id":'"$i"'}' \
  $URL
  echo "Mined block $i"
done
