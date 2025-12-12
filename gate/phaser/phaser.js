// ZMXENO/gate/phaser/phaser.js — THE SACRED OBSERVER
import './imprintPhase.js';  // ← pulls in the phase (no export needed)
import { skeletonToString } from '../../utils/translator.js';
import { SYMBOL_SEQUENCE, VOID_SYMBOL } from '../../core/sacred9.js';
class Phase {
  constructor() {
    this.history = [];
    this.current = null;
  }

  begin(name, data = {}) {
    this.current = {
      phase: name,
      timestamp: Date.now(),
      data,
      snapshot: null
    };
    console.log(`\n[PHASE:${name.toUpperCase()}] START`);
    return this;
  }

  snap(skeleton) {
    if (!skeleton) return this;
    const state = skeleton.getState();
    const display = skeletonToString(state);
    const value = this.reconstruct(state);

    this.current.snapshot = { display, value, length: state.numberLength };

    console.log(`[SNAP]  Skeleton: ${display}`);
    console.log(`[SNAP]  Value: ${value} | Length: ${state.numberLength}`);
    return this;
  }

  reconstruct(state) {
    let value = 0;
    for (let i = 0; i < state.numberLength; i++) {
      const idx = SYMBOL_SEQUENCE.indexOf(state.units[i].currentSymbol);
      value = value * 10 + (idx === -1 ? 0 : idx);
    }
    return value;
  }

  end() {
    if (this.current) {
      this.history.push({ ...this.current });
      console.log(`[PHASE:${this.current.phase.toUpperCase()}] END\n`);
      this.current = null;
    }
    return this.history;
  }

  reset() {
    this.history = [];
  }

  log() {
    return this.history;
  }
}

export const phaser = new Phase();