import hre from "hardhat";
import { assert } from "chai";
import { CircuitTestUtils } from "hardhat-circom";
import { Colors, Puzzles } from "./data/puzzles.types";
import { transform } from "../utils/transform";
const puzzles: Puzzles = require("./data/puzzles.json");

describe.only("transform circuit", () => {
  let circuit: CircuitTestUtils;

  const sampleInput = puzzles;
  const sanityCheck = true;

  before(async () => {
    circuit = await hre.circuitTest.setup("test/transform_test");
  });

  it("produces a witness with valid constraints", async () => {
    const witness = await circuit.calculateWitness(
      { grid: sampleInput[0.1].initial, inColor: 1, outColor: 2 },
      sanityCheck
    );

    // console.log("witness: ", matchKey(outRegex, witness));
    await circuit.checkConstraints(witness);
  });

  it("has valid constraints", async () => {
    const witness = await circuit.calculateWitness(
      { grid: sampleInput[0.1].initial, inColor: 1, outColor: 2 },
      sanityCheck
    );

    await circuit.checkConstraints(witness);
  });

  it("has expected witness values", async () => {
    const witness = await circuit.calculateLabeledWitness(
      { grid: sampleInput[0.1].initial, inColor: 1, outColor: 2 },
      sanityCheck
    );

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        assert.propertyVal(
          witness,
          `main.out[${i}][${j}]`,
          String(sampleInput[0.1].target[i][j])
        );
      }
    }
  });

  it("produces expected witness values", async () => {
    const witness = await circuit.calculateLabeledWitness(
      { grid: sampleInput[0.1].initial, inColor: 1, outColor: 3 },
      sanityCheck
    );

    assert.notPropertyVal(
      witness,
      "main.out[0][0]",
      String(sampleInput[0.2].target[0][0])
    );
  });

  it("transformation witness values equals transformation function return values", async () => {
    const witness = await circuit.calculateLabeledWitness(
      { grid: sampleInput[0.1].initial, inColor: 1, outColor: 2 },
      sanityCheck
    );

    for (let i = 0; i < 8; i++) {
      const column = transform(
        sampleInput[0.1].initial[i],
        Colors.Yellow,
        Colors.Red
      );

      for (let j = 0; j < 8; j++) {
        assert.propertyVal(witness, `main.out[${i}][${j}]`, String(column[j]));
      }
    }
  });
});
