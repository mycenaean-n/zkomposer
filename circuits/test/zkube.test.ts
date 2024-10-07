import { assert } from 'chai';
import { wasm, WasmTester } from 'circom_tester';
import path from 'path';
import config from '../config';
import {
  CircuitFunctions,
  circuitFunctionsArray,
  Puzzle,
} from '../types/circuitFunctions.types';
import { getCircuitFunctionIndex } from '../utils/circuitFunctionGetter';
import { gridMutator } from '../utils/transformers/gridMutator';
import { calculateLabeledWitness } from './utils/calculateLabeledWitness';
const puzzles: Puzzle = require('../data/test.puzzles.json');

type Level = {
  lvl: '0.1';
  args: CircuitFunctions[];
  availableFunctions: CircuitFunctions[];
};
const levels: Level[] = [
  {
    lvl: '0.1',
    args: [
      'STACK_RED',
      'STACK_YELLOW',
      'TRANSFORMTWO_RED_BLUE_RED',
      'REJECT_RED',
      'FILTER_RED',
    ],
    availableFunctions: [
      'STACK_RED',
      'STACK_YELLOW',
      'TRANSFORMTWO_RED_BLUE_RED',
      'REJECT_RED',
      'FILTER_RED',
      'EMPTY',
      'EMPTY',
      'EMPTY',
    ],
  },
  {
    lvl: '0.1',
    args: [
      'FILTER_BLUE',
      'REJECT_RED',
      'TRANSFORM_YELLOW_RED',
      'STACK_RED',
      'TRANSFORMTWO_RED_BLUE_RED',
    ],
    availableFunctions: [
      'FILTER_BLUE',
      'REJECT_RED',
      'TRANSFORM_YELLOW_RED',
      'STACK_RED',
      'TRANSFORMTWO_RED_BLUE_RED',
      'EMPTY',
      'EMPTY',
      'EMPTY',
    ],
  },
  {
    lvl: '0.1',
    args: [
      'TRANSFORMTWO_RED_BLUE_RED',
      'FILTER_BLUE',
      'REJECT_RED',
      'TRANSFORM_YELLOW_RED',
      'FILTER_RED',
    ],
    availableFunctions: [
      'TRANSFORMTWO_RED_BLUE_RED',
      'FILTER_BLUE',
      'REJECT_RED',
      'TRANSFORM_YELLOW_RED',
      'FILTER_RED',
      'EMPTY',
      'EMPTY',
      'EMPTY',
    ],
  },
  {
    lvl: '0.1',
    args: [
      'FILTER_RED',
      'TRANSFORMTWO_RED_BLUE_RED',
      'FILTER_BLUE',
      'REJECT_RED',
      'TRANSFORM_YELLOW_RED',
    ],
    availableFunctions: [
      'TRANSFORMTWO_RED_BLUE_RED',
      'FILTER_BLUE',
      'REJECT_RED',
      'TRANSFORM_YELLOW_RED',
      'FILTER_RED',
      'EMPTY',
      'EMPTY',
      'EMPTY',
    ],
  },
  {
    lvl: '0.1',
    args: ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
    availableFunctions: [
      'STACK_RED',
      'STACK_RED',
      'TRANSFORMTWO_RED_BLUE_RED',
      'REJECT_RED',
      'FILTER_RED',
      'EMPTY',
      'EMPTY',
      'EMPTY',
    ],
  },
  {
    lvl: '0.1',
    args: ['TRANSFORM_RED_BLUE', 'STACK_RED', 'EMPTY', 'EMPTY', 'EMPTY'],
    availableFunctions: [
      'TRANSFORM_RED_BLUE',
      'STACK_RED',
      'EMPTY',
      'EMPTY',
      'EMPTY',
      'EMPTY',
      'EMPTY',
      'EMPTY',
    ],
  },
];

