import type { Metadata } from "next";
import Script from "next/script";
import dynamic from "next/dynamic";
import { Fraunces, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "../styles/globals.css";
import Footer from "@/components/Footer/page";
import Header from "@/components/Header/page";
import JsonLd from "@/components/seo/JsonLd";
import {
  personSchema,
  professionalServiceSchema,
  webSiteSchema,
} from "@/lib/structured-data";
import { Providers } from "./providers";
import { GoogleAnalytics } from "@next/third-parties/google";

const ScrollToTop = dynamic(() => import("@/components/ScrollToTop/page"), {
  ssr: false,
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-fraunces",
  display: "swap",
  preload: true,
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://elormdokosi.com"),
  title: {
    default: "Elorm Marrion Dokosi — Data Acquisition & AI",
    template: "%s | Elorm Dokosi",
  },
  description:
    "Web scraping, data acquisition, and AI engineering. Datasets, APIs, and automation pipelines.",
  keywords: [
    "web scraping",
    "data acquisition",
    "AI engineer",
    "data extraction API",
    "Python automation",
    "EMKO",
  ],
  authors: [{ name: "Elorm Marrion Dokosi", url: "https://elormdokosi.com" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://elormdokosi.com",
    siteName: "Elorm Marrion Dokosi",
    title: "Elorm Marrion Dokosi — Data Acquisition & AI",
    description:
      "Web scraping, data acquisition, and AI engineering. Datasets, APIs, and automation pipelines.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elorm Marrion Dokosi — Data Acquisition & AI",
    description:
      "Web scraping, data acquisition, and AI engineering.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${plexSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var el=document.documentElement;var t=localStorage.getItem("portfolio-theme");el.classList.remove("light","dark");el.classList.add(t==="light"?"light":"dark")}catch(e){document.documentElement.classList.add("dark")}})();`,
          }}
        />
        <meta
          name="google-site-verification"
          content="lNqMILnzg69XX7qpDEnEy-Vp0AjlYmq7oE95MWJoEXA"
        />
      </head>
      <body className="min-h-screen font-body">
        <JsonLd
          data={[personSchema(), webSiteSchema(), professionalServiceSchema()]}
        />
        <div className="site-grain" aria-hidden="true" />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:border focus:border-radar/50 focus:bg-ink-elevated focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-radar"
        >
          Skip to content
        </a>
        <Providers>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
      <Script
        id="microsoft-clarity"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "r81ncos7ta");`,
        }}
      />
      <GoogleAnalytics gaId="G-PP8C5JFLJD" />
    </html>
  );
}
