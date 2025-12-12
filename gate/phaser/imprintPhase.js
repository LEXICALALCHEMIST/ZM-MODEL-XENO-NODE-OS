export const imprintPhase = (imprint) => {
  if (!imprint?.intent || !imprint?.app) {
    throw new Error('Invalid imprint — missing intent or app');
  }

  phaser.begin('IMPRINT_RECEIVED', {
    id: imprint.id || 'no-id',
    app: imprint.app,
    intent: imprint.intent,
    a: imprint.a,
    b: imprint.b,
    timestamp: new Date().toISOString()
  });

  console.log(`\n[IMPRINT] ${imprint.app} → ${imprint.intent}`);
  if (imprint.a !== undefined) console.log(`   a: ${imprint.a}`);
  if (imprint.b !== undefined) console.log(`   b: ${imprint.b}`);

  // No skeleton yet — just the raw intent
  phaser.current.snapshot = { status: 'intent received', value: 'pending' };
  phaser.end();

  return imprint;
};