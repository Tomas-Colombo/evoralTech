import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { Footer } from "@/components/sections/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SmoothScroll />
        {children}
        <Footer />
      </body>
    </html>
  );
}
