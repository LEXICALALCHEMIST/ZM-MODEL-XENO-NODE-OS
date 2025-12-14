// ZMXENO/gate/matrix.js — FIXED: HANDLES MODULE RETURN PROPERLY

import { modulePush } from '../morphlogic/modules/modulePush.js';
import { modulePull } from '../morphlogic/modules/modulePull.js';
import { phaser } from './phaser/phaser.js';
import { CalcAdd13 } from './imprint.js';
import { Exoprint } from './exoprint.js';

export class Matrix {
  async initialize(appId = "test") {
    phaser.begin('INITIALIZE');
    console.log('[CHECKPOINT] Matrix initialized');
    phaser.end();

    phaser.begin('IMPRINT');
    console.log('[CHECKPOINT] Imprint received — CalcAdd13');
    console.log(`   app     : ${CalcAdd13.app}`);
    console.log(`   intent  : ${CalcAdd13.intent}`);
    console.log(`   a       : ${CalcAdd13.a}`);
    console.log(`   b       : ${CalcAdd13.b}`);
    console.log(`   id      : ${CalcAdd13.id}`);
    console.log(`   time    : ${new Date(CalcAdd13.timestamp).toISOString()}`);
    phaser.end();

    console.log('\n[MORPH PHASE START]');
    console.log('[MORPH] Ready for MATRIX CASCADE');

    const matrixCut = async (imprint) => {
      const { intent } = imprint;

      phaser.begin('MATRIX_CUT');

      let rawResult;

      if (intent === 'add') {
        rawResult = await modulePush(imprint);
      } else if (intent === 'sub') {
        rawResult = await modulePull(imprint);
      } else {
        throw new Error(`[GATE REJECT] Unknown intent: ${intent}`);
      }
 
      phaser.end();

      // SAFETY: if module forgets to return, give it a minimal safe shape
      if (!rawResult || typeof rawResult !== 'object') {
        console.warn('[MATRIX] Module returned invalid result, using fallback');
        rawResult = { value: null, state: null };
      }

      console.log('[RAW RESULT FROM MODULE]', rawResult);

      const exoprint = new Exoprint({
        value: rawResult.value ?? null,   // safe access
        state: rawResult.state ?? null,
        intent: intent,
        id: imprint.id
      });

      console.log('[EXOPRINT RESOLVED]', exoprint);
      return exoprint;
    };

    const exoprint = await matrixCut(CalcAdd13);

    console.log('[MORPH PHASE END]\n');

    return exoprint;
  }
}