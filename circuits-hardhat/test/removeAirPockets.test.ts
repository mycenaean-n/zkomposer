import hre from "hardhat";
import { assert } from "chai";
import { CircuitTestUtils } from "hardhat-circom";
import { Colors } from "./data/puzzles.types";
import config from "../config";

describe.only("removeairpockets circuit", () => {
  let circuit: CircuitTestUtils;
  const expectedValue = [1, 2, 3, 0, 0, 0, 0, 0];
  const sampleInput = [
    [1, 2, 3, 0, 0, 0, 0, 0],
    [1, 2, 0, 3, 0, 0, 0, 0],
    [1, 2, 0, 0, 3, 0, 0, 0],
    [1, 2, 0, 0, 0, 3, 0, 0],
    [1, 2, 0, 0, 0, 0, 3, 0],
    [1, 2, 0, 0, 0, 0, 0, 3],
    [1, 0, 2, 3, 0, 0, 0, 0],
    [1, 0, 0, 2, 3, 0, 0, 0],
    [1, 0, 0, 0, 2, 3, 0, 0],
    [1, 0, 0, 0, 0, 2, 3, 0],
    [1, 0, 0, 0, 0, 0, 2, 3],
    [1, 2, 3, 0, 0, 0, 0, 0],
    [0, 1, 2, 3, 0, 0, 0, 0],
    [0, 0, 1, 2, 3, 0, 0, 0],
    [0, 0, 0, 1, 2, 3, 0, 0],
    [0, 0, 0, 0, 1, 2, 3, 0],
    [0, 0, 0, 0, 0, 1, 2, 3],
  ];
  const sanityCheck = true;

  before(async () => {
    circuit = await hre.circuitTest.setup("test/removeairpockets_test");
  });

  it("produces a witness with valid constraints", async () => {
    const witness = await circuit.calculateWitness(
      { column: sampleInput[1] },
      sanityCheck
    );

    await circuit.checkConstraints(witness);
  });

  it("has valid constraints", async () => {
    const witness = await circuit.calculateWitness(
      { column: sampleInput[1] },
      sanityCheck
    );

    await circuit.checkConstraints(witness);
  });

  it("has expected witness values", async () => {
    const witness = await circuit.calculateLabeledWitness(
      { column: sampleInput[1] },
      sanityCheck
    );

    for (let i = 0; i < 8; i++) {
      assert.propertyVal(witness, `main.out[${i}]`, String(expectedValue[i]));
    }
  });

  it("produces expected witness values", async () => {
    const witness = await circuit.calculateLabeledWitness(
      { column: sampleInput[1] },
      sanityCheck
    );

    assert.notPropertyVal(witness, "main.out[0][0]", String(sampleInput[1][0]));
  });

  sampleInput.forEach((column: Colors[]) => {
    it(`removeairpockets witness values for column [${column}] equals expected value`, async () => {
      const witness = await circuit.calculateLabeledWitness(
        { column },
        sanityCheck
      );

      for (let i = 0; i < config.gridWidth; i++) {
        assert.propertyVal(witness, `main.out[${i}]`, String(expectedValue[i]));
      }
    });
  });
});
