import { assert } from 'chai';
import { wasm, WasmTester } from 'circom_tester';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { GRID_HEIGHT, GRID_WIDTH } from '../config';
import {
  CircuitFunctions,
  circuitFunctionsArray,
  COLORS,
  Colors,
} from '../types/circuitFunctions.types';
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

  Array.from({ length: 1000 }).forEach((_, i) => {
    it(`witness values for fuzzing iteraiton ${i + 1}`, async () => {
      // Grid
      const initialGrid = Array.from({ length: 8 }, () =>
        generateRandomArray(12, getRandomColor)
      );

      const availableFunctions = generateRandomArray(8, getRandomFunctions)
        .map((fun) => (fun === 0 ? 'EMPTY' : fun))
        .reduce((acc: CircuitFunctions[], fun) => {
          if (fun === 'EMPTY' || acc.includes(fun)) {
            acc.push('EMPTY');
          } else {
            acc.push(fun);
          }

          return acc;
        }, []);

      const selectedFunctions = availableFunctions
        .filter(() => Math.random() < 0.5)
        .slice(0, 5)
        .sort((a, b) => {
          if (a === 'EMPTY' && b !== 'EMPTY') return 1;
          if (a !== 'EMPTY' && b === 'EMPTY') return -1;
          return 0;
        });

      const targetGrid = gridMutator(initialGrid, [...selectedFunctions]);

      // Circuit

      const selectedFunctionsIndexes = getCircuitFunctionIndex([
        ...selectedFunctions,
      ]);
      const availableFunctionsIndexes = [...availableFunctions].map((f) =>
        circuitFunctionsArray.indexOf(f)
      );

      const write = {
        initialGrid,
        availableFunctions,
        selectedFunctions,
      };

      // write to file
      const file = readFileSync(
        path.join(__dirname, `./data/fuzzing-results.json`)
      );
      const data = JSON.parse(file.toString());
      data.push(write);
      writeFileSync(
        path.join(__dirname, `./data/fuzzing-results.json`),
        JSON.stringify(data, null, 2)
      );
      // write to file

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
});

export function getRandomColor(): Colors {
  const colorsLength = Object.values(COLORS).length;
  const colors = Object.values(COLORS).slice(1, colorsLength);
  const randomIndex = Math.floor(Math.random() * (colorsLength - 1));
  return colors[randomIndex];
}

function getRandomFunctions(): CircuitFunctions {
  const functionsNum = circuitFunctionsArray.length;
  const randomIndex = Math.floor(Math.random() * functionsNum);
  return circuitFunctionsArray[randomIndex];
}

export function generateRandomArray<
  T extends typeof getRandomColor | typeof getRandomFunctions,
>(length: number, randomValCb: T): (ReturnType<T> | 0)[] {
  const filledHeight = Math.floor(length / 3);

  const row = Array(length)
    .fill(0)
    .map((_, i) => {
      if (i < filledHeight) {
        return randomValCb();
      }
    });

  return row.map((cell) => cell ?? 0) as (0 | ReturnType<T>)[];
}
