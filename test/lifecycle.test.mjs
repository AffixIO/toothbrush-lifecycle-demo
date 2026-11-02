import test from 'node:test';
import assert from 'node:assert/strict';
import { createEvidence, verifyEvidence } from '../src/lifecycle.mjs';

test('accepts an untampered usage-day record', () => {
  const e = createEvidence({ deviceId: 'brush-1', day: 12 });
  assert.deepEqual(verifyEvidence(e, { expectedDeviceId: 'brush-1' }).ok, true);
});

test('rejects changes made after authorisation', () => {
  const e = createEvidence({ deviceId: 'brush-1', day: 12 });
  e.payload.day = 13;
  assert.equal(verifyEvidence(e, { expectedDeviceId: 'brush-1' }).reason, 'tampered');
});

test('rejects replay and revocation', () => {
  const e = createEvidence({ deviceId: 'brush-1', day: 12 });
  assert.equal(verifyEvidence(e, { expectedDeviceId: 'brush-1', seen: new Set([e.id]) }).reason, 'replay');
  assert.equal(verifyEvidence(e, { expectedDeviceId: 'brush-1', revoked: new Set([e.id]) }).reason, 'revoked');
});

test('rejects a different device and impossible lifecycle day', () => {
  const e = createEvidence({ deviceId: 'brush-1', day: 366 });
  assert.equal(verifyEvidence(e, { expectedDeviceId: 'brush-2' }).reason, 'wrong-device');
  assert.equal(verifyEvidence(e, { expectedDeviceId: 'brush-1' }).reason, 'day-out-of-range');
});
