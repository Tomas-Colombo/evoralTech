import * as React from "react";

import { cn } from "@/lib/utils";
import { LOGO_BEVEL, LOGO_PATHS, LOGO_SIZE } from "./logo-paths";

/** Drawing space: the mark plus room for its cast shadows. */
export const SCULPTURE_VB = { x: 160, y: 210, w: 1000, h: 940 } as const;
const VIEWBOX = `${SCULPTURE_VB.x} ${SCULPTURE_VB.y} ${SCULPTURE_VB.w} ${SCULPTURE_VB.h}`;

export type PieceKey = "a" | "b" | "c";

/**
 * Exploded-view offsets in drawing units. Every piece slides along the mark's
 * own slant axis, the way parts separate in an assembly drawing; `lift` is how
 * far its shadow drifts as it rises off the paper.
 */
export const EXPLODE: Record<PieceKey, { x: number; y: number; lift: [number, number] }> = {
  a: { x: 70, y: -80, lift: [34, 48] },
  b: { x: 20, y: -23, lift: [22, 30] },
  c: { x: -60, y: 68, lift: [12, 16] },
};

/** Converts drawing units into percentages of the sculpture box. */
export const toPercent = (x: number, y: number) => ({
  xPercent: (x / SCULPTURE_VB.w) * 100,
  yPercent: (y / SCULPTURE_VB.h) * 100,
});

const SILHOUETTE: Record<PieceKey, string> = {
  a: LOGO_PATHS.barTop,
  b: LOGO_PATHS.barMid,
  c: LOGO_PATHS.ribbon,
};

function Faces({ piece, id }: { piece: PieceKey; id: string }) {
  if (piece === "c") {
    return (
      <>
        <defs>
          <linearGradient id={`${id}-rf`} x1="1" y1="0" x2="0.1" y2="1">
            <stop offset="0" stopColor="#d2b08a" />
            <stop offset="0.5" stopColor="#ad8559" />
            <stop offset="1" stopColor="#956c44" />
          </linearGradient>
          <linearGradient id={`${id}-rb`} x1="0.8" y1="0" x2="0.2" y2="1">
            <stop offset="0" stopColor="#8a6440" />
            <stop offset="1" stopColor="#664829" />
          </linearGradient>
        </defs>
        <path d={LOGO_PATHS.ribbon} fill={`url(#${id}-rf)`} />
        <path d={LOGO_PATHS.ribbonBack} fill={`url(#${id}-rb)`} />
      </>
    );
  }

  const bevel = piece === "a" ? LOGO_BEVEL.barTop : LOGO_BEVEL.barMid;
  const d = SILHOUETTE[piece];
  return (
    <>
      <defs>
        <linearGradient id={`${id}-f`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b08a60" />
          <stop offset="1" stopColor="#8f6842" />
        </linearGradient>
        <linearGradient id={`${id}-t`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#dcc09f" />
          <stop offset="1" stopColor="#c7a37c" />
        </linearGradient>
        <clipPath id={`${id}-c`}>
          <rect x="0" y="0" width={LOGO_SIZE} height={bevel} />
        </clipPath>
      </defs>
      <path d={d} fill={`url(#${id}-f)`} />
      <path d={d} fill={`url(#${id}-t)`} clipPath={`url(#${id}-c)`} />
    </>
  );
}

export interface SculptureProps {
  className?: string;
}

/**
 * The EvoralTech mark as a physical object: three pieces cut from the logo's
 * own geometry, each on its own layer with its own cast shadow, so they can be
 * assembled and exploded with compositor-only transforms.
 */
export function Sculpture({ className }: SculptureProps) {
  const id = React.useId().replace(/:/g, "");
  const pieces: PieceKey[] = ["a", "b", "c"];

  return (
    <div
      className={cn("relative", className)}
      style={{ aspectRatio: `${SCULPTURE_VB.w} / ${SCULPTURE_VB.h}` }}
      aria-hidden="true"
    >
      {pieces.map((piece) => (
        <div key={`s-${piece}`} data-shadow-wrap={piece} className="absolute inset-0 will-change-transform">
          <svg data-shadow={piece} viewBox={VIEWBOX} className="absolute inset-0 h-full w-full overflow-visible">
            <defs>
              <filter id={`${id}-blur-${piece}`} x="-25%" y="-25%" width="150%" height="150%">
                <feGaussianBlur stdDeviation="15" />
              </filter>
            </defs>
            <path
              d={SILHOUETTE[piece]}
              fill="#33261d"
              fillOpacity="0.2"
              transform="translate(24 34)"
              filter={`url(#${id}-blur-${piece})`}
            />
          </svg>
        </div>
      ))}

      {pieces.map((piece) => (
        <div key={`p-${piece}`} data-piece-wrap={piece} className="absolute inset-0 will-change-transform">
          <svg data-piece={piece} viewBox={VIEWBOX} className="absolute inset-0 h-full w-full overflow-visible">
            <Faces piece={piece} id={`${id}-${piece}`} />
          </svg>
        </div>
      ))}
    </div>
  );
}

export default Sculpture;
