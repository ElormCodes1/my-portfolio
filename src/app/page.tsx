import About from "@/components/site/About";
import Hero from "@/components/site/Hero";
import Pipeline from "@/components/site/Pipeline";
import WorkTeasers from "@/components/site/WorkTeasers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Acquisition & AI Engineer",
  description:
    "I turn messy websites into structured data and AI-ready pipelines. Web scraping, datasets, APIs, and Python automation.",
  alternates: { canonical: "https://elormdokosi.com" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Pipeline />
      <div className="section-reveal">
        <WorkTeasers />
      </div>
      <div className="section-reveal section-reveal-delay">
        <About />
      </div>
    </>
  );
}
