// ZMXENO/gate/matrix.js
import PushModule from '../MorphLogic/PushModule.js';
import PullModule from '../MorphLogic/PullModule.js';
import SkeletonInitializer from '../MorphLogic/SkeletonInitializer.js';
import { SYMBOL_SEQUENCE } from '../core/sacred9.js';

export class Matrix {
  constructor() {
    this.skeletons = new Map(); // appId → SkeletonInitializer
  }

  async resolve(imprint) {
//added imprint validation
    if (!imprint?.app || !Object.values(INTENTS).includes(imprint.intent)) {
  throw new Error('Invalid imprint');
    }
    const { app, intent, a, b } = imprint;

    let skeleton = this.skeletons.get(app);
    if (!skeleton) {
      skeleton = new SkeletonInitializer();
      await skeleton.set(0, true);  // keeps logic, but now 0 is stored as ⚙ not numeric
      this.skeletons.set(app, skeleton);
    }

    if (intent === "add" || intent === "push") {
      const push = new PushModule(skeleton);
      if (a !== undefined) await push.push(a);
      if (b !== undefined) await push.push(b);
    }

    if (intent === "sub" || intent === "pull") {
      const pull = new PullModule(skeleton);
      await pull.pull(b ?? a);
    }

    const state = skeleton.getState();
    const value = parseInt(
      state.units
        .slice(0, state.numberLength)
        .map(u => SYMBOL_SEQUENCE.indexOf(u.currentSymbol))
        .join('') || '0',
      10
    );

    return { value, state };
  }

  reset(app) {
    this.skeletons.delete(app);
  }
}