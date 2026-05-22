"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import menuData from "./menuData";
import ThemeToggler from "./ThemeToggler";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[100] flex w-full items-center border-b border-[var(--color-border)] bg-[var(--color-header-bg)] backdrop-blur-md">
      <div className="container">
        <div className="relative flex items-center justify-between py-4 lg:py-5">
          <Link href="/" className="header-logo flex items-center gap-3">
            <Image
              src="/images/me/logo.png"
              alt="EMKO"
              width={120}
              height={32}
              className="h-8 w-auto dark:opacity-100 opacity-80 dark:invert-0 invert"
              priority
            />
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggler />
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            id="navbarToggler"
            aria-label="Toggle menu"
            aria-expanded={navbarOpen}
            className="relative z-[110] flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-md border border-[var(--color-border)] lg:hidden"
          >
            <span
              className={`block h-0.5 w-5 bg-frost transition-all duration-300 ${
                navbarOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-frost transition-all duration-300 ${
                navbarOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-frost transition-all duration-300 ${
                navbarOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>

          <nav
            className={`absolute right-0 top-full mt-2 w-56 rounded-lg border border-[var(--color-border)] bg-ink-elevated p-4 shadow-lg lg:static lg:mt-0 lg:flex lg:w-auto lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none ${
              navbarOpen
                ? "visible opacity-100"
                : "invisible opacity-0 lg:visible lg:opacity-100"
            }`}
          >
            <ul className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-8">
              {menuData.map((menuItem) => (
                <li key={menuItem.id}>
                  <Link
                    href={menuItem.path}
                    onClick={() => setNavbarOpen(false)}
                    className="menu-scroll block py-2 font-mono text-xs uppercase tracking-[0.15em] text-steel transition-colors hover:text-radar lg:py-0"
                  >
                    {menuItem.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
