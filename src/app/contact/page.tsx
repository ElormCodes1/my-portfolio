import Contact from "@/components/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Elorm Dokosi",
  description:
    "Get in touch for web scraping, data acquisition, APIs, and automation projects.",
  alternates: { canonical: "https://elormdokosi.com/contact" },
};

export default function ContactPage({
  searchParams,
}: {
  searchParams?: { target?: string; mode?: string };
}) {
  const mode =
    searchParams?.mode === "scrape" ? ("scrape" as const) : ("message" as const);

  return (
    <Contact
      initialTarget={searchParams?.target ?? null}
      initialMode={mode}
    />
  );
}
