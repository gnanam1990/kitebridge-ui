import { AlertTriangle } from "lucide-react";

export function AuditWarning() {
  return (
    <div className="border-b border-kite-destructive/40 bg-kite-destructive/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-start sm:items-center gap-3 text-sm">
        <AlertTriangle className="w-5 h-5 text-kite-destructive shrink-0 mt-0.5 sm:mt-0" />
        <p className="text-kite-fg/85">
          <strong className="text-kite-destructive">PREVIEW — DO NOT USE WITH MAINNET FUNDS.</strong>{" "}
          KiteBridge UI is a wrapper around third-party bridge protocols. The destination contract on
          Kite Mainnet is pending Foundation confirmation. Test on testnet first.
        </p>
      </div>
    </div>
  );
}
