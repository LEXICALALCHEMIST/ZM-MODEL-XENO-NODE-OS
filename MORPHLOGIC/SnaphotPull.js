// ZMXENO/MorphLogic/SnapshotPull.js
import { SYMBOL_SEQUENCE, VOID_SYMBOL } from '../core/sacred9.js';

export const SnapshotPull = {
  async snapPull(skeleton, newNumber) {
    const u1 = skeleton.units[0];

    if (!u1.state.u1Collapse) return skeleton;

    const digits = newNumber.toString().split('').map(Number);
    skeleton.state.numberLength = digits.length || 1;
    skeleton.state.activeUnitTarget = `u${skeleton.state.numberLength}`;

    skeleton.units.forEach((unit, i) => {
      unit.state.currentSymbol = VOID_SYMBOL;
      unit.state.carry = 0;
      unit.state.hasCollapsed = false;
      unit.state.pushes = [];
      unit.state.pushesLength = 0;
      unit.state.u1Collapse = false;

      const digit = digits[i];
      if (digit !== undefined) {
        unit.state.currentSymbol = SYMBOL_SEQUENCE[digit];
      }
    });

    skeleton.state.snapshot = JSON.parse(JSON.stringify(skeleton.getState()));
    return skeleton;
  }
};