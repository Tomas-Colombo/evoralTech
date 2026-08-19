"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavAction {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
}

export interface MiniNavbarProps {
  /**
   * Navigation entries. While this is empty the mobile toggle is omitted, so
   * there is never a control that opens nothing.
   */
  links?: NavLink[];
  /** Calls to action rendered as pills inside the bar. */
  actions?: NavAction[];
  className?: string;
}

/**
 * Label stacked on top of a brighter copy of itself. The parent's hover slides
 * the pair up by half its height, so the second copy rolls into place.
 *
 * `groupName` must match the Tailwind group declared on the hover target.
 */
function RollingLabel({
  children,
  groupName,
  className,
  topClassName,
  bottomClassName,
}: {
  children: React.ReactNode;
  groupName: "link" | "action";
  className?: string;
  topClassName?: string;
  bottomClassName?: string;
}) {
  return (
    <span className={cn("inline-block h-4 overflow-hidden align-top sm:h-5", className)}>
      <span
        className={cn(
          "flex flex-col whitespace-nowrap transition-transform duration-300 ease-out motion-reduce:transition-none",
          groupName === "link"
            ? "group-hover/link:-translate-y-1/2"
            : "group-hover/action:-translate-y-1/2",
        )}
      >
        <span className={topClassName}>{children}</span>
        <span aria-hidden="true" className={bottomClassName}>
          {children}
        </span>
      </span>
    </span>
  );
}

function AnimatedNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="group/link relative inline-flex items-center text-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300"
    >
      <RollingLabel groupName="link" topClassName="text-muted" bottomClassName="text-gold-100">
        {children}
      </RollingLabel>
    </a>
  );
}

function NavActionLink({ label, href, variant = "secondary" }: NavAction) {
  const base =
    "group/action inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-xs font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300 sm:w-auto sm:px-4 sm:text-sm";

  if (variant === "primary") {
    return (
      <div className="group/bloom relative w-full sm:w-auto">
        {/* Bloom sits behind the pill and swells on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -m-2 hidden rounded-full bg-gold-400 opacity-40 blur-lg transition-all duration-300 ease-out group-hover/bloom:-m-3 group-hover/bloom:opacity-60 group-hover/bloom:blur-xl sm:block"
        />
        <a
          href={href}
          className={cn(
            base,
            "relative z-10 bg-gradient-to-br from-gold-200 to-gold-500 font-semibold text-black hover:from-gold-100 hover:to-gold-400",
          )}
        >
          <RollingLabel groupName="action">{label}</RollingLabel>
        </a>
      </div>
    );
  }

  return (
    <a
      href={href}
      className={cn(base, "border border-gold-500/25 bg-black/40 hover:border-gold-300/50")}
    >
      <RollingLabel groupName="action" topClassName="text-muted" bottomClassName="text-gold-100">
        {label}
      </RollingLabel>
    </a>
  );
}

export function MiniNavbar({ links = [], actions = [], className }: MiniNavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const hasLinks = links.length > 0;
  const hasActions = actions.length > 0;

  return (
    <header
      className={cn(
        "flex flex-col items-center border border-gold-500/20 bg-black/50 p-3 backdrop-blur-md sm:p-2.5",
        "rounded-3xl shadow-[0_0_40px_-12px_var(--glow)] sm:rounded-full",
        className,
      )}
    >
      {/* Single row from the sm breakpoint up */}
      <div className="hidden w-full items-center justify-center gap-6 sm:flex sm:gap-8">
        {hasLinks && (
          <nav className="flex items-center gap-6 pl-3">
            {links.map((link) => (
              <AnimatedNavLink key={link.href} href={link.href}>
                {link.label}
              </AnimatedNavLink>
            ))}
          </nav>
        )}

        {hasActions && (
          <div className="flex items-center gap-2.5">
            {actions.map((action) => (
              <NavActionLink key={action.href} {...action} />
            ))}
          </div>
        )}
      </div>

      {/* Phones: actions stay visible, only the nav links collapse */}
      <div className="flex w-full flex-col items-stretch gap-3 sm:hidden">
        {hasLinks && (
          <>
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              aria-expanded={isOpen}
              aria-controls="mini-navbar-menu"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              className="flex h-8 w-8 items-center justify-center self-center text-muted transition-colors hover:text-gold-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <div
              id="mini-navbar-menu"
              className={cn(
                "w-full overflow-hidden transition-all duration-300 ease-in-out motion-reduce:transition-none",
                isOpen ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 opacity-0",
              )}
            >
              <nav className="flex w-full flex-col items-center gap-4">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    tabIndex={isOpen ? undefined : -1}
                    className="w-full text-center text-base text-muted transition-colors hover:text-gold-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </>
        )}

        {hasActions &&
          actions.map((action) => <NavActionLink key={action.href} {...action} />)}
      </div>
    </header>
  );
}

export default MiniNavbar;
