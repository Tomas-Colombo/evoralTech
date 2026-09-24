import Image from "next/image";

import { cn } from "@/lib/utils";
import type { Founder } from "@/data/founders";

export interface FounderCardProps {
  founder: Founder;
  className?: string;
}

/**
 * Presentational founder card.
 *
 * Falls back to an initials mark on the same circuit-and-bloom cover the
 * project cards use, so a founder without a portrait still looks deliberate.
 */
export function FounderCard({ founder, className }: FounderCardProps) {
  const { name, role, initials, bio, focus, photo } = founder;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-gold-500/15 bg-surface transition-colors duration-300 hover:border-gold-300/35",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-gold-500/10 bg-black">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,var(--gold-500)_1px,transparent_1px),linear-gradient(to_bottom,var(--gold-500)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
        />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--glow)_0%,transparent_70%)] blur-2xl transition-opacity duration-500 group-hover:opacity-90 md:opacity-70"
        />

        {photo ? (
          <Image
            src={photo}
            alt={name}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="relative object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="font-display absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold-500/30 bg-black/40 text-2xl font-bold tracking-[0.05em] text-gold-300 drop-shadow-[0_0_18px_var(--glow)] transition-transform duration-500 group-hover:scale-105"
          >
            {initials}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold text-foreground">{name}</h3>
        <p className="mt-1 text-sm text-gold-200/70">{role}</p>
        <p className="mt-4 text-sm leading-relaxed text-muted">{bio}</p>

        <ul className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.06] pt-5">
          {focus.map((item) => (
            <li
              key={item}
              className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default FounderCard;
