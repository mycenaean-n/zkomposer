import hre from "hardhat";
import { assert } from "chai";
import { CircuitTestUtils } from "hardhat-circom";
import { padWithZerosToSizeEight } from "circuits/utils/padWithZerosToSizeEight";
import * as puzzles from "./data/puzzles.json";
import { ColorType, GridValue, transform } from "./utils/transform";

const outRegex: RegExp = /^main\.out\[\d+\]\[\d+\]$/;

function matchKey(regex: RegExp, data: { [key: string]: string }) {
  const matches: { [key: string]: string } = {};
  for (const key in data) {
    if (regex.test(key)) {
      matches[key] = data[key];
    }
  }

  return matches;
}

describe.only("tranform circuit", () => {
  let circuit: CircuitTestUtils;

  const sampleInput: {
    grid: GridValue[][];
    inColor: ColorType;
    outColor: ColorType;
  } = {
    grid: puzzles["0.1"].initial as GridValue[][],
    inColor: 1,
    outColor: 2,
  };
  const sanityCheck = true;

  before(async () => {
    circuit = await hre.circuitTest.setup("transform");
  });

  it("produces a witness with valid constraints", async () => {
    const witness = await circuit.calculateLabeledWitness(
      sampleInput,
      sanityCheck
    );
    // await circuit.checkConstraints(witness);
    // console.log("witness: ", matchKey(outRegex, witness));
  });

  it("has expected output values for puzzle 0.1", async () => {
    const witness = await circuit.calculateLabeledWitness(
      sampleInput,
      sanityCheck
    );
    // console.log(matchKey(outRegex, witness)["main.out[0][0]"], "witness");

    const tranformedGrid = transform(
      sampleInput.grid,
      sampleInput.inColor,
      sampleInput.outColor
    );

    assert.propertyVal(witness, `main.inColor`, String(1));
    assert.propertyVal(witness, `main.outColor`, String(2));

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        //         console.log(
        //           "Hallo",
        //           String(matchKey(outRegex, witness)[`main.out[${i}][${j}]`]),
        // tranformedGrid[i][j]
        //         );
        assert.propertyVal(
          witness,
          `main.out[${i}][${j}]`,
          String(tranformedGrid[i][j])
        );
      }
    }
  });
});
