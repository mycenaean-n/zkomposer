import { writeFileSync } from 'fs';
import puzzles from '../data/test.puzzles.json';
import { Colors } from '../types/circuitFunctions.types';
import { getCircuitFunctionIndex } from '../utils/circuitFunctionGetter';
import { gridMutator } from './transformers/gridMutator';

const ADDRESS_PLAYER_ONE = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const ADDRESS_PLAYER_TWO = '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69';

export function generateCircuitInput() {
  const initialGrid = puzzles[0.1].initial;

  const targetGrid = gridMutator(initialGrid as Colors[][], [
    'TRANSFORM_YELLOW_RED',
    'EMPTY',
    'EMPTY',
    'EMPTY',
    'EMPTY',
  ]);

  const circuitFunctionArguments = getCircuitFunctionIndex([
    'TRANSFORM_YELLOW_RED',
    'EMPTY',
    'EMPTY',
    'EMPTY',
    'EMPTY',
  ]);

  const availableFunctionsCircuit = getCircuitFunctionIndex([
    'TRANSFORM_YELLOW_RED',
    'STACK_YELLOW',
    'TRANSFORMTWO_YELLOW_YELLOW_RED',
    'REJECT_YELLOW',
    'EMPTY',
    'EMPTY',
    'EMPTY',
    'EMPTY',
  ]);

  const playerOneInput = {
    initialGrid,
    finalGrid: targetGrid,
    availableFunctionsIndexes: availableFunctionsCircuit,
    account: ADDRESS_PLAYER_ONE,
    selectedFunctionsIndexes: circuitFunctionArguments,
  };

  writeFileSync('./zk/input_player_one.json', JSON.stringify(playerOneInput));

  const playerTwoInput = {
    initialGrid,
    finalGrid: targetGrid,
    availableFunctionsIndexes: availableFunctionsCircuit,
    account: ADDRESS_PLAYER_TWO,
    selectedFunctionsIndexes: circuitFunctionArguments,
  };

  writeFileSync('./zk/input_player_two.json', JSON.stringify(playerTwoInput));

  process.exit();
}
