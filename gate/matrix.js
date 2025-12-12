// ZMXENO/gate/matrix.js — FINAL, SACRED, WORKS
import SkeletonInitializer from '../MorphLogic/SkeletonInitializer.js';
import { phaser } from './phaser/phaser.js';
import { CalcAdd13 } from './imprint.js';
import { skeletonToNumber } from '../utils/translator.js';
import { SYMBOL_SEQUENCE, VOID_SYMBOL } from '../core/sacred9.js';

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

    // PHASE 3 — SKELETON
    phaser.begin('SKELETON_INIT');
    let skeleton = this.skeletons.get(appId);
    if (!skeleton) {
      skeleton = new SkeletonInitializer();
      await skeleton.set(0, true);
      this.skeletons.set(appId, skeleton);
      console.log('[CHECKPOINT] Skeleton created and set to 0');
    }

    const state = skeleton.getState();
    const value = skeletonToNumber(state);

    console.log(`[CHECKPOINT] Initial value: ${value}`);
    phaser.snap(skeleton).end();

    return skeleton;
  }
}