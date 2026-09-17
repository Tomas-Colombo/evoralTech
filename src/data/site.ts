import type { ComponentType, SVGProps } from "react";

import { InstagramIcon, LinkedinIcon } from "@/components/ui/social-icons";

export interface SocialLink {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface FooterLink {
  label: string;
  /** Omit until the destination exists; the footer renders those as plain text. */
  href?: string;
}

/**
 * PLACEHOLDER contact details and social URLs — replace with the real ones.
 */
export const siteConfig = {
  name: "EvoralTech",
  tagline: "Engineering Studio",
  description:
    "Convertimos ideas en productos. Diseñamos la arquitectura, construimos el sistema y lo llevamos a producción.",
  email: "evoraltech@gmail.com",
  location: "Argentina — trabajamos en remoto",
  socials: [
    { label: "Instagram", href: "https://instagram.com/evoraltech", icon: InstagramIcon },
    { label: "LinkedIn", href: "https://linkedin.com/company/evoraltech", icon: LinkedinIcon },
  ] satisfies SocialLink[],
  navigation: [
    { label: "Inicio", href: "#inicio" },
    { label: "Proyectos", href: "#proyectos" },
    { label: "Contacto", href: "#contacto" },
  ] satisfies FooterLink[],
  legal: [
    { label: "Política de privacidad" },
    { label: "Términos y condiciones" },
  ] satisfies FooterLink[],
};