describe.only('zkube circuit', () => {
  let circuit: WasmTester;

  const sanityCheck = true;
  const address = '0x123';
  const initialGrid = puzzles[0.1].initial;
  const availableFunctionsIndexesDefault = getCircuitFunctionIndex(
    puzzles[0.1].availableFunctions
  );

  before(async () => {
    circuit = await wasm(path.join(__dirname, '../circuits/zkube.circom'));
  });

  it('produces a witness with valid constraints', async () => {
    const targetGrid = gridMutator(initialGrid, [
      'TRANSFORM_YELLOW_RED',
      'STACK_RED',
      'TRANSFORMTWO_RED_BLUE_RED',
      'EMPTY',
      'EMPTY',
    ]);
    const selectedFunctionsIndexes = getCircuitFunctionIndex([
      'TRANSFORM_YELLOW_RED',
      'STACK_RED',
      'TRANSFORMTWO_RED_BLUE_RED',
      'EMPTY',
      'EMPTY',
    ]);

    const availableFunctionsIndexes = getCircuitFunctionIndex([
      'TRANSFORM_YELLOW_RED',
      'STACK_RED',
      'TRANSFORMTWO_RED_BLUE_RED',
      'EMPTY',
      'EMPTY',
      'EMPTY',
      'EMPTY',
      'EMPTY',
    ]);

    const witness = await circuit.calculateWitness(
      {
        initialGrid: initialGrid,
        finalGrid: targetGrid,
        availableFunctionsIndexes,
        account: address,
        selectedFunctionsIndexes,
      },
      sanityCheck
    );

    await circuit.checkConstraints(witness);
  });

  it('has expected witness values', async () => {
    const targetGrid = gridMutator(initialGrid, [
      'TRANSFORM_YELLOW_RED',
      'STACK_RED',
      'EMPTY',
      'EMPTY',
      'EMPTY',
    ]);
    const selectedFunctionsIndexes = getCircuitFunctionIndex([
      'TRANSFORM_YELLOW_RED',
      'STACK_RED',
      'EMPTY',
      'EMPTY',
      'EMPTY',
    ]);

    const availableFunctionsIndexes = getCircuitFunctionIndex([
      'TRANSFORM_YELLOW_RED',
      'STACK_RED',
      'EMPTY',
      'EMPTY',
      'EMPTY',
      'EMPTY',
      'EMPTY',
      'EMPTY',
    ]);

    const witness = await calculateLabeledWitness(
      circuit,
      {
        initialGrid: initialGrid,
        finalGrid: targetGrid,
        availableFunctionsIndexes,
        account: address,
        selectedFunctionsIndexes,
      },
      sanityCheck
    );

    for (let i = 0; i < config.gridWidth; i++) {
      for (let j = 0; j < config.gridHeight; j++) {
        assert.propertyVal(
          witness,
          `main.finalGridForPlayer[${i}][${j}]`,
          String(targetGrid[i][j])
        );
      }
    }
  });

  it('produces expected witness values', async () => {
    const targetGrid = gridMutator(initialGrid, [
      'TRANSFORM_YELLOW_RED',
      'STACK_RED',
      'TRANSFORMTWO_RED_BLUE_RED',
      'REJECT_RED',
      'FILTER_BLUE',
    ]);

    const selectedFunctionsIndexes = getCircuitFunctionIndex([
      'TRANSFORM_YELLOW_RED',
      'STACK_RED',
      'TRANSFORMTWO_RED_BLUE_RED',
      'REJECT_RED',
      'FILTER_BLUE',
    ]);

    const availableFunctionsIndexes = getCircuitFunctionIndex([
      'TRANSFORM_YELLOW_RED',
      'STACK_RED',
      'TRANSFORMTWO_RED_BLUE_RED',
      'REJECT_RED',
      'FILTER_BLUE',
      'EMPTY',
      'EMPTY',
      'EMPTY',
    ]);

    const witness = await calculateLabeledWitness(
      circuit,
      {
        initialGrid: initialGrid,
        finalGrid: targetGrid,
        availableFunctionsIndexes,
        account: address,
        selectedFunctionsIndexes,
      },
      sanityCheck
    );

    assert.notPropertyVal(witness, 'main.finalGridForPlayer[0][2]', 2);
  });

  it('reverts for selectedFunctionIndexes greater than 33', async () => {
    const targetGrid = gridMutator(initialGrid, [
      'TRANSFORM_YELLOW_RED',
      'STACK_RED',
      'TRANSFORMTWO_RED_BLUE_RED',
      'FILTER_BLUE',
      'EMPTY',
    ]);

    const witnessPromise = calculateLabeledWitness(
      circuit,
      {
        initialGrid: initialGrid,
        finalGrid: targetGrid,
        account: address,
        availableFunctionsIndexes: availableFunctionsIndexesDefault,
        selectedFunctionsIndexes: [37, 1, 2, 2, 0],
      },
      sanityCheck
    );

    try {
      await witnessPromise;
      assert.fail('Expected an error but did not get one');
    } catch (error: any) {
      const expectedPattern = /Error in template ZKube/;
      assert.match(error, expectedPattern);
    }
  });

  it('reverts for a negative value in selectedFunctionIndexes', async () => {
    const targetGrid = gridMutator(initialGrid, [
      'TRANSFORM_YELLOW_RED',
      'STACK_RED',
      'TRANSFORMTWO_RED_BLUE_RED',
    ]);

    const witnessPromise = calculateLabeledWitness(
      circuit,
      {
        initialGrid: initialGrid,
        finalGrid: targetGrid,
        availableFunctionsIndexes: availableFunctionsIndexesDefault,
        account: address,
        selectedFunctionsIndexes: [1, 1, -1, -1, 0],
      },
      sanityCheck
    );

    try {
      await witnessPromise;
      assert.fail('Expected an error but did not get one');
    } catch (error: any) {
      const expectedPattern = /Error in template ZKube/;
      assert.match(error.message, expectedPattern);
    }
  });

  it('reverts if selected availableFunctionIndex is not an element of availableFunctionsIndexes', async () => {
    const targetGrid = gridMutator(initialGrid, [
      'TRANSFORM_YELLOW_RED',
      'STACK_RED',
      'TRANSFORMTWO_RED_YELLOW_BLUE',
      'EMPTY',
      'EMPTY',
    ]);

    const availableFunctionsIndexes = getCircuitFunctionIndex([
      'TRANSFORM_YELLOW_RED',
      'STACK_RED',
      // false element
      'TRANSFORMTWO_RED_YELLOW_RED',
      'EMPTY',
      'EMPTY',
      'EMPTY',
      'EMPTY',
      'EMPTY',
    ]);

    const selectedFunctionsIndexes = getCircuitFunctionIndex([
      'TRANSFORM_YELLOW_RED',
      'STACK_RED',
      // false element
      'TRANSFORMTWO_RED_YELLOW_BLUE',
      'EMPTY',
      'EMPTY',
    ]);

    const witnessPromise = calculateLabeledWitness(
      circuit,
      {
        initialGrid: initialGrid,
        finalGrid: targetGrid,
        availableFunctionsIndexes,
        account: address,
        selectedFunctionsIndexes,
      },
      sanityCheck
    );

    try {
      await witnessPromise;
      assert.fail('Expected an error but did not get one');
    } catch (error: any) {
      const expectedPattern = /Error in template ZKube/;
      assert.match(error.message, expectedPattern);
    }
  });

  it('reverts for duplicated use of availableFunction', async () => {
    const targetGrid = gridMutator(initialGrid, [
      'TRANSFORMTWO_RED_BLUE_RED',
      'TRANSFORM_YELLOW_RED',
      'STACK_RED',
      // Duplicated
      'TRANSFORMTWO_RED_BLUE_RED',
    ]);

    const selectedFunctionsIndexes = getCircuitFunctionIndex([
      'TRANSFORMTWO_RED_BLUE_RED',
      'TRANSFORM_YELLOW_RED',
      'STACK_RED',
      // Duplicated
      'TRANSFORMTWO_RED_BLUE_RED',
      'EMPTY',
    ]);

    const availableFunctionsIndexes = getCircuitFunctionIndex([
      'TRANSFORM_YELLOW_RED',
      'STACK_RED',
      'TRANSFORMTWO_RED_BLUE_RED',
      'REJECT_RED',
      'FILTER_BLUE',
      'EMPTY',
      'EMPTY',
      'EMPTY',
    ]);

    const witnessPromise = calculateLabeledWitness(
      circuit,
      {
        initialGrid: initialGrid,
        finalGrid: targetGrid,
        availableFunctionsIndexes,
        account: address,
        selectedFunctionsIndexes,
      },
      sanityCheck
    );

    try {
      await witnessPromise;
      assert.fail('Expected an error but did not get one');
    } catch (error: any) {
      const expectedPattern = /Error in template ZKube/;
      assert.match(error.message, expectedPattern);
    }
  });

  levels.forEach(({ lvl, args, availableFunctions }: Level, i) => {
    it(`witness values for iteraiton ${i + 1} and level ${lvl} equals values returned for arguments ${args}`, async () => {
      const initialGrid = puzzles[lvl].initial;
      const targetGrid = gridMutator(initialGrid, [...args]);

      const selectedFunctionsIndexes = getCircuitFunctionIndex([...args]);

      const availableFunctionsIndexes = [...availableFunctions].map((f) =>
        circuitFunctionsArray.indexOf(f)
      );

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

      for (let i = 0; i < config.gridWidth; i++) {
        for (let j = 0; j < config.gridHeight; j++) {
          assert.propertyVal(
            witness,
            `main.finalGridForPlayer[${i}][${j}]`,
            String(targetGrid[i][j])
          );
        }
      }
    });
  });
});
