import hre from "hardhat";
import { CircuitTestUtils } from "hardhat-circom";
import { Colors, Puzzles } from "./data/puzzles.types";
import { transformGrid } from "../utils/transform";
import { stackGrid } from "../utils/stack";
import { functionBuilder } from "../utils/circuitFunctions";
import { transformTwoGrid } from "../utils/transformTwo";
const puzzles: Puzzles = require("./data/puzzles.json");

describe.only("main circuit", () => {
  let circuit: CircuitTestUtils;

  const sanityCheck = true;
  const address = "0x123";

  before(async () => {
    circuit = await hre.circuitTest.setup("main");
  });

  it("produces a witness with valid constraints", async () => {
    const transformedGrid = transformGrid(
      puzzles[0.3].initial,
      Colors.Yellow,
      Colors.Red
    );
    const stackedGrid = stackGrid(transformedGrid, Colors.Red);
    const target = transformTwoGrid(stackedGrid, Colors.Red, Colors.Yellow);

    const circuitFunctionArguments = functionBuilder([
      "TRANSFORM_YELLOW_RED",
      "STACK_RED",
      "TRANSFORMTWO_RED_YELLOW",
    ]);

    const witness = await circuit.calculateWitness(
      {
        initialGrid: puzzles[0.3].initial,
        finalGrid: target,
        account: address,
        selectedFunctions: circuitFunctionArguments,
      },
      sanityCheck
    );

    await circuit.checkConstraints(witness);
  });
});
