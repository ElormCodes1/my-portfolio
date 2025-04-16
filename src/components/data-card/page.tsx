"use client";

import Image from "next/image";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

type JsonScreenshotViewerProps = {
  jsonData: object;
  screenshotPath: string; // relative to the public folder, e.g., "/images/screenshot.png"
  website: string;
};

export default function JsonScreenshotViewer({
  jsonData,
  screenshotPath,
  website,
}: JsonScreenshotViewerProps) {
  return (
    <>
      <h5>{website}</h5>
      <div className="flex h-screen overflow-hidden">
        {/* Left side - Screenshot */}
        <div className="w-1/2 overflow-y-scroll border-r border-gray-300 bg-black">
          <Image
            src={screenshotPath}
            alt="Screenshot"
            width={1000}
            height={2000}
            className="w-full object-contain"
          />
        </div>

        {/* Right side - JSON */}
        <div className="w-1/2 overflow-y-scroll bg-[#0f172a] text-white">
          <SyntaxHighlighter language="json" style={oneDark}>
            {JSON.stringify(jsonData, null, 2)}
          </SyntaxHighlighter>
        </div>
      </div>
    </>
  );
}
