import { WasmTester } from 'circom_tester';

export async function calculateLabeledWitness(
  tester: WasmTester,
  input: unknown,
  sanityCheck: boolean
) {
  const witness = await tester.calculateWitness(input, sanityCheck);

  if (!tester.symbols) {
    await tester.loadSymbols();
  }

  const labels: { [label: string]: string | undefined } = {};

  for (const n in tester.symbols) {
    let v: string;
    if (typeof witness[tester.symbols[n]!.varIdx] !== 'undefined') {
      v = witness[tester.symbols[n]!.varIdx].toString();
    } else {
      v = 'undefined';
    }
    labels[n] = v;
  }

  return labels;
}
