import { useMemo, useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { ChainPicker } from "./chain-picker";
import { RouteInfo } from "./route-info";
import {
  ROUTES,
  findRoute,
  availableSources,
  availableDestinations,
  type ChainId,
} from "../lib/bridge-config";
import { PreviewBadge } from "./preview-badge";

const ALL_CHAINS = Array.from(new Set(ROUTES.flatMap((r) => [r.from, r.to]))) as ChainId[];

export function BridgeForm() {
  const [from, setFrom] = useState<ChainId>(8453);
  const [to, setTo] = useState<ChainId>(2366);
  const [amount, setAmount] = useState("");

  const route = useMemo(() => findRoute(from, to), [from, to]);

  function swap() {
    // Only swap when a valid reverse route exists. Otherwise leave the form
    // untouched: forcing the swap would set `from` to a chain that has no
    // outgoing routes (e.g. Kite), which is not a valid source and leaves the
    // "From" picker showing a value that isn't in its options.
    const reverse = findRoute(to, from);
    if (reverse) {
      setFrom(to);
      setTo(from);
    }
  }

  const sources = ALL_CHAINS.filter((c) => availableDestinations(c).length > 0);
  const dests = availableDestinations(from);

  return (
    <div className="rounded-2xl border border-kite-border bg-kite-card p-6 sm:p-8 space-y-5 max-w-md w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-kite-fg">Bridge USDC.e</h2>
        <PreviewBadge>PREVIEW</PreviewBadge>
      </div>

      <ChainPicker label="From" value={from} options={sources} onChange={setFrom} />

      <div className="flex justify-center">
        <button
          onClick={swap}
          aria-label="Swap chains"
          className="p-2 rounded-full border border-kite-border bg-kite-bg hover:bg-kite-muted transition-colors text-kite-fg/70 hover:text-kite-fg"
        >
          <ArrowLeftRight className="w-4 h-4" />
        </button>
      </div>

      <ChainPicker label="To" value={to} options={dests.length ? dests : [2366]} onChange={setTo} />

      <label className="block">
        <span className="block text-[10px] font-bold tracking-widest uppercase text-kite-fg/55 mb-1">
          Amount
        </span>
        <div className="relative">
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
            placeholder="0.00"
            inputMode="decimal"
            className="w-full px-3 py-3 pr-16 rounded-md border border-kite-border bg-kite-bg font-mono text-lg focus:outline-none focus:border-kite-primary"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-kite-fg/55 tracking-widest uppercase">
            {route?.symbol ?? "USDC"}
          </span>
        </div>
      </label>

      <RouteInfo route={route} amount={amount} />

      <button
        disabled
        title="Bridge protocol pending Foundation confirmation"
        className="h-12 w-full inline-flex items-center justify-center rounded-md bg-kite-primary text-white font-medium opacity-40 cursor-not-allowed"
      >
        Bridge disabled — pending protocol confirmation
      </button>

      <p className="text-xs text-kite-fg/55 leading-relaxed">
        KiteBridge UI is open source but the underlying bridge contracts will be operated by a third
        party (LayerZero, Wormhole, or Axelar — TBD). Always verify contract addresses on the
        provider's official docs before sending real funds.
      </p>
    </div>
  );
}
