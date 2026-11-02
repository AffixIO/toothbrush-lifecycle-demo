# Verifiable device lifecycle, with AffixIO

This tiny example explores a practical question: if a product is designed for a 12-month life, how can an agent or service verify reported usage days without trusting a mutable counter?

It uses simulated toothbrush telemetry only. No device, payment provider, account, private key, or production AffixIO service is contacted. The local verifier binds a usage event to a device ID and an exact content digest, then rejects tampering, replay, revocation, wrong-device evidence, and impossible dates.

## Five-minute quickstart

```bash
git clone https://github.com/AffixIO/toothbrush-lifecycle-demo.git
cd toothbrush-lifecycle-demo
npm test
npm run demo
```

The demo prints one verified usage-day record. The test suite shows the important boundary: once the authorised payload changes, the original evidence is no longer valid.

## What this proves

- **Verified** means the local evidence envelope is intact and belongs to the expected device.
- **Tampered** means the payload no longer matches the recorded digest.
- **Replay** means the same operation has already been consumed.
- **Revoked** means the evidence has been explicitly withdrawn.

This does not prove physical durability, battery health, brushing quality, or that a toothbrush will last 12 months. Those require engineering tests and product evidence. AffixIO can provide the verification layer for signed lifecycle events when connected through a supported SDK workflow.

## Real AffixIO integration

The repository intentionally keeps the core demo dependency-free and offline. To connect it to AffixIO, replace the local evidence adapter with the documented SDK proof-generation and verification calls available to your account and pin the expected signer. Do not place API keys in source code or commit real device data.

## Why this is useful

The same pattern can support warranty milestones, maintenance intervals, consumable replacement, rental handover, fleet servicing, and machine-readable product passports. The claim stays narrow: verify what was recorded, without pretending that a cryptographic proof replaces physical testing.

## Status

Research example. Simulated only. Not a warranty system, payment system, safety certification, or production device integration.

## Contributing

Issues and small, tested improvements are welcome. Please keep examples fictional, avoid credentials and personal data, and explain what the evidence actually proves.

## License

MIT
