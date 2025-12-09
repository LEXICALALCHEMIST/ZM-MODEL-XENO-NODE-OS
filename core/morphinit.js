// ZMXENO/core/morphInit.js
import SkeletonInitializer from '../MorphLogic/SkeletonInitializer.js';
import KeyMaker from '../key/KeyMaker.js';
import ShiftKey from '../key/ShiftKey.js';

export async function morphInit(value, current = 0, push = true) {
  const vLen = value.toString().length;
  const cLen = current.toString().length;

  const skeletonVal = vLen > cLen ? value : current;
  const keyVal = vLen > cLen ? current : value;

  const skeleton = new SkeletonInitializer();
  await skeleton.set(skeletonVal, push);

  // ←←← THIS WAS THE BUG
  const keyMaker = new KeyMaker();                    // ← instance
  const tempKey = keyMaker.makeKey(keyVal);           // ← call method
  const shiftedKey = new ShiftKey().shift(tempKey, skeleton.state.numberLength);

  return { skeleton, key: shiftedKey };
}