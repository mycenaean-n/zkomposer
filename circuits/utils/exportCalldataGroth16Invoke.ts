import path from "path";
import { exportCalldataGroth16 } from "./exportCalldataGroth16";
import { writeFileSync } from "fs";

export async function exportCalldataGroth16Invoke() {
  const zkeyPath = path.join(__dirname, "../zk/zkube_final.zkey");
  const wasmPath = path.join(__dirname, "../zk/zkube_js/zkube.wasm");
  const input = require("../zk/input.json");

  const data = await exportCalldataGroth16(input, wasmPath, zkeyPath);

  writeFileSync("./zk/zkube_proof.json", "[" + data + "]", "utf8");
  process.exit();
}
