"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button-link";
import { SmartLink } from "@/components/ui/smart-link";
import { LocalTime } from "@/components/layout/local-time";
import { siteConfig } from "@/data/site";
import { gsap, ScrollTrigger, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { lenisRef } from "@/lib/lenis";

/**
 * Small fixed header. Transparent over the hero; once the page moves it gains
 * a paper backdrop and a hairline, tucks away while reading downward and
 * returns on the way back up. Over sections marked `data-nav="dark"` it
 * switches to light ink.
 */
export function Nav() {
  const pathname = usePathname();
  const headerRef = React.useRef<HTMLElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const closeMenu = React.useCallback((returnFocus = false) => {
    setMenuOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  useGSAP(
    () => {
      const header = headerRef.current;
      if (!header) return;

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const y = self.scroll();
          header.dataset.scrolled = String(y > 24);
          header.dataset.hidden = String(y > 480 && self.direction === 1);
        },
      });

      document.querySelectorAll<HTMLElement>("[data-nav='dark']:not([role='dialog'])").forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 34px",
          end: "bottom 34px",
          // Measured after the page's own pins, which shift everything below.
          refreshPriority: -1,
          onToggle: (self) => {
            header.dataset.theme = self.isActive ? "dark" : "light";
          },
        });
      });
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return (
    <>
      <header
        ref={headerRef}
        data-scrolled="false"
        data-hidden="false"
        data-theme="light"
        className={cn(
          "group/nav fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color,border-color] duration-500 ease-out-expo",
          "border-b border-transparent text-ink",
          "data-[scrolled=true]:border-rule data-[scrolled=true]:bg-paper/85 data-[scrolled=true]:backdrop-blur-md",
          "data-[hidden=true]:-translate-y-full",
          "data-[theme=dark]:text-paper data-[theme=dark]:data-[scrolled=true]:border-white/10 data-[theme=dark]:data-[scrolled=true]:bg-brown/85",
        )}
      >
        <a
          href="#contenido"
          className="meta sr-only z-10 bg-ink px-3 py-2 text-paper focus:not-sr-only focus:absolute focus:left-[var(--margin)] focus:top-3"
        >
          Saltar al contenido
        </a>

        <div className="grid-page h-[var(--nav-h)] items-center">
          <SmartLink
            href="/"
            aria-label="EvoralTech, inicio"
            className="col-span-2 flex items-center gap-2.5 justify-self-start md:col-span-3"
          >
            <Logo size={34} priority className="size-[34px]" />
            <span className="font-display text-[1.3rem] font-[450] tracking-[-0.02em]">EvoralTech</span>
          </SmartLink>

          <nav aria-label="Principal" className="col-span-5 hidden items-center gap-7 md:col-start-4 md:flex lg:col-start-5 lg:gap-9">
            {siteConfig.primaryNav.map((link) => {
              const active = link.href === pathname;
              return (
                <SmartLink
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className="group relative flex items-center gap-2 text-[0.875rem] tracking-[-0.005em]"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "size-1.5 bg-accent transition-transform duration-500 ease-out-expo",
                      active ? "scale-100" : "scale-0 group-hover:scale-100",
                    )}
                  />
                  {link.label}
                </SmartLink>
              );
            })}
          </nav>

          <div className="col-span-2 flex items-center justify-end md:col-span-4 lg:col-span-3">
            <ButtonLink href="#contacto" size="sm" variant="accent" className="hidden md:inline-flex">
              Empezar un proyecto
            </ButtonLink>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="menu-movil"
              className="meta -mr-2 flex h-11 items-center gap-3 px-2 md:hidden"
            >
              Menú
              <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-3/5 self-end bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}

const MENU_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Estudio", href: "/nosotros" },
  { label: "Contacto", href: "#contacto" },
];

function MobileMenu({ open, onClose }: { open: boolean; onClose: (returnFocus?: boolean) => void }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const firstRender = React.useRef(true);

  // Close on navigation.
  React.useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useGSAP(
    () => {
      const panel = ref.current;
      if (!panel) return;
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      const links = panel.querySelectorAll("[data-menu-item]");
      const quick = prefersReducedMotion();

      if (open) {
        lenisRef.current?.stop();
        document.documentElement.style.overflow = "hidden";
        gsap
          .timeline()
          .set(panel, { display: "flex" })
          .fromTo(
            panel,
            { clipPath: "inset(0% 0% 100% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: quick ? 0 : 0.8, ease: "expo.inOut" },
          )
          .fromTo(
            links,
            { yPercent: 110 },
            { yPercent: 0, duration: quick ? 0 : 1, stagger: 0.05, ease: "expo.out" },
            quick ? 0 : 0.35,
          )
          .add(() => closeRef.current?.focus(), 0.1);
      } else {
        document.documentElement.style.overflow = "";
        lenisRef.current?.start();
        gsap
          .timeline()
          .to(panel, { clipPath: "inset(0% 0% 100% 0%)", duration: quick ? 0 : 0.6, ease: "expo.inOut" })
          .set(panel, { display: "none" });
      }
    },
    { dependencies: [open] },
  );

  React.useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      ref={ref}
      id="menu-movil"
      role="dialog"
      aria-modal="true"
      aria-label="Menú"
      data-nav="dark"
      inert={!open}
      className="guides-dark fixed inset-0 z-[70] hidden flex-col bg-brown text-paper"
      style={{ clipPath: "inset(0% 0% 100% 0%)" }}
    >
      <div className="grid-page h-[var(--nav-h)] items-center">
        <span className="col-span-2 flex items-center gap-2.5">
          <Logo size={34} className="size-[34px]" />
          <span className="font-display text-[1.3rem] font-[450] tracking-[-0.02em]">EvoralTech</span>
        </span>
        <button ref={closeRef} type="button" onClick={() => onClose(true)} className="meta col-span-2 -mr-2 h-11 justify-self-end px-2">
          Cerrar
        </button>
      </div>

      <nav aria-label="Menú móvil" className="grid-page mt-10">
        <ul className="col-span-4 border-t border-white/10">
          {MENU_LINKS.map((link) => (
            <li key={link.href} className="overflow-hidden border-b border-white/10">
              <SmartLink
                href={link.href}
                onClick={() => onClose()}
                data-menu-item
                className="flex items-baseline justify-between py-3"
              >
                <span className="display-tight text-[clamp(2.75rem,13vw,4.5rem)]">{link.label}</span>
                <span aria-hidden="true" className="size-2 bg-accent" />
              </SmartLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="grid-page mt-auto gap-y-3 pb-8">
        <a href={`mailto:${siteConfig.email}`} className="col-span-4 text-lg">
          {siteConfig.email}
        </a>
        <ul className="meta col-span-4 flex gap-5 text-paper/70">
          {siteConfig.socials.map((social) => (
            <li key={social.label}>
              <a href={social.href} target="_blank" rel="noopener noreferrer">
                {social.label}
              </a>
            </li>
          ))}
        </ul>
        <LocalTime className="meta col-span-4 text-paper/50" />
      </div>
    </div>
  );
}

export default Nav;
