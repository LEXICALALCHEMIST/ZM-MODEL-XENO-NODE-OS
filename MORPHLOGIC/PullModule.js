// ZMXENO/MorphLogic/PullModule.js
import { morphInit } from '../core/morphInit.js';
import { Shutter } from './shutter.js';
import { SYMBOL_SEQUENCE } from '../core/sacred9.js';

export default class PullModule {
  constructor(skeleton) {
    this.skeleton = skeleton;
  }

  // ← THIS WAS MISSING: proper method declaration
  async pull(keyNumber) {
    const currentSkeletonNumber = parseInt(
      this.skeleton.units
        .slice(0, this.skeleton.state.numberLength)
        .map(u => SYMBOL_SEQUENCE.indexOf(u.state.currentSymbol))
        .join('') || '0',
      10
    );

    const { skeleton, key } = await morphInit(keyNumber, currentSkeletonNumber, false);
    this.skeleton = skeleton;
    const units = this.skeleton.units;

    for (let i = 0; i < key.push.length && i < units.length; i++) {
      const [unitName, valueStr] = key.push[i].split(':');
      const unitIndex = parseInt(unitName.replace('U', '')) - 1;
      const unit = units[unitIndex];

      if (valueStr !== 'null') {
        const value = parseInt(valueStr);
        if (value > 0) {
          unit.pull(value, this.skeleton.carryBus);

          while (this.skeleton.carryBus.carryValue < 0) {
            const { carryValue, carryTarget } = this.skeleton.carryBus.flushCarry();
            const targetIndex = parseInt(carryTarget.replace('Unit', '')) - 1;
            if (targetIndex >= 0 && targetIndex < units.length) {
              units[targetIndex].pull(1, this.skeleton.carryBus);
            }
          }
        }
      }
    }

    const newSkeletonNumber = Math.max(currentSkeletonNumber - keyNumber, 0);

    units.forEach(unit => {
      if (unit.state) {
        unit.state.pushes = [];
        unit.state.pushesLength = 0;
        unit.state.carry = 0;
        unit.state.hasCollapsed = false;
        unit.state.u1Collapse = false;
      }
    });
    this.skeleton.carryBus.carryValue = 0;
    this.skeleton.carryBus.carryTarget = null;

    this.skeleton = await Shutter.snapMidMorph(this.skeleton, newSkeletonNumber);

    return this.skeleton.getState();
  }
}