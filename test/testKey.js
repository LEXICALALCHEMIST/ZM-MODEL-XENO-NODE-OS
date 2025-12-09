// ZMXENO/test/testKey.js
import KeyMaker from '../key/KeyMaker.js';
import { SYMBOL_SEQUENCE, VOID_SYMBOL } from '../core/sacred9.js';

console.log('ZMXENO — KEYMAKER TEST\n');

const keyMaker = new KeyMaker();

const tests = [100, 555, 9997777];

for (const num of tests) {
  const key = keyMaker.makeKey(num);

  console.log(`Number: ${num.toString().padStart(10)}`);
  console.log(`Length: ${key.length}`);
  console.log(`Push:   [${key.push.join(', ')}]`);
  console.log(`View:   ${key.view.join('')}`);
  console.log(`Reconstructed: ${parseInt(
    key.view
      .map(sym => SYMBOL_SEQUENCE.indexOf(sym))
      .join('')
      .replace(/-1/g, '0'), // VOID → 0
    10
  )}`);
  console.log('---');
}

console.log('ALL KEYMAKER TESTS COMPLETE');