import Image from "next/image";

import { cn } from "@/lib/utils";

export interface LogoProps {
  className?: string;
  /** Rendered width in CSS pixels, so next/image serves a matching file. */
  size?: number;
  /** Accessible name. Omit when a visible wordmark sits next to the mark. */
  title?: string;
  priority?: boolean;
}

/**
 * The bronze EvoralTech mark. Flat colour variants of the same geometry live
 * in /brand/logo as SVG; the site uses this rendered master.
 */
export function Logo({ className, size = 40, title, priority }: LogoProps) {
  return (
    <Image
      src="/EvoralTechLogoMarron.png"
      alt={title ?? ""}
      aria-hidden={title ? undefined : true}
      width={size}
      height={size}
      sizes={`${size}px`}
      priority={priority}
      className={cn("shrink-0 select-none", className)}
    />
  );
}

export default Logo;
