// ZMXENO/gate/imprint/imprint.js
// Pure, zero-dependency imprint factory

const simpleUuid = () => crypto.randomUUID();

export const Imprint = (config) => ({
  id: config.id || simpleUuid(),
  app: config.app || "unknown",
  intent: config.intent,
  timestamp: Date.now(),
  a: config.a ?? null,
  b: config.b ?? null,
  meta: config.meta || {}
});

// ——— CALCULATOR IMPRINT ———
export const CalcAdd13 = Imprint({
  app: "calculator",
  intent: "add",
  a: 1,
  b: 3
});