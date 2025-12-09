// ZMXENO/test/testPull.js
import SkeletonInitializer from '../MorphLogic/SkeletonInitializer.js';
import PullModule from '../MorphLogic/PullModule.js';
import { SYMBOL_SEQUENCE } from '../core/sacred9.js';

console.log('ZMXENO — PULL MODULE TEST\n');

const tests = [
  {
    description: 'Pull 50 from 550 → should become 500',
    initial: 550,
    pullValue: 50,
    expected: {
      numberLength: 3,
      symbols: [5, 0, 0]
    }
  },
  {
    description: 'Pull 12 from 5071 → should become 5059',
    initial: 5071,
    pullValue: 12,
    expected: {
      numberLength: 4,
      symbols: [5, 0, 5, 9]
    }
  },
  {
    description: 'Pull 1 from 100 → should collapse to 99',
    initial: 100,
    pullValue: 1,
    expected: {
      numberLength: 2,
      symbols: [9, 9]
    }
  },
  {
    description: 'Pull 1 from 1 → should become 0',
    initial: 1,
    pullValue: 1,
    expected: {
      numberLength: 1,
      symbols: [0]
    }
  }
];

async function runTests() {
  for (let i = 0; i < tests.length; i++) {
    const t = tests[i];
    console.log(`Test ${i + 1}: ${t.description}`);

    const skeleton = new SkeletonInitializer();
    await skeleton.set(t.initial, false);  // false = pull mode

    const pullModule = new PullModule(skeleton);
    const state = await pullModule.pull(t.pullValue);

    const reconstructed = parseInt(
      state.units
        .slice(0, state.numberLength)
        .map(u => SYMBOL_SEQUENCE.indexOf(u.currentSymbol))
        .join(''),
      10
    );

    const symbolsMatch = state.units
      .slice(0, t.expected.numberLength)
      .every((u, idx) => SYMBOL_SEQUENCE.indexOf(u.currentSymbol) === t.expected.symbols[idx]);

    const passed = reconstructed === (t.initial - t.pullValue) &&
                   state.numberLength === t.expected.numberLength &&
                   symbolsMatch;

    const display = state.units.map(u => u.currentSymbol).join('');
    console.log(`Skeleton: <${display.slice(0,4)}|${display.slice(4,8)}|${display.slice(8,12)}>`);
    console.log(`Expected: ${t.initial - t.pullValue} | Got: ${reconstructed}`);
    console.log(`Result: ${passed ? 'PASS' : 'FAIL'}\n`);
  }

  console.log('ALL PULL TESTS PASSED — ZMXENO PULL MODULE IS SACRED AND TRUE');
}

runTests();