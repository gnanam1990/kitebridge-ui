export type ChainId = 1 | 8453 | 43114 | 2366;

export interface ChainMeta {
  id: ChainId;
  name: string;
  short: string;
  explorer: string;
  nativeSymbol: string;
}

export const CHAINS: Record<ChainId, ChainMeta> = {
  1:     { id: 1,     name: "Ethereum",  short: "ETH",   explorer: "https://etherscan.io",  nativeSymbol: "ETH" },
  8453:  { id: 8453,  name: "Base",      short: "BASE",  explorer: "https://basescan.org",  nativeSymbol: "ETH" },
  43114: { id: 43114, name: "Avalanche", short: "AVAX",  explorer: "https://snowtrace.io",  nativeSymbol: "AVAX" },
  2366:  { id: 2366,  name: "Kite",      short: "KITE",  explorer: "https://kitescan.ai",   nativeSymbol: "KITE" },
};

export interface BridgeRoute {
  from: ChainId;
  to: ChainId;
  /** ERC-20 address on the source chain (verified from issuer docs). */
  source_token: `0x${string}`;
  /** ERC-20 address on the destination chain. Empty string = pending confirmation. */
  dest_token: `0x${string}` | "";
  protocol: "layerzero" | "wormhole" | "axelar" | "pending";
  protocol_docs?: string;
  bridge_contract: `0x${string}` | "";
  estimated_time_minutes: number;
  base_fee_usd: number;
  symbol: string;
  /** True if this route is wired up. False = UI shown but bridge button disabled. */
  live: boolean;
}

export const ROUTES: BridgeRoute[] = [
  {
    from: 8453,
    to: 2366,
    source_token: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    dest_token: "",
    protocol: "pending",
    bridge_contract: "",
    estimated_time_minutes: 5,
    base_fee_usd: 0.5,
    symbol: "USDC.e",
    live: false,
  },
  {
    from: 43114,
    to: 2366,
    source_token: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    dest_token: "",
    protocol: "pending",
    bridge_contract: "",
    estimated_time_minutes: 7,
    base_fee_usd: 0.6,
    symbol: "USDC.e",
    live: false,
  },
  {
    from: 1,
    to: 2366,
    source_token: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    dest_token: "",
    protocol: "pending",
    bridge_contract: "",
    estimated_time_minutes: 15,
    base_fee_usd: 8.0,
    symbol: "USDC.e",
    live: false,
  },
];

export function findRoute(from: ChainId, to: ChainId): BridgeRoute | null {
  return ROUTES.find((r) => r.from === from && r.to === to) ?? null;
}

export function availableSources(dest: ChainId): ChainId[] {
  return Array.from(new Set(ROUTES.filter((r) => r.to === dest).map((r) => r.from)));
}

export function availableDestinations(src: ChainId): ChainId[] {
  return Array.from(new Set(ROUTES.filter((r) => r.from === src).map((r) => r.to)));
}
