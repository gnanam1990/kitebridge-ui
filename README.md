# KiteBridge UI

A Kite-themed UI wrapper for bringing USDC.e to Kite Mainnet. **PREVIEW** — bridge protocol pending Foundation confirmation.

## What this is (and isn't)

**Is:**
- A clean React UI for selecting source chain, destination chain, and amount
- A route registry (`src/lib/bridge-config.ts`) ready to wire up to LayerZero / Wormhole / Axelar
- Persistent audit-warning banner until at least one route is live

**Is not:**
- A new bridge protocol — we never write bridge contracts
- Connected to any live bridge yet — destination contract on Kite Mainnet is pending
- Suitable for real funds today — buttons are deliberately disabled

## Stack

- Vite 6 + React 19 + TypeScript
- Tailwind v4 (warm Kite palette)
- viem + wagmi (multi-chain config)

## Develop

```bash
pnpm install
pnpm dev
```

## Roadmap

- **v0.1 (this)** — UI shell, route registry, persistent disclosures
- **v0.2** — wire up confirmed bridge protocol on testnet, end-to-end bridge tx
- **v0.3** — mainnet routes, native KITE bridging, stuck-tx recovery

## License

MIT
