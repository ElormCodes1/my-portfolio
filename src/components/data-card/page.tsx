"use client";

import Image from "next/image";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// Dynamically import the syntax highlighter to reduce initial bundle size
const SyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter").then((mod) => mod.Prism),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-[#0f172a] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    ),
  }
);

// type JsonScreenshotViewerProps = {
//   jsonData: object;
//   screenshotPath: string; // relative to the public folder, e.g., "/images/screenshot.png"
//   website: string;
// };

// export default function JsonScreenshotViewer({
//   jsonData,
//   screenshotPath,
//   website,
// }: JsonScreenshotViewerProps) {
//   return (
//     <>
//       <h5>{website.replace("_", " ").toUpperCase()}</h5>
//       <div className="flex h-screen overflow-hidden">
//         {/* Left side - Screenshot */}
//         <div className="w-1/2 overflow-y-scroll border-r border-gray-300 bg-black">
//           <Image
//             src={screenshotPath}
//             alt="Screenshot"
//             width={1000}
//             height={2000}
//             className="w-full object-contain"
//           />
//         </div>

//         {/* Right side - JSON */}
//         <div className="w-1/2 overflow-y-scroll bg-[#0f172a] text-white">
//           <SyntaxHighlighter language="json" style={oneDark}>
//             {JSON.stringify(jsonData, null, 2)}
//           </SyntaxHighlighter>
//         </div>
//       </div>
//     </>
//   );
// }

type JsonScreenshotViewerProps = {
  jsonData: object;
  screenshotPath: string;
  website: string;
};

export default function JsonScreenshotViewer({
  jsonData,
  screenshotPath,
  website,
}: JsonScreenshotViewerProps) {
  return (
    <>
      <h5>{website.replace("_", " ").toUpperCase()}</h5>
      <div className="flex h-screen overflow-hidden">
        {/* Left side - Screenshot */}
        <div className="w-1/2 overflow-y-scroll border-r border-gray-300 bg-black">
          <Image
            src={screenshotPath}
            alt="Screenshot"
            width={1000}
            height={2000}
            className="w-full object-contain"
            priority={false}
            loading="lazy"
          />
        </div>

        {/* Right side - JSON */}
        <div className="w-1/2 overflow-y-scroll bg-[#0f172a] text-white">
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            }
          >
            <SyntaxHighlighter 
              language="json" 
              style={oneDark}
              showLineNumbers={false}
              wrapLines={false}
            >
              {JSON.stringify(jsonData, null, 2)}
            </SyntaxHighlighter>
          </Suspense>
        </div>
      </div>
    </>
  );
}
