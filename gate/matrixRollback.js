// ZMXENO/gate/matrix.js — CLEAN, STARTING POINT, NO EXTRA LOGIC

//morphlogic skeleton assistance
import SkeletonInitializer from '../morphlogic/SkeletonInitializer.js';
import { skeletonToNumber } from '../utils/translator.js';

//moudles
import { modulePush } from '../morphlogic/modules/modulePush.js';  // ← ONLY THIS
import { modulePull } from '../morphlogic/modules/modulePull.js';  // ← ONLY THIS

//[phaser for checkpointing]
import { phaser } from './phaser/phaser.js';

// imprint testing object
import { CalcAdd13 } from './imprint.js';

export class Matrix {
  constructor() {
    this.skeletons = new Map();
  }

  async initialize(appId = "test") {
    // PHASE 1 — INITIALIZE
    phaser.begin('INITIALIZE');
    console.log('[CHECKPOINT] Matrix initialized');
    phaser.end();

    // PHASE 2 — IMPRINT
    phaser.begin('IMPRINT');
    console.log('[CHECKPOINT] Imprint received — CalcAdd13');
    console.log(`   app     : ${CalcAdd13.app}`);
    console.log(`   intent  : ${CalcAdd13.intent}`);
    console.log(`   a       : ${CalcAdd13.a}`);
    console.log(`   b       : ${CalcAdd13.b}`);
    console.log(`   id      : ${CalcAdd13.id}`);
    console.log(`   time    : ${new Date(CalcAdd13.timestamp).toISOString()}`);
    phaser.end();

    // PHASE 3 — MORPH PHASE START ()
    console.log('\n[MORPH PHASE START]');
    console.log('[MORPH] Ready for MATRIX CASCADE');
     
    // ONE LINE — COOKS PERFECTLY
    await modulePush(CalcAdd13);
    // NO SKELETON
    // NO TRANSLATOR
    // NO EXTRA CODE

    console.log('[MORPH PHASE END]\n');

    return null; // nothing yet
  }
}