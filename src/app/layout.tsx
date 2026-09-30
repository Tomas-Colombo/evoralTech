import type { Metadata } from "next";
import { Geist_Mono, Newsreader, Schibsted_Grotesk } from "next/font/google";

import { Contact } from "@/components/layout/contact";
import { Footer } from "@/components/layout/footer";
import { GridLines } from "@/components/layout/grid-lines";
import { Loader } from "@/components/layout/loader";
import { Nav } from "@/components/layout/nav";
import { Cursor } from "@/components/motion/Cursor";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Engineering studio. Diseñamos la arquitectura, construimos el sistema y lo llevamos a producción.";

export const metadata: Metadata = {
  metadataBase: new URL("https://evoraltech.com"),
  title: "EvoralTech — Engineering Studio",
  description,
  openGraph: {
    title: "EvoralTech — Engineering Studio",
    description,
    images: ["/evoraltech-logo.png"],
    locale: "es_AR",
    type: "website",
  },
};

/**
 * Runs before first paint: flags motion support (which enables the hidden
 * pre-intro states in CSS), decides whether this visit gets the loader, and
 * guarantees content is revealed even if hydration never happens.
 */
const bootScript = `(function(){var d=document.documentElement;var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(!rm)d.setAttribute('data-motion','');try{if(rm||sessionStorage.getItem('evoral:visited')){d.setAttribute('data-loader','skip')}else{sessionStorage.setItem('evoral:visited','1')}}catch(e){d.setAttribute('data-loader','skip')}setTimeout(function(){d.setAttribute('data-ready','')},4500)})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${newsreader.variable} ${schibsted.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <noscript>
          <style>{`.loader{display:none!important}`}</style>
        </noscript>
      </head>
      <body className="relative min-h-svh">
        <Loader />
        <GridLines />
        <SmoothScroll />
        <Cursor />
        <Nav />
        <div id="contenido" tabIndex={-1} className="relative z-[1] outline-none">
          {children}
        </div>
        <Contact />
        <Footer />
      </body>
    </html>
  );
}
