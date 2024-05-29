#!/bin/bash

osascript -e 'tell application "Terminal" to do script "anvil"'
osascript -e 'tell application "Terminal" to do script "cd app && yarn dev && cd -"'
osascript -e 'tell application "Terminal" to do script "cd indexer && yarn db:down && yarn db:up && yarn db:migration:generate && yarn db:migration:apply && yarn build && yarn start && cd -"'
osascript -e 'tell application "Terminal" to do script "cd indexer && yarn gql:serve && cd -"'
osascript -e 'tell application "Terminal" to do script "cd contracts && forge script script/DeployZkube.s.sol --fork-url http://localhost:8545 --broadcast --private-keys 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 && forge script script/AddPuzzles.s.sol --fork-url http://localhost:8545 --broadcast --private-keys 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 && cd -"'

