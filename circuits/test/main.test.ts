import { Puzzles } from "./data/puzzles.types";
import { argumentBuilderMain } from "../utils/circuitFunctions";
import { assert } from "chai";
import { gridMutator } from "../utils/gridMutator";
import { CircuitFunctions } from "../utils/enums/circuitFunctions.enum";
import { WasmTester, wasm } from "circom_tester";
import path from "path";
import { calculateLabeledWitness } from "./utils/calculateLabeledWitness";
const puzzles: Puzzles = require("./data/puzzles.json");

describe.only("main circuit", () => {
  let circuit: WasmTester;

  const sanityCheck = true;
  const address = "0x123";
  const initialGrid = puzzles[0.3].initial;

  before(async () => {
    circuit = await wasm(path.join(__dirname, "../circuits/main.circom"));
  });

  it("produces a witness with valid constraints", async () => {
    const targetGrid = gridMutator(initialGrid, [
      CircuitFunctions.TRANSFORM_YELLOW_RED,
      CircuitFunctions.STACK_RED,
      CircuitFunctions.TRANSFORMTWO_RED_BLUE,
    ]);

    const circuitFunctionArguments = argumentBuilderMain([
      CircuitFunctions.TRANSFORM_YELLOW_RED,
      CircuitFunctions.STACK_RED,
      CircuitFunctions.TRANSFORMTWO_RED_BLUE,
    ]);

    const witness = await circuit.calculateWitness(
      {
        initialGrid: initialGrid,
        finalGrid: targetGrid,
        account: address,
        selectedFunctions: circuitFunctionArguments,
      },
      sanityCheck
    );

    await circuit.checkConstraints(witness);
  });

  it("has expected witness values", async () => {
    const targetGrid = gridMutator(initialGrid, [
      CircuitFunctions.TRANSFORM_YELLOW_RED,
      CircuitFunctions.STACK_RED,
      CircuitFunctions.EMPTY,
    ]);
    const circuitFunctionArguments = argumentBuilderMain([
      CircuitFunctions.TRANSFORM_YELLOW_RED,
      CircuitFunctions.STACK_RED,
      CircuitFunctions.EMPTY,
    ]);
    const witness = await calculateLabeledWitness(
      circuit,
      {
        initialGrid: initialGrid,
        finalGrid: targetGrid,
        account: address,
        selectedFunctions: circuitFunctionArguments,
      },
      sanityCheck
    );

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        assert.propertyVal(
          witness,
          `main.finishingGrid[${i}][${j}]`,
          String(targetGrid[i][j])
        );
      }
    }
  });

  it("produces expected witness values", async () => {
    const targetGrid = gridMutator(initialGrid, [
      CircuitFunctions.TRANSFORM_YELLOW_RED,
      CircuitFunctions.STACK_RED,
      CircuitFunctions.TRANSFORMTWO_RED_BLUE,
    ]);

    const circuitFunctionArguments = argumentBuilderMain([
      CircuitFunctions.TRANSFORM_YELLOW_RED,
      CircuitFunctions.STACK_RED,
      CircuitFunctions.TRANSFORMTWO_RED_BLUE,
    ]);

    const witness = await calculateLabeledWitness(
      circuit,
      {
        initialGrid: initialGrid,
        finalGrid: targetGrid,
        account: address,
        selectedFunctions: circuitFunctionArguments,
      },
      sanityCheck
    );

    assert.notPropertyVal(
      witness,
      "main.finishingGrid[0][4]",
      String(targetGrid[0][3])
    );
  });

  it("reverts for duplicated manipulation in same round", async () => {
    const targetGrid = gridMutator(initialGrid, [
      CircuitFunctions.TRANSFORM_YELLOW_RED,
      CircuitFunctions.STACK_RED,
      CircuitFunctions.TRANSFORMTWO_RED_BLUE,
    ]);

    const witnessPromise = calculateLabeledWitness(
      circuit,
      {
        initialGrid: initialGrid,
        finalGrid: targetGrid,
        account: address,
        selectedFunctions: [
          [
            [1, 1, 2],
            [0, 0, 0],
            [0, 0, 0],
          ],
          // Duplicate
          [
            [1, 1, 2],
            [1, 2, 0],
            [0, 0, 0],
          ],
          [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
          ],
        ],
      },
      sanityCheck
    );

    try {
      await witnessPromise;
      assert.fail("Expected an error but did not get one");
    } catch (error: any) {
      const expectedPattern = /Error in template ZKube/;
      assert.match(error, expectedPattern);
    }
  });

  it("reverts for a negative argument", async () => {
    const targetGrid = gridMutator(initialGrid, [
      CircuitFunctions.TRANSFORM_YELLOW_RED,
      CircuitFunctions.STACK_RED,
      CircuitFunctions.TRANSFORMTWO_RED_BLUE,
    ]);

    const witnessPromise = calculateLabeledWitness(
      circuit,
      {
        initialGrid: initialGrid,
        finalGrid: targetGrid,
        account: address,
        selectedFunctions: [
          [
            [1, -1, 2],
            [0, 0, 0],
            [0, 0, 0],
          ],
          [
            [0, 0, 0],
            [1, 2, 0],
            [0, 0, 0],
          ],
          [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
          ],
        ],
      },
      sanityCheck
    );

    try {
      await witnessPromise;
      assert.fail("Expected an error but did not get one");
    } catch (error: any) {
      const expectedPattern = /Error in template ZKube/;
      assert.match(error.message, expectedPattern);
    }
  });

  it("reverts for inactive function with non-zero arguments", async () => {
    const targetGrid = gridMutator(initialGrid, [
      CircuitFunctions.TRANSFORM_YELLOW_RED,
      CircuitFunctions.STACK_RED,
      CircuitFunctions.TRANSFORMTWO_RED_BLUE,
    ]);

    const witnessPromise = calculateLabeledWitness(
      circuit,
      {
        initialGrid: initialGrid,
        finalGrid: targetGrid,
        account: address,
        selectedFunctions: [
          [
            [1, -1, 2],
            [0, 0, 0],
            [0, 0, 0],
          ],
          [
            [0, 0, 0],
            [1, 2, 0],
            [0, 0, 0],
          ],
          [
            [0, 0, 0],
            [0, 0, 0],
            [0, 2, 3],
          ],
        ],
      },
      sanityCheck
    );

    try {
      await witnessPromise;
      assert.fail("Expected an error but did not get one");
    } catch (error: any) {
      const expectedPattern = /Error in template ZKube/;
      assert.match(error.message, expectedPattern);
    }
  });

  [
    {
      lvl: "0.1",
      args: [
        CircuitFunctions.TRANSFORM_YELLOW_RED,
        CircuitFunctions.STACK_RED,
        CircuitFunctions.TRANSFORMTWO_RED_BLUE,
      ] as CircuitFunctions[],
    },
    {
      lvl: "0.2",
      args: [
        CircuitFunctions.STACK_RED,
        CircuitFunctions.EMPTY,
        CircuitFunctions.EMPTY,
      ] as CircuitFunctions[],
    },
    {
      lvl: "0.3",
      args: [
        CircuitFunctions.STACK_RED,
        CircuitFunctions.TRANSFORM_YELLOW_RED,
        CircuitFunctions.TRANSFORMTWO_RED_YELLOW,
      ] as CircuitFunctions[],
    },
    {
      lvl: "0.4",
      args: [
        CircuitFunctions.TRANSFORM_YELLOW_BLUE,
        CircuitFunctions.STACK_RED,
        CircuitFunctions.TRANSFORMTWO_RED_YELLOW,
      ] as CircuitFunctions[],
    },
  ].forEach(({ lvl, args }: { lvl: string; args: CircuitFunctions[] }) => {
    it(`witness values for level ${lvl} equals values returned for arguments ${args}`, async () => {
      const initialGrid = puzzles[lvl].initial;
      const targetGrid = gridMutator(initialGrid, [...args]);

      const circuitFunctionArguments = argumentBuilderMain([...args]);

      const witness = await calculateLabeledWitness(
        circuit,
        {
          initialGrid,
          finalGrid: targetGrid,
          account: address,
          selectedFunctions: circuitFunctionArguments,
        },
        sanityCheck
      );

      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          assert.propertyVal(
            witness,
            `main.finishingGrid[${i}][${j}]`,
            String(targetGrid[i][j])
          );
        }
      }
    });
  });
});
