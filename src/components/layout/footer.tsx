import { Logo } from "@/components/brand/logo";
import { LocalTime } from "@/components/layout/local-time";
import { SmartLink } from "@/components/ui/smart-link";
import { siteConfig } from "@/data/site";

function FooterHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="meta mb-5 text-paper/60">{children}</h3>;
}

const linkClass = "text-[0.9375rem] text-paper/85 transition-colors hover:text-accent-light";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer data-nav="dark" className="guides-dark relative z-[1] overflow-hidden bg-brown text-paper">
      <div aria-hidden="true" className="grain-dark pointer-events-none absolute inset-0" />

      <div className="grid-page relative gap-y-14 pb-16 pt-[clamp(4rem,8vw,6.5rem)]">
        <div className="col-span-4 md:col-span-5">
          <div className="flex items-center gap-3">
            <Logo size={44} className="size-11" />
            <span className="font-display text-2xl font-[450] tracking-[-0.02em]">{siteConfig.name}</span>
          </div>
          <p className="mt-8 max-w-sm font-display text-[clamp(1.8rem,2.6vw,2.4rem)] leading-[1.05] tracking-[-0.02em]">
            Convertimos ideas en <em className="text-accent-light">productos.</em>
          </p>
          <p className="meta mt-8 text-paper/55">Estudio de ingeniería · Argentina · Remoto</p>
          <LocalTime className="meta mt-2 block text-paper/60" />
        </div>

        <nav aria-label="Pie de página" className="col-span-2 md:col-span-2 md:col-start-7">
          <FooterHeading>Índice</FooterHeading>
          <ul className="flex flex-col gap-2.5">
            {siteConfig.navigation.map((link) =>
              link.href ? (
                <li key={link.label}>
                  <SmartLink href={link.href} className={linkClass}>
                    {link.label}
                  </SmartLink>
                </li>
              ) : null,
            )}
          </ul>
        </nav>

        <div className="col-span-2 md:col-span-2">
          <FooterHeading>Contacto</FooterHeading>
          <ul className="flex flex-col gap-2.5">
            <li>
              <a href={`mailto:${siteConfig.email}`} className={`${linkClass} break-all`}>
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {siteConfig.phone}
              </a>
            </li>
          </ul>
        </div>

        <div className="col-span-4 md:col-span-2">
          <FooterHeading>Redes</FooterHeading>
          <ul className="flex flex-col gap-2.5">
            {siteConfig.socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-2.5`}>
                  <Icon className="size-3.5" aria-hidden="true" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid-page meta relative gap-y-3 border-t border-white/10 py-6 text-paper/60">
        <p className="col-span-4 md:col-span-3">
          © {year} {siteConfig.name}
        </p>
        <p className="col-span-4 md:col-span-6">
          Colofón — Compuesto en Newsreader, Schibsted Grotesk y Geist Mono. Construido con Next.js.
        </p>
        <ul className="col-span-4 flex flex-wrap gap-x-5 gap-y-2 md:col-span-3 md:justify-self-end">
          {siteConfig.legal.map((link) => (
            <li key={link.label}>{link.label}</li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
