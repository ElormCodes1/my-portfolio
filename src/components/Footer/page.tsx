import Link from "next/link";
import menuData from "@/components/Header/menuData";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-[var(--color-border)] bg-ink-elevated/80">
      <div className="container py-10 md:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-radar">
              Extraction Lab
            </p>
            <p className="mt-2 text-sm text-steel">
              © {year} Elorm Marrion Dokosi. All rights reserved.
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {menuData.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.path}
                    className="font-mono text-xs uppercase tracking-[0.12em] text-steel transition-colors hover:text-radar"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/changelog"
                  className="font-mono text-xs uppercase tracking-[0.12em] text-steel transition-colors hover:text-radar"
                >
                  Changelog
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
