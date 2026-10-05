import { cn } from "@/lib/utils";

/**
 * Abstract compositions standing in for project imagery. Each one is drawn
 * from what the project actually does, not from stock: sizes and tenants for
 * a retail ERP, a signed certificate for verifiable profiles, a payment
 * schedule shaped like the Andes for a leasing simulator.
 *
 * They scale with their frame through container query units, so they read
 * the same at any width. Purely decorative.
 */

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
/** Deterministic fill levels for the stock matrix, so renders never differ. */
const LEVELS = [
  [0.3, 0.8, 1, 0.9, 0.5, 0.2],
  [0.6, 0.4, 0.7, 1, 0.8, 0.3],
  [0.2, 0.9, 0.6, 0.5, 0.3, 0.1],
  [0.8, 1, 0.9, 0.7, 0.6, 0.4],
  [0.4, 0.5, 0.3, 0.6, 0.9, 0.7],
];

export function UtopiaVisual() {
  return (
    <div className="@container absolute inset-0 overflow-hidden bg-paper-2">
      <div className="absolute inset-0 [background-image:linear-gradient(var(--rule-faint)_1px,transparent_1px),linear-gradient(90deg,var(--rule-faint)_1px,transparent_1px)] [background-size:4cqw_4cqw]" />

      {/* Tenants: separate sheets, isolated at the database, stacked in depth */}
      {["Marca C", "Marca B"].map((tenant, i) => (
        <div
          key={tenant}
          className="absolute border border-rule bg-paper-light/70"
          style={{ left: `${22 - i * 5}%`, top: `${11 + i * 5}%`, width: "62%", height: "62%" }}
        >
          <span className="absolute left-[2.4cqw] top-[1.8cqw] font-mono text-[1.35cqw] uppercase tracking-[0.08em] text-ink-2">
            {tenant}
          </span>
        </div>
      ))}

      <div className="absolute left-[12%] top-[21%] h-[62%] w-[62%] border border-ink bg-paper-light shadow-[1.5cqw_2cqw_4cqw_-1.5cqw_rgba(51,38,29,0.25)]">
        <div className="flex items-center justify-between border-b border-rule px-[2.4cqw] py-[1.6cqw]">
          <span className="font-mono text-[1.35cqw] uppercase tracking-[0.08em]">Marca A · Inventario por talle</span>
          <span className="size-[1.2cqw] bg-accent" />
        </div>
        <div className="grid grid-cols-[1.4fr_repeat(6,1fr)] gap-x-[1cqw] px-[2.4cqw] pt-[2cqw]">
          <span />
          {SIZES.map((size) => (
            <span key={size} className="font-display text-[2.6cqw] leading-none tracking-[-0.02em]">
              {size}
            </span>
          ))}
        </div>
        <div className="mt-[1.6cqw] flex flex-col gap-[1.5cqw] px-[2.4cqw]">
          {LEVELS.map((row, r) => (
            <div key={r} className="grid grid-cols-[1.4fr_repeat(6,1fr)] items-center gap-x-[1cqw]">
              <span className="h-[0.6cqw] w-4/5 bg-ink/15" />
              {row.map((level, c) => (
                <span key={c} className="h-[2.2cqw] bg-ink/[0.06]">
                  <span
                    className={cn("block h-full", r === 3 ? "bg-accent" : "bg-brown/75")}
                    style={{ width: `${level * 100}%` }}
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-[6%] right-[5%] flex items-center gap-[1.2cqw] border border-ink bg-paper px-[1.6cqw] py-[1cqw] font-mono text-[1.35cqw] tracking-[0.02em]">
        <span className="bg-accent px-[0.8cqw] py-[0.2cqw] text-ink">Privado</span>
        Cada marca ve solo sus datos
      </div>
    </div>
  );
}

export function MiliorsVisual() {
  return (
    <div className="@container absolute inset-0 overflow-hidden bg-brown">
      <div className="guides-dark absolute inset-0 opacity-70" />
      <div className="absolute left-1/2 top-1/2 h-[82%] w-[38%] -translate-x-[42%] -translate-y-[48%] rotate-[5deg] bg-paper/20" />
      <div className="absolute left-1/2 top-1/2 flex h-[82%] w-[38%] -translate-x-1/2 -translate-y-1/2 -rotate-[3deg] flex-col bg-paper-light p-[3cqw] shadow-[2cqw_3cqw_5cqw_-2cqw_rgba(0,0,0,0.5)]">
        <div className="flex items-start justify-between">
          <span className="font-mono text-[1.2cqw] uppercase tracking-[0.1em] text-ink-2">Certificado verificable</span>
          <span className="font-mono text-[1.2cqw] text-ink-2">N.º 0417</span>
        </div>
        <p className="mt-[4cqw] font-display text-[4.4cqw] leading-[0.95] tracking-[-0.03em]">
          Perfil
          <br />
          <em>técnico</em>
        </p>
        <div className="mt-[3cqw] flex flex-col gap-[1.2cqw]">
          {[92, 78, 85, 60].map((w, i) => (
            <span key={i} className="h-[0.55cqw] bg-ink/15" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="mt-auto flex items-end justify-between border-t border-rule pt-[2cqw]">
          <div>
            <span className="block font-mono text-[1.1cqw] uppercase tracking-[0.1em] text-ink-2">Firma digital</span>
            <span className="mt-[0.6cqw] block font-mono text-[1.3cqw]">3f9a·c1e0·88d2·c07e</span>
          </div>
          <span className="flex size-[7.5cqw] items-center justify-center rounded-full border border-ink">
            <svg viewBox="0 0 24 24" className="size-1/2" fill="none" stroke="var(--accent-deep)" strokeWidth="2">
              <path d="M5 12.5 10 17 19 7" strokeLinecap="square" />
            </svg>
          </span>
        </div>
      </div>
      <span className="absolute bottom-[6%] left-[5%] flex items-center gap-[1cqw] font-mono text-[1.3cqw] uppercase tracking-[0.1em] text-paper/70">
        <span className="size-[1cqw] rounded-full bg-accent" />
        Verificación pública
      </span>
    </div>
  );
}

/** Payment schedule bars; their heights trace a mountain ridge. */
const RIDGE = Array.from({ length: 36 }, (_, i) => {
  const x = i / 35;
  const peaks = Math.max(
    Math.exp(-((x - 0.28) ** 2) / 0.012) * 0.95,
    Math.exp(-((x - 0.52) ** 2) / 0.02) * 0.78,
    Math.exp(-((x - 0.76) ** 2) / 0.008) * 0.62,
  );
  return Math.round((0.12 + peaks * 0.82) * 1000) / 1000;
});

export function AndesVisual() {
  return (
    <div className="@container absolute inset-0 overflow-hidden bg-accent">
      <div className="absolute inset-x-[5%] top-[8%] flex items-center justify-between border-b border-ink/30 pb-[1.4cqw] font-mono text-[1.1cqw] uppercase tracking-[0.1em]">
        <span>Simulador de cuotas · Leasing PyME</span>
        <span>Dólar BNA · BCRA</span>
      </div>

      <div className="absolute inset-x-[5%] top-[18%] grid grid-cols-3 gap-[3cqw]">
        {["Tipo de bien", "Anticipo", "Moneda"].map((field, i) => (
          <div key={field}>
            <span className="font-mono text-[1.1cqw] uppercase tracking-[0.1em] text-ink/70">{field}</span>
            <div className="relative mt-[1.4cqw] h-px bg-ink/40">
              <span className="absolute -top-[0.7cqw] size-[1.4cqw] rounded-full bg-ink" style={{ left: `${[30, 55, 20][i]}%` }} />
              <span className="absolute inset-y-0 left-0 bg-ink" style={{ width: `${[30, 55, 20][i]}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-x-[5%] bottom-[17%] flex h-[46%] items-end gap-[0.5cqw]">
        {RIDGE.map((h, i) => (
          <span key={i} className="flex-1 bg-ink" style={{ height: `${h * 100}%`, opacity: 0.35 + h * 0.65 }} />
        ))}
      </div>

      <div className="absolute inset-x-[5%] bottom-[7%] flex items-center justify-between font-mono text-[1.1cqw] uppercase tracking-[0.1em]">
        <span>Cuota estimada y ahorro impositivo</span>
        <span className="flex items-center gap-[1cqw] bg-ink px-[1.4cqw] py-[0.8cqw] text-paper">
          Consultar por WhatsApp
          <svg viewBox="0 0 20 20" className="size-[1.4cqw]" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 10h13M11 5l5 5-5 5" />
          </svg>
        </span>
      </div>
    </div>
  );
}
