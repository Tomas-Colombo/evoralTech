import * as React from "react";

import { cn } from "@/lib/utils";
import { ArrowRight, ArrowUpRight } from "@/components/ui/arrow";
import { SmartLink } from "@/components/ui/smart-link";

export interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: "accent" | "ink" | "paper";
  size?: "sm" | "md" | "lg";
  /** Diagonal arrow for destinations that leave the site. */
  external?: boolean;
  className?: string;
}

const VARIANTS = {
  accent: { base: "bg-accent-deep text-white", fill: "bg-ink", hover: "" },
  ink: { base: "bg-ink text-white", fill: "bg-accent-deep", hover: "" },
  paper: { base: "bg-paper text-ink", fill: "bg-accent-deep", hover: "group-hover:text-white" },
} as const;

const SIZES = {
  sm: "h-9 gap-2 px-3.5 text-[0.8125rem]",
  md: "h-12 gap-3 px-5 text-[0.9375rem]",
  lg: "h-16 gap-4 px-7 text-lg",
} as const;

/**
 * Square-cornered call to action. On hover a second colour rises from the
 * bottom edge, and the arrow nudges forward.
 */
export function ButtonLink({ href, children, variant = "accent", size = "md", external, className }: ButtonLinkProps) {
  const v = VARIANTS[variant];
  const Arrow = external ? ArrowUpRight : ArrowRight;

  return (
    <SmartLink
      href={href}
      data-cursor="cta"
      className={cn(
        "group relative inline-flex items-center overflow-hidden whitespace-nowrap font-medium tracking-[-0.01em]",
        v.base,
        SIZES[size],
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-out-expo group-hover:scale-y-100 group-focus-visible:scale-y-100",
          v.fill,
        )}
      />
      <span className={cn("relative transition-colors duration-300", v.hover)}>{children}</span>
      <Arrow
        className={cn(
          "relative size-[1.1em] transition-[transform,color] duration-500 ease-out-expo group-hover:translate-x-1",
          external && "group-hover:-translate-y-0.5",
          v.hover,
        )}
      />
    </SmartLink>
  );
}

export default ButtonLink;
