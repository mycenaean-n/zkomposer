import { assert } from 'chai';
import { wasm, WasmTester } from 'circom_tester';
import { readFileSync } from 'fs';
import path from 'path';
import { GRID_HEIGHT, GRID_WIDTH } from '../config';
import { circuitFunctionsArray } from '../types/circuitFunctions.types';
import { getCircuitFunctionIndex } from '../utils/circuitFunctionGetter';
import { gridMutator } from '../utils/transformers/gridMutator';
import { calculateLabeledWitness } from './utils/calculateLabeledWitness';

describe.only('zkube circuit', () => {
  let circuit: WasmTester;

  const sanityCheck = true;
  const address = '0x123';

  before(async () => {
    circuit = await wasm(path.join(__dirname, '../circuits/zkube.circom'));
  });

  it(`testing custom`, async () => {
    const file = readFileSync(
      path.join(__dirname, `./data/fuzzing-results.json`)
    );
    const data = JSON.parse(file.toString());
    const { selectedFunctions, initialGrid, availableFunctions } = data[137];

    // const initialGrid = initialGrid;
    const targetGrid = gridMutator(initialGrid, selectedFunctions);

    const selectedFunctionsIndexes = getCircuitFunctionIndex([
      ...([
        'TRANSFORMTWO_YELLOW_BLUE_RED',
        'EMPTY',
        'EMPTY',
        'EMPTY',
        'EMPTY',
      ] as any),
    ]);

    // console.log({
    //   selected: { selectedFunctionsIndexes, selectedFunctions },
    // });

    const availableFunctionsIndexes = [...availableFunctions].map((f) =>
      circuitFunctionsArray.indexOf(f)
    );

    // console.log({
    //   available: { availableFunctionsIndexes, availableFunctions },
    // });

    const witness = await calculateLabeledWitness(
      circuit,
      {
        initialGrid,
        finalGrid: targetGrid,
        availableFunctionsIndexes,
        account: address,
        selectedFunctionsIndexes,
      },
      sanityCheck
    );

    console.log({
      initialGrid,
      targetGrid,
    });

    // console.log({
    //   initialGrid,
    //   prettyFinalFromCircuit: prettyFinalFromCircuit(witness),
    //   targetGrid,
    // });

    for (let i = 0; i < GRID_WIDTH; i++) {
      for (let j = 0; j < GRID_HEIGHT; j++) {
        assert.propertyVal(
          witness,
          `main.finalGridForPlayer[${i}][${j}]`,
          String(targetGrid[i][j])
        );
      }
    }
  });
});

function prettyFinalFromCircuit(witness: any) {
  return Array.from({ length: GRID_WIDTH }, (_, i) => {
    return Array.from({ length: GRID_HEIGHT }, (_, j) => {
      return witness[`main.finalGridForPlayer[${i}][${j}]`];
    });
  });
}
