// ZMXENO/gate/imprint.js
// The sacred imprint — the only thing that moves intent

export const Imprint = (config) => ({
  // Required
  app: config.app,                    // "calculator", "notepad", etc.
  intent: config.intent,              // "add", "sub", "push", "pull", "write", etc.

  // Payload (flexible)
  a: config.a ?? null,                // first operand / skeletonA
  b: config.b ?? null,                // second operand / skeletonB

  // Optional metadata
  morphId: config.morphId ?? Date.now(),
  timestamp: config.timestamp ?? Date.now(),

  // Future-proof extension
  ...config.extra
});

// Example usage (kept here for reference)
/*
Imprint({
  app: "calculator",
  intent: "add",
  a: 1,
  b: 2
});
*/

// also matrix .js where the tranformation happens