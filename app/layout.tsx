import type { Metadata, Viewport } from "next";
import { Geist_Mono, Montserrat } from "next/font/google";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/components/cart-context";
import { LanguageProvider } from "@/components/language-provider";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Giant Mongolia — Official Giant Bicycles Retailer",
    template: "%s — Giant Mongolia",
  },
  description:
    "Road, mountain, gravel, city, kids, and e-bikes from Giant. Visit the Giant Mongolia flagship store in Ulaanbaatar for test rides, bike fitting, and service.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// Runs before first paint: saved choice wins, otherwise the OS setting.
// Keep the colors in sync with --bg in globals.css and THEME_COLOR in theme-toggle.tsx.
const themeInitScript = `(function(){var d=document.documentElement,t=null;try{var s=localStorage.getItem("gm-theme");if(s==="light"||s==="dark")t=s}catch(e){}if(!t){t=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}d.setAttribute("data-theme",t);d.classList.toggle("dark",t==="dark");d.style.colorScheme=t;var m=document.createElement("meta");m.name="theme-color";m.content=t==="dark"?"#0b0f17":"#ffffff";document.head.appendChild(m)})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${montserrat.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <CartProvider>
            <SiteHeader />
            {children}
            <SiteFooter />
            <CartDrawer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
