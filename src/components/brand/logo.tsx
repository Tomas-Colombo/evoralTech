import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Rendered masters, trimmed to their visible edges so the mark lines up with
 * text and grid without transparent padding.
 */
const VARIANTS = {
  /** Mark framed by the bronze ring. */
  ring: { src: "/evoraltech-mark-ring.webp", width: 1137, height: 1138 },
  /** Bare mark, no ring. */
  mark: { src: "/evoraltech-mark.webp", width: 1190, height: 1074 },
} as const;

export interface LogoProps {
  className?: string;
  variant?: keyof typeof VARIANTS;
  /** Rendered width in CSS pixels, so next/image serves a matching file. */
  size?: number;
  /** Accessible name. Omit when a visible wordmark sits next to the mark. */
  title?: string;
  priority?: boolean;
}

/**
 * The bronze EvoralTech mark. Flat colour variants of the same geometry live
 * in /brand/logo as SVG; the site uses these rendered masters.
 */
export function Logo({ className, variant = "ring", size = 40, title, priority }: LogoProps) {
  const { src, width, height } = VARIANTS[variant];
  return (
    <Image
      src={src}
      alt={title ?? ""}
      aria-hidden={title ? undefined : true}
      width={size}
      height={Math.round((size * height) / width)}
      sizes={`${size}px`}
      priority={priority}
      className={cn("h-auto shrink-0 select-none", className)}
    />
  );
}

export default Logo;
