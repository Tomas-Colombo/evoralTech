import type { ComponentType, SVGProps } from "react";

import {
  InstagramIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "@/components/ui/social-icons";

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
 * LinkedIn is still a guessed URL — confirm the company page before launch.
 * Everything else here is verified.
 */
export const siteConfig = {
  name: "EvoralTech",
  tagline: "Engineering Studio",
  description:
    "Convertimos ideas en productos. Diseñamos la arquitectura, construimos el sistema y lo llevamos a producción.",
  email: "evoraltech@gmail.com",
  phone: "+54 9 261 774-2367",
  /** wa.me takes the number with no plus sign, spaces or dashes. */
  whatsapp: "https://wa.me/5492617742367",
  location: "Argentina — trabajamos en remoto",
  socials: [
    { label: "WhatsApp", href: "https://wa.me/5492617742367", icon: WhatsappIcon },
    { label: "Instagram", href: "https://www.instagram.com/evoraltech/", icon: InstagramIcon },
    { label: "LinkedIn", href: "https://linkedin.com/company/evoraltech", icon: LinkedinIcon },
  ] satisfies SocialLink[],
  navigation: [
    { label: "Inicio", href: "/" },
    { label: "Servicios", href: "/#servicios" },
    { label: "Proyectos", href: "/#proyectos" },
    { label: "Quiénes somos", href: "/nosotros" },
    { label: "Contacto", href: "#contacto" },
  ] satisfies FooterLink[],
  legal: [
    { label: "Política de privacidad" },
    { label: "Términos y condiciones" },
  ] satisfies FooterLink[],
};
