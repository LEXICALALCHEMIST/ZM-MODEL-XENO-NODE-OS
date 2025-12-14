// ZMXENO/MorphLogic/modules/modulePull.js
import SkeletonInitializer from '../SkeletonInitializer.js';
import PullModule from '../PullModule.js';
import { SYMBOL_SEQUENCE } from '../../core/sacred9.js';

console.log('ZMXENO — PULLMODULE : LOADED\n');

export async function modulePull(imprint) {
  console.log(`[PREMORPH] Running pull: ${imprint.a} - ${imprint.b}`);

  const skeleton = new SkeletonInitializer();
  await skeleton.set(imprint.a, true);

  const pull = new PullModule(skeleton);
  const state = await pull.pull(imprint.b);

  const display = state.units.map(u => u.currentSymbol).join('');
  console.log(`Skeleton: <${display.slice(0,4)}|${display.slice(4,8)}|${display.slice(8,12)}>`);
  console.log(`Length: ${state.numberLength} | Target: ${state.activeUnitTarget}`);

  // Reconstruct value for verification
  let value = 0;
  for (let i = 0; i < state.numberLength; i++) {
    value = value * 10 + SYMBOL_SEQUENCE.indexOf(state.units[i].currentSymbol);
  }

  const expected = imprint.a - imprint.b;
  const passed = value === expected;

  console.log(`Reconstructed value: ${value} (expected ${expected})`);
  console.log(`Result: ${passed ? 'PASS' : 'FAIL'}`);
  console.log('ZMXENO PULL MODULE — MATRIX COLLAPSE\n');

  if (passed) {
    console.log('ZMXENO PULL MODULE — SACRED AND TRUE');
  }

  // SACRED RETURN — identical to modulePush for perfect symmetry
  return {
    value: value,                  // the real result (e.g. 500 from 550-50)
    state: {
      skeleton: `<${display.slice(0,4)}|${display.slice(4,8)}|${display.slice(8,12)}>`,
      units: state.units,
      numberLength: state.numberLength,
      activeUnitTarget: state.activeUnitTarget
    }
  };
}

// Test call — keep commented in production
// const testImprint = { a: 550, b: 50 };
// modulePull(testImprint);