import { Clock, Coins, ShieldAlert } from "lucide-react";
import type { BridgeRoute } from "../lib/bridge-config";

export function RouteInfo({ route, amount }: { route: BridgeRoute | null; amount: string }) {
  if (!route) {
    return (
      <div className="rounded-lg border border-kite-border bg-kite-muted/40 px-4 py-3 text-sm text-kite-fg/70">
        No supported route between these chains yet. Try a different combination.
      </div>
    );
  }

  const parsed = parseFloat(amount || "0") || 0;
  const receive = Math.max(0, parsed - route.base_fee_usd);

  return (
    <div className="rounded-lg border border-kite-border bg-kite-card px-4 py-3 text-sm space-y-2">
      <Row icon={<Clock className="w-3.5 h-3.5" />} label="Estimated time">
        ~{route.estimated_time_minutes} min
      </Row>
      <Row icon={<Coins className="w-3.5 h-3.5" />} label="Bridge fee">
        ${route.base_fee_usd.toFixed(2)}
      </Row>
      <Row icon={<Coins className="w-3.5 h-3.5" />} label="You receive">
        <span className="font-mono">{receive.toFixed(2)} {route.symbol}</span>
      </Row>
      <Row icon={<ShieldAlert className="w-3.5 h-3.5" />} label="Protocol">
        <span className="capitalize">{route.protocol}</span>
        {route.protocol === "pending" && (
          <span className="ml-2 text-xs text-kite-destructive">— awaiting confirmation</span>
        )}
      </Row>
    </div>
  );
}

function Row({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-1.5 text-kite-fg/60">
        {icon} {label}
      </span>
      <span className="text-kite-fg">{children}</span>
    </div>
  );
}
