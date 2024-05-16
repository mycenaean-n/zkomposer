import config from '../config';
import { argumentBuilder } from '../utils/circuitFunctions';
import { WasmTester, wasm } from 'circom_tester';
import { calculateLabeledWitness } from './utils/calculateLabeledWitness';
import { assert } from 'chai';
import path from 'path';
import { Puzzle } from '../types/circuitFunctions.types';
import { gridMutator } from '../utils/mutators/gridMutator';

const puzzles: Puzzle = require('./data/puzzles.json');

describe.only('transform circuit', () => {
  let circuit: WasmTester;

  const sanityCheck = true;
  const initialGrid = puzzles[0.1].initial;

  before(async () => {
    circuit = await wasm(
      path.join(__dirname, '../circuits/test/transform_test.circom')
    );
  });

  it('produces a witness with valid constraints', async () => {
    const [onOff, inColor, outColor] = argumentBuilder('TRANSFORM_YELLOW_RED');

    const witness = await circuit.calculateWitness(
      { grid: initialGrid, onOff, inColor, outColor },
      sanityCheck
    );

    await circuit.checkConstraints(witness);
  });

  it('has expected witness values for onOff == 1', async () => {
    const [onOff, inColor, outColor] = argumentBuilder('TRANSFORM_YELLOW_RED');

    const witness = await calculateLabeledWitness(
      circuit,
      { grid: initialGrid, onOff, inColor, outColor },
      sanityCheck
    );

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        assert.propertyVal(
          witness,
          `main.out[${i}][${j}]`,
          String(puzzles[0.1].target[i][j])
        );
      }
    }
  });

  it('has expected witness values for onOff == 0', async () => {
    const [inColor, outColor] = argumentBuilder('TRANSFORM_YELLOW_RED');

    const witness = await calculateLabeledWitness(
      circuit,
      { grid: initialGrid, onOff: 0, inColor, outColor },
      sanityCheck
    );

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        assert.propertyVal(
          witness,
          `main.out[${i}][${j}]`,
          String(initialGrid[i][j])
        );
      }
    }
  });

  it('produces expected witness values', async () => {
    const [onOff, inColor, outColor] = argumentBuilder('TRANSFORM_YELLOW_BLUE');

    const witness = await calculateLabeledWitness(
      circuit,
      { grid: initialGrid, onOff, inColor, outColor },
      sanityCheck
    );

    assert.notPropertyVal(
      witness,
      'main.out[0][0]',
      String(puzzles[0.1].target[0][0])
    );
  });

  [1, 2, 3, 4].forEach((i: number) => {
    it(`transform witness values for iteration ${i} equals transform function return values`, async () => {
      const argument =
        i === 1
          ? 'TRANSFORM_RED_YELLOW'
          : i === 2
            ? 'TRANSFORM_YELLOW_BLUE'
            : i === 3
              ? 'TRANSFORM_BLUE_RED'
              : 'TRANSFORM_YELLOW_RED';

      const [onOff, inColor, outColor] = argumentBuilder(argument);

      const witness = await calculateLabeledWitness(
        circuit,
        { grid: puzzles[0.1].initial, onOff, inColor, outColor },
        sanityCheck
      );

      const targetGrid = gridMutator(puzzles[0.1].initial, [argument]);

      for (let i = 0; i < config.gridWidth; i++) {
        for (let j = 0; j < config.gridHeight; j++) {
          assert.propertyVal(
            witness,
            `main.out[${i}][${j}]`,
            String(targetGrid[i][j])
          );
        }
      }
    });
  });
});
