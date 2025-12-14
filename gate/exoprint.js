// ZMXENO/gate/exoprint.js — TINY, SACRED, <5 LINES

export class Exoprint {
  constructor({ value, state, intent, id }) {
    this.value = value;          // reconstructed number (e.g. -2, 13, etc.)
    this.state = state;          // full lattice units for harness/swarm
    this.intent = intent;        // echoed intent
    this.id = id;                // imprint id
  }
}