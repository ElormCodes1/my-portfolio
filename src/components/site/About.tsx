import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <section id="about" className="border-t border-[var(--color-border)] py-20 md:py-28">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className="label-mono mb-3">About</p>
            <h2 className="heading-display text-3xl md:text-4xl">
              Engineer, operator, builder
            </h2>
            <div className="mt-6 space-y-4 text-steel leading-relaxed">
              <p>
                I&apos;m your go-to for web scraping at scale — from single-site
                extractions to enterprise pipelines with anti-bot handling,
                scheduling, and clean delivery formats.
              </p>
              <p>
                Python automation is where I live day to day. I also ship
                product surfaces with Next.js when clients need a dashboard, API
                portal, or internal tool around their data.
              </p>
              <p>
                Beyond code: general aviation (homebuilt ultralights and
                experimentals), and a long run of building things — dropshipping,
                affiliate marketing, YouTube, flipping hardware. I learn by
                doing and I&apos;m comfortable as a technical partner, not just
                a contractor.
              </p>
            </div>
            <Link href="/contact" className="btn-primary mt-8 inline-flex">
              Start a project
            </Link>
          </div>

          <div className="relative">
            <div
              className="absolute -inset-3 rounded-xl border border-radar/20"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-lg border border-[var(--color-border)] bg-ink-muted">
              <Image
                src="/images/me/elormi.jpeg"
                alt="Elorm Marrion Dokosi"
                width={560}
                height={560}
                className="aspect-[4/5] w-full object-cover"
                priority={false}
              />
            </div>
            <p className="label-mono mt-4 text-center lg:text-left">
              Accra · Remote worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
