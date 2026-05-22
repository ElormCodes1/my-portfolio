"use client";

import dynamic from "next/dynamic";
import { ThemeProvider } from "next-themes";

const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false },
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      themes={["dark", "light"]}
      enableSystem={false}
      storageKey="portfolio-theme"
      disableTransitionOnChange
    >
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          className:
            "font-mono text-sm !bg-ink-elevated !text-frost !border !border-[var(--color-border)]",
        }}
      />
    </ThemeProvider>
  );
}
