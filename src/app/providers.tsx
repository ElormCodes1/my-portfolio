"use client";

import dynamic from "next/dynamic";

const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false },
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "font-mono text-sm",
          style: {
            background: "#11161f",
            color: "#e6ecf3",
            border: "1px solid rgba(138, 155, 176, 0.25)",
          },
        }}
      />
    </>
  );
}
