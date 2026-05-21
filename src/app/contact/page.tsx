import Contact from "@/components/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Elorm Dokosi",
  description:
    "Get in touch for web scraping, data acquisition, APIs, and automation projects.",
  alternates: { canonical: "https://elormdokosi.com/contact" },
};

const ContactPage = () => {
  return <Contact />;
};

export default ContactPage;
