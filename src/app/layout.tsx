import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles//globals.css";
import Footer from "@/components/Footer/page";
import Header from "@/components/Header/page";
import ScrollToTop from "@/components/ScrollToTop/page";
import { Providers } from "./providers";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Elorm Marrion Dokosi",
  description: "Web Developer and computer science student",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <head /> */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "r81ncos7ta");`,
          }}
        />
        <meta
          name="google-site-verification"
          content="lNqMILnzg69XX7qpDEnEy-Vp0AjlYmq7oE95MW"
        />
      </head>
      <body className="dark:bg-black">
        <Providers>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
      <GoogleAnalytics gaId="G-PP8C5JFLJD" />
    </html>
  );
}
