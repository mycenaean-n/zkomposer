import Mocha from 'mocha';
const ARGUMENT_VALUE = [
  'zkube',
  'stack',
  'transformTwo',
  'transform',
  'removeAirBubbles',
  'removeColumnWithLeadingZero',
  'reject',
  'filter',
  'custom',
];

const argumentValue = process.argv[2];

if (argumentValue && !ARGUMENT_VALUE.includes(argumentValue))
  throw new Error(`Invalid argument value: ${argumentValue}`);

const mochaConfig = new Mocha({
  ui: 'bdd',
  color: true,
  require: ['ts-node/register'],
  timeout: 10000,
});

if (!argumentValue) {
  mochaConfig.addFile('./test/stack.test.ts');
  mochaConfig.addFile('./test/transformTwo.test.ts');
  mochaConfig.addFile('./test/transform.test.ts');
  mochaConfig.addFile('./test/removeAirBubbles.test.ts');
  mochaConfig.addFile('./test/zkube.test.ts');
  mochaConfig.addFile('./test/reject.test.ts');
  mochaConfig.addFile('./test/removeColumnWithLeadingZero.test.ts');
  mochaConfig.addFile('./test/filter.test.ts');
  mochaConfig.addFile('./test/custom.test.ts');
} else {
  mochaConfig.addFile(`./test/${argumentValue}.test.ts`);
}

// Run the tests
mochaConfig.run((failures) => {
  if (failures) {
    console.error(`Test suite failed with ${failures} failures.`);
    process.exit(1);
  } else {
    console.log('Test suite completed successfully.');
    process.exit(0);
  }
});
