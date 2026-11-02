import { createHash, randomUUID } from 'node:crypto';

const canonical = value => JSON.stringify(value, Object.keys(value).sort());
const digest = value => createHash('sha256').update(canonical(value)).digest('hex');

export function createEvidence({ deviceId, day, event = 'usage-day', issuedAt = new Date().toISOString() }) {
  const payload = { deviceId, day, event, issuedAt };
  return { id: randomUUID(), payload, digest: digest(payload) };
}

export function verifyEvidence(evidence, { expectedDeviceId, maxDay = 365, revoked = new Set(), seen = new Set() } = {}) {
  if (!evidence?.id || !evidence?.payload || !evidence?.digest) return { ok: false, reason: 'malformed' };
  if (revoked.has(evidence.id)) return { ok: false, reason: 'revoked' };
  if (seen.has(evidence.id)) return { ok: false, reason: 'replay' };
  if (evidence.payload.deviceId !== expectedDeviceId) return { ok: false, reason: 'wrong-device' };
  if (!Number.isInteger(evidence.payload.day) || evidence.payload.day < 1 || evidence.payload.day > maxDay) return { ok: false, reason: 'day-out-of-range' };
  if (digest(evidence.payload) !== evidence.digest) return { ok: false, reason: 'tampered' };
  return { ok: true, reason: 'verified' };
}
