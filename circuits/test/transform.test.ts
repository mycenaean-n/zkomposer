/* eslint-disable node/no-missing-import */
/* eslint-disable camelcase */
import { expect } from "chai";
import { BigNumber } from "ethers";
// eslint-disable-next-line node/no-extraneous-import
import { ZKPClient, EdDSA } from "circuits";
import fs from "fs";
import path from "path";
import * as puzzles from "./data/puzzles.json";
import { padWithZerosToSizeEight } from "../utils/padWithZerosToSizeEight";
import { Colors } from "../types";

describe("Test zkp circuit and scripts", function () {
  let client: ZKPClient;
  beforeEach(async () => {
    const wasm = fs.readFileSync(
      path.join(
        __dirname,
        "../../circuits/zk/circuits/transform_js/transform.wasm"
      )
    );
    const zkey = fs.readFileSync(
      path.join(__dirname, "../../circuits/zk/zkeys/transform.zkey")
    );
    client = await new ZKPClient().init(wasm, zkey);
    // eddsa = await new EdDSA(privKey).init();
  });
  it("Should be able to transform", async function () {
    // proving yellow (1) to red (2)

    const proof = await client.proveTransform({
      grid: padWithZerosToSizeEight(puzzles["0.1"].initial as Colors[][]),
      inColor: 1,
      outColor: 2,
    });

    expect(proof).not.to.eq(undefined);
  });
});
