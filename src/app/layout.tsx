import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
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
  icons: { icon: "/evoraltech-logo.png" },
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
