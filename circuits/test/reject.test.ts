import { assert } from 'chai';
import config from '../config';
import { argumentBuilder } from '../utils/circuitFunctions';
import { WasmTester, wasm } from 'circom_tester';
import path from 'path';
import { calculateLabeledWitness } from './utils/calculateLabeledWitness';
import { Puzzle } from '../types/circuitFunctions.types';
import { gridMutator } from '../utils/gridMutator';
const puzzles: Puzzle = require('./data/puzzles.json');

describe.only('reject circuit', () => {
  let circuit: WasmTester;

  const sanityCheck = true;
  const initialGrid = puzzles[0.1].initial;

  before(async () => {
    circuit = await wasm(
      path.join(__dirname, '../circuits/test/reject_test.circom')
    );
  });

  it('produces a witness with valid constraints', async () => {
    const [onOff, color] = argumentBuilder('REJECT_YELLOW');

    const witness = await circuit.calculateWitness(
      { grid: initialGrid, onOff, color },
      sanityCheck
    );

    await circuit.checkConstraints(witness);
  });

  it('has expected witness values for onOff == 1', async () => {
    const [onOff, color] = argumentBuilder('REJECT_YELLOW');

    const witness = await calculateLabeledWitness(
      circuit,
      { grid: initialGrid, onOff, color },
      sanityCheck
    );

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        assert.propertyVal(
          witness,
          `main.out[${i}][${j}]`,
          String(puzzles[0.1].reject[i][j])
        );
      }
    }
  });

  it('has expected witness values for onOff == 0', async () => {
    const [onOff, color] = argumentBuilder('REJECT_YELLOW');

    const witness = await calculateLabeledWitness(
      circuit,
      { grid: initialGrid, onOff: 0, color },
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
    const [onOff, color] = argumentBuilder('REJECT_YELLOW');

    const witness = await calculateLabeledWitness(
      circuit,
      { grid: initialGrid, onOff: 0, color },
      sanityCheck
    );

    assert.notPropertyVal(
      witness,
      'main.out[0][0]',
      String(puzzles[0.1].target[0][0])
    );
  });

  [1, 2, 3, 4].forEach((i: number) => {
    it(`reject witness values for iteration ${i} equals reject function return values`, async () => {
      const argument =
        i === 1
          ? 'REJECT_YELLOW'
          : i === 2
            ? 'REJECT_RED'
            : i === 3
              ? 'REJECT_BLUE'
              : 'REJECT_YELLOW';

      const [onOff, color] = argumentBuilder(argument);

      const witness = await calculateLabeledWitness(
        circuit,
        {
          grid: puzzles[0.1].initial,
          onOff,
          color,
        },
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
