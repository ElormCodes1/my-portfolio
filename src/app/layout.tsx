import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles//globals.css";
import Footer from "@/components/Footer/page";
import Header from "@/components/Header/page";
import ScrollToTop from "@/components/ScrollToTop/page";
import { Providers } from "./providers";

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
      <head />
      <body className="dark:bg-black">
        <Providers>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
