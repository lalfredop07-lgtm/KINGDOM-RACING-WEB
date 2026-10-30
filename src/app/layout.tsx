import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Instrument_Serif } from "next/font/google";
import { Cursor } from "@/components/layout/Cursor";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { Preloader } from "@/components/layout/Preloader";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SurfaceController } from "@/components/layout/SurfaceController";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import "./globals.css";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", display: "swap" });
const sans = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://kingdomracing.net"),
  title: {
    default: "Kingdom Racing — Speed. People. Purpose.",
    template: "%s — Kingdom Racing",
  },
  description:
    "Kingdom Racing is a non-denominational Christian 501(c)(3) delivering God’s Word through motorsports for more than 20 years — at the track, in the community, and beyond.",
  icons: { icon: "/brand/icon-512.png", apple: "/brand/icon-512.png" },
  openGraph: {
    title: "Kingdom Racing — Speed. People. Purpose.",
    description: "Delivering God’s Word Through Motorsports.",
    images: ["/media/hero-1080-poster.jpg"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0d0e",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" data-surface="dark" data-nav="dark" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-red focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <SmoothScroll>
          <Preloader />
          <Nav />
          <ScrollProgress />
          <SurfaceController />
          <main id="main">{children}</main>
          <Footer />
          <Cursor />
        </SmoothScroll>
      </body>
    </html>
  );
}
