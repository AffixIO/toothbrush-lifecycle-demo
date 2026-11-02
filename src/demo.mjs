import { createEvidence, verifyEvidence } from './lifecycle.mjs';

const deviceId = 'demo-toothbrush-001';
const evidence = createEvidence({ deviceId, day: 184 });
const result = verifyEvidence(evidence, { expectedDeviceId: deviceId });
console.log(JSON.stringify({ product: '12-month electric toothbrush', mode: 'simulation', evidence, result }, null, 2));
