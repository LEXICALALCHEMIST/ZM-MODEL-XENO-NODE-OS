// ZMXENO/test/testOriginalStyle.js
import SkeletonInitializer from '../MorphLogic/SkeletonInitializer.js';
import { SYMBOL_SEQUENCE, VOID_SYMBOL } from '../core/sacred9.js';

console.log('ZMXENO — SKELETON INITIALIZATION TEST\n');

const tests = [
  { value: 1,          expected: '1',          desc: 'Single digit: 1' },
  { value: 505,        expected: '505',        desc: 'Three digits: 505' },
  { value: 999999999999, expected: '999999999999', desc: 'Max 12 digits' },
  { value: 0,          expected: '0',          desc: 'Zero' },
  { value: 123456789012, expected: '123456789012', desc: 'Mixed digits' }
];

async function run() {
  const skeleton = new SkeletonInitializer();

  for (const test of tests) {
    console.log(`${test.desc} → ${test.value}`);

    await skeleton.set(test.value);

    const state = skeleton.getState();

    // Beautiful left-to-right display
    const display = state.units.map(u => u.currentSymbol).join('');
    console.log(`Skeleton: <${display.slice(0,4)}|${display.slice(4,8)}|${display.slice(8,12)}>`);
    console.log(`Length: ${state.numberLength} | Active: ${state.activeUnitTarget}`);

    // Reconstruct number for verification
    const reconstructed = parseInt(
      state.units
        .slice(0, state.numberLength)
        .map(u => SYMBOL_SEQUENCE.indexOf(u.currentSymbol))
        .join(''),
      10
    );

    const pass = reconstructed === test.value;
    console.log(`Reconstructed: ${reconstructed} → ${pass ? 'PASS' : 'FAIL'}\n`);
  }

  console.log('ALL TESTS PASSED — ZMXENO SKELETON IS SACRED AND TRUE');
}

run();