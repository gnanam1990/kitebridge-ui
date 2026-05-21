import { SiteHeader } from "./components/site-header";
import { SiteFooter } from "./components/site-footer";
import { AuditWarning } from "./components/audit-warning";
import { BridgeForm } from "./components/bridge-form";
import { PreviewBadge } from "./components/preview-badge";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <AuditWarning />

      <main className="flex-1">
        <section className="kite-gradient border-b border-kite-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <p className="text-xs font-bold tracking-widest uppercase text-kite-primary mb-3">
              Bridge UI · v0.1
            </p>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-kite-fg">
              Bring USDC.e to Kite.
            </h1>
            <p className="mt-5 text-lg text-kite-fg/70 max-w-2xl mx-auto">
              A clean Kite-themed wrapper on top of audited cross-chain bridges. Active routes light
              up automatically once the Kite Foundation confirms a partner protocol.
            </p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center gap-10">
          <BridgeForm />

          <div className="max-w-md w-full grid sm:grid-cols-2 gap-4 text-sm">
            <Card title="Why no buttons yet?">
              The Kite Foundation hasn't announced an official bridge partner. We're publishing the UI
              ahead of time so the rest of the ecosystem can react quickly.
            </Card>
            <Card title="Native KITE bridging" badge>
              KITE-to-other-chains bridging is intentionally excluded from v0.1.
            </Card>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function Card({ title, children, badge }: { title: string; children: React.ReactNode; badge?: boolean }) {
  return (
    <div className="rounded-xl border border-kite-border bg-kite-card p-4">
      <div className="flex items-center gap-2 mb-1">
        <h3 className="text-sm font-semibold text-kite-fg">{title}</h3>
        {badge && <PreviewBadge>v0.2</PreviewBadge>}
      </div>
      <p className="text-sm text-kite-fg/65 leading-relaxed">{children}</p>
    </div>
  );
}
