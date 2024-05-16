import { assert } from 'chai';
import config from '../config';
import { argumentBuilder } from '../utils/circuitFunctions';
import { WasmTester, wasm } from 'circom_tester';
import path from 'path';
import { calculateLabeledWitness } from './utils/calculateLabeledWitness';
import { Puzzle } from '../types/circuitFunctions.types';
import { gridMutator } from '../utils/gridMutator';
const puzzles: Puzzle = require('./data/puzzles.json');

describe.only('transformtwo circuit', () => {
  let circuit: WasmTester;

  const sanityCheck = true;
  const initialGrid = puzzles[0.1].initial;

  before(async () => {
    circuit = await wasm(
      path.join(__dirname, '../circuits/test/transformtwo_test.circom')
    );
  });

  it('produces a witness with valid constraints', async () => {
    const [onOff, inColor, outColorBot, outColorTop] = argumentBuilder(
      'TRANSFORMTWO_YELLOW_RED_YELLOW'
    );

    const witness = await circuit.calculateWitness(
      { grid: initialGrid, onOff, inColor, outColorBot, outColorTop },
      sanityCheck
    );

    await circuit.checkConstraints(witness);
  });

  it('has expected witness values for onOff == 1', async () => {
    const [onOff, inColor, outColorBot, outColorTop] = argumentBuilder(
      'TRANSFORMTWO_YELLOW_RED_YELLOW'
    );

    const witness = await calculateLabeledWitness(
      circuit,
      { grid: initialGrid, onOff, inColor, outColorBot, outColorTop },
      sanityCheck
    );

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        assert.propertyVal(
          witness,
          `main.out[${i}][${j}]`,
          String(puzzles[0.1].transformTwo[i][j])
        );
      }
    }
  });

  it('has expected witness values for onOff == 0', async () => {
    const [inColor, outColorBot, outColorTop] = argumentBuilder(
      'TRANSFORMTWO_YELLOW_RED_YELLOW'
    );

    const witness = await calculateLabeledWitness(
      circuit,
      { grid: initialGrid, onOff: 0, inColor, outColorBot, outColorTop },
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
    const [onOff, inColor, outColorBot, outColorTop] = argumentBuilder(
      'TRANSFORMTWO_YELLOW_RED_YELLOW'
    );

    const witness = await calculateLabeledWitness(
      circuit,
      { grid: initialGrid, onOff: 0, inColor, outColorBot, outColorTop },
      sanityCheck
    );

    assert.notPropertyVal(
      witness,
      'main.out[0][0]',
      String(puzzles[0.1].target[0][0])
    );
  });

  [1, 2, 3, 4].forEach((i: number) => {
    it(`transformTwo witness values for iteration ${i} equals transformTwo function return values`, async () => {
      const argument =
        i === 1
          ? 'TRANSFORMTWO_YELLOW_RED_YELLOW'
          : i === 2
            ? 'TRANSFORMTWO_BLUE_YELLOW_RED'
            : i === 3
              ? 'TRANSFORMTWO_RED_BLUE_YELLOW'
              : 'TRANSFORMTWO_YELLOW_RED_BLUE';

      const [onOff, inColor, outColorBot, outColorTop] =
        argumentBuilder(argument);

      const witness = await calculateLabeledWitness(
        circuit,
        {
          grid: puzzles[0.1].initial,
          onOff,
          inColor,
          outColorBot,
          outColorTop,
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
