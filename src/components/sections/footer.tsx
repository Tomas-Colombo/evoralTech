import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

import { siteConfig } from "@/data/site";

function FooterLinkItem({ label, href }: { label: string; href?: string }) {
  if (!href) {
    return <span className="text-sm text-muted/50">{label}</span>;
  }

  return (
    <a
      href={href}
      className="text-sm text-muted transition-colors hover:text-gold-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300"
    >
      {label}
    </a>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contacto"
      className="relative scroll-mt-24 overflow-hidden border-t border-gold-500/15 bg-background"
    >
      {/* Circuit grid, faded out toward the bottom of the page */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.1] [background-image:linear-gradient(to_right,var(--gold-500)_1px,transparent_1px),linear-gradient(to_bottom,var(--gold-500)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-56 w-[70vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,var(--glow)_0%,transparent_70%)] opacity-50 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/[0.06] pb-14 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-400">
              Contacto
            </p>
            <h2 className="font-display mt-4 max-w-xl text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
              ¿Tenés un proyecto en mente?
            </h2>
          </div>

          <a
            href={`mailto:${siteConfig.email}`}
            className="group inline-flex items-center gap-2 text-xl font-medium text-gold-200 transition-colors hover:text-gold-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300 sm:text-2xl"
          >
            {siteConfig.email}
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/evoraltech-logo.png"
                alt=""
                width={64}
                height={64}
                className="h-9 w-9 drop-shadow-[0_0_14px_var(--glow)]"
              />
              <div>
                <p className="font-display text-lg font-bold text-foreground">
                  {siteConfig.name}
                </p>
                <p className="text-xs uppercase tracking-[0.18em] text-gold-400">
                  {siteConfig.tagline}
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              {siteConfig.description}
            </p>

            <ul className="mt-6 flex items-center gap-3">
              {siteConfig.socials.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/20 text-muted transition-colors hover:border-gold-300/50 hover:text-gold-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Enlaces del pie de página">
            <h3 className="text-sm font-semibold text-foreground">Navegación</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {siteConfig.navigation.map((link) => (
                <li key={link.label}>
                  <FooterLinkItem {...link} />
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Dónde estamos</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-muted">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                {siteConfig.location}
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors hover:text-gold-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition-colors hover:text-gold-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300"
                >
                  {siteConfig.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col-reverse items-start justify-between gap-6 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-muted/70">
            © {year} {siteConfig.name}. Todos los derechos reservados.
          </p>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {siteConfig.legal.map((link) => (
              <li key={link.label}>
                <FooterLinkItem {...link} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
