import { writeFileSync } from 'fs';
import path from 'path';
import { exportCalldataGroth16 } from './exportCalldataGroth16';

export async function exportCalldataGroth16Invoke() {
  const zkeyPath = path.join(__dirname, '../zk/zkube_final.zkey');
  const wasmPath = path.join(__dirname, '../zk/zkube_js/zkube.wasm');
  const inputPlayerOne = require('../zk/input_player_one.json');
  const inputPlayerTwo = require('../zk/input_player_two.json');

  const dataPlayerOne = await exportCalldataGroth16(
    inputPlayerOne,
    wasmPath,
    zkeyPath
  );
  const dataPlayerTwo = await exportCalldataGroth16(
    inputPlayerTwo,
    wasmPath,
    zkeyPath
  );

  writeFileSync(
    './zk/zkube_proof_calldata_player_one.json',
    '[' + dataPlayerOne + ']',
    'utf8'
  );
  writeFileSync(
    './zk/zkube_proof_calldata_player_two.json',
    '[' + dataPlayerTwo + ']',
    'utf8'
  );
  process.exit();
}
