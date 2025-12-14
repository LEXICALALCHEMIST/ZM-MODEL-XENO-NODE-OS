import { modulePush } from '../morphlogic/modules/modulePush.js';
import { modulePull } from '../morphlogic/modules/modulePull.js';

await modulePush({ a: 500, b: 50 });
await modulePull({ a: 500, b: 50 });