// ZMXENO/MorphLogic/Shutter.js
import { SYMBOL_SEQUENCE, VOID_SYMBOL } from '../core/sacred9.js';

export const Shutter = {
  async snapMidMorph(skeleton, computedNumber) {
    const digits = computedNumber.toString().split('').map(Number);
    skeleton.state.numberLength = computedNumber === 0 ? 1 : digits.length;
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

    // Deep snapshot
    skeleton.state.snapshot = JSON.parse(JSON.stringify(skeleton.getState()));

    return skeleton;
  }
};