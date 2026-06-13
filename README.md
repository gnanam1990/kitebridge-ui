# KiteBridge UI

> A Kite-themed preview UI for bridging USDC.e to Kite Mainnet from Ethereum, Base, and Avalanche.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Language: TypeScript](https://img.shields.io/badge/Language-TypeScript-3178c6.svg)

## Overview

KiteBridge UI is a single-page web application that presents a clean, branded front end for moving USDC.e into Kite Mainnet. It is intentionally a UI shell only: it does not implement a bridge protocol and is designed to wrap an audited third-party bridge once the Kite Foundation confirms an official partner. Every route is currently in preview, so the bridge action is disabled and no on-chain transactions are sent.

## Features

- Cross-chain bridge form with source/destination chain pickers and an amount input.
- Static route registry (`src/lib/bridge-config.ts`) describing supported source chains (Ethereum, Base, Avalanche) bridging into Kite, including source token addresses, estimated time, and base fee.
- Route info panel showing estimated time, bridge fee, estimated amount received, and protocol status per selected route.
- Direction swap that only applies when a valid reverse route exists.
- Persistent audit-warning banner and PREVIEW badges throughout the interface.
- Kite brand assets and a warm Tailwind v4 theme.

> Preview only: all routes are marked `live: false` with `protocol: "pending"` and no destination contract. The "Bridge" button is permanently disabled until a route is wired up. Wallet connectivity is not yet implemented.

## Tech stack

- **Vite 6** (build tool and dev server)
- **React 19** + **TypeScript 5**
- **Tailwind CSS v4** via `@tailwindcss/vite`
- **lucide-react** (icons)
- **viem** and **wagmi** — declared dependencies reserved for upcoming wallet/chain integration (not yet wired into the UI)
- **@tanstack/react-query** — declared dependency reserved for future data fetching (not yet used)

## Getting started

### Prerequisites

- Node.js 18+ (Vite 6 requirement)
- A package manager: npm, pnpm, or bun

### Installation

```bash
npm install
```

### Configuration

No environment variables are required. The application reads no `import.meta.env` / `VITE_*` values; all chain and route data is defined statically in `src/lib/bridge-config.ts`.

### Running

```bash
npm run dev      # start the dev server on http://localhost:3000
npm run build    # production build to dist/
npm run preview  # preview the production build locally
npm run lint     # type-check with tsc --noEmit
```

## Usage

After starting the dev server, open the app and:

1. Select a source chain (Ethereum, Base, or Avalanche).
2. Confirm the destination (Kite) and enter an amount of USDC.e.
3. Review the route info panel (estimated time, fee, amount received, protocol status).

The bridge button is disabled in this preview build, so no transaction is submitted. To add or change routes, edit the `ROUTES` and `CHAINS` definitions in `src/lib/bridge-config.ts`.

## Project structure

```
index.html               App entry HTML
vite.config.ts           Vite + React + Tailwind config
src/
  main.tsx               React root
  App.tsx                Page layout and hero
  index.css              Tailwind theme and styles
  lib/
    bridge-config.ts     Chains, routes, and route lookup helpers
  components/
    bridge-form.tsx      Bridge form (chain pickers, amount, disabled action)
    chain-picker.tsx     Chain select control
    route-info.tsx       Per-route details panel
    audit-warning.tsx    Persistent preview/audit banner
    preview-badge.tsx    Reusable PREVIEW badge
    site-header.tsx      Header
    site-footer.tsx      Footer
    kite-logo.tsx        Brand logo
    address-display.tsx  Address truncation helper
public/brand/            Kite logo assets
```

## Status

Preview / v0.1 UI shell. The interface, route registry, and disclosures are real and functional, but no bridge is connected:

- All routes are `live: false` with `protocol: "pending"`; destination contracts and bridge contracts are empty pending Foundation confirmation.
- The bridge action button is deliberately disabled — not suitable for real funds.
- No wallet connection is wired up yet; `viem`/`wagmi`/`react-query` are present as dependencies for future integration.

Do not use with mainnet funds.

## License

MIT — see [LICENSE](LICENSE).
