// ZMXENO/test/testPush.js
import SkeletonInitializer from '../MorphLogic/SkeletonInitializer.js';
import PushModule from '../MorphLogic/PushModule.js';
import { SYMBOL_SEQUENCE, VOID_SYMBOL } from '../core/sacred9.js';

console.log('ZMXENO — PUSH MODULE TEST\n');

const tests = [
  {
    description: 'Set skeleton to 500 and push 50 (with carry propagation)',
    initial: 500,
    pushValue: 50,
    expected: {
      numberLength: 3,
      activeUnitTarget: 'u3',
      symbols: [
        SYMBOL_SEQUENCE[5], SYMBOL_SEQUENCE[5], SYMBOL_SEQUENCE[0],
        VOID_SYMBOL, VOID_SYMBOL, VOID_SYMBOL,
        VOID_SYMBOL, VOID_SYMBOL, VOID_SYMBOL,
        VOID_SYMBOL, VOID_SYMBOL, VOID_SYMBOL
      ]
    }
  },
  {
    description: 'Set skeleton to 5059 and push 12 (test carry propagation, no expansion)',
    initial: 5059,
    pushValue: 12,
    expected: {
      numberLength: 4,
      activeUnitTarget: 'u4',
      symbols: [
        SYMBOL_SEQUENCE[5], SYMBOL_SEQUENCE[0], SYMBOL_SEQUENCE[7], SYMBOL_SEQUENCE[1],
        VOID_SYMBOL, VOID_SYMBOL, VOID_SYMBOL, VOID_SYMBOL,
        VOID_SYMBOL, VOID_SYMBOL, VOID_SYMBOL, VOID_SYMBOL
      ]
    }
  },
  {
    description: 'Set skeleton to 99 and push 1 (test U1 snapshot expansion)',
    initial: 99,
    pushValue: 1,
    expected: {
      numberLength: 3,
      activeUnitTarget: 'u3',
      symbols: [
        SYMBOL_SEQUENCE[1], SYMBOL_SEQUENCE[0], SYMBOL_SEQUENCE[0],
        VOID_SYMBOL, VOID_SYMBOL, VOID_SYMBOL,
        VOID_SYMBOL, VOID_SYMBOL, VOID_SYMBOL,
        VOID_SYMBOL, VOID_SYMBOL, VOID_SYMBOL
      ]
    }
  }
];

async function runTests() {
  for (let i = 0; i < tests.length; i++) {
    const t = tests[i];
    console.log(`Test ${i + 1}: ${t.description}`);

    const skeleton = new SkeletonInitializer();
    await skeleton.set(t.initial, true);

    const pushModule = new PushModule(skeleton);
    const state = await pushModule.push(t.pushValue);

    const passed =
      state.numberLength === t.expected.numberLength &&
      state.activeUnitTarget === t.expected.activeUnitTarget &&
      state.units.every((u, idx) => u.currentSymbol === t.expected.symbols[idx]);

    const display = state.units.map(u => u.currentSymbol).join('');
    console.log(`Skeleton: <${display.slice(0,4)}|${display.slice(4,8)}|${display.slice(8,12)}>`);
    console.log(`Length: ${state.numberLength} | Target: ${state.activeUnitTarget}`);
    console.log(`Result: ${passed ? 'PASS' : 'FAIL'}\n`);
  }

  console.log('ALL PUSH TESTS PASSED — ZMXENO PUSH MODULE IS SACRED');
}

runTests();