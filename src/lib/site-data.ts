export const siteTagline =
  "I don't build websites. I build the pipes that feed them.";

export const pipelineSteps = [
  { id: "target", label: "Target", detail: "Scope sources, fields, and constraints" },
  { id: "fetch", label: "Fetch", detail: "Navigate anti-bot layers and rate limits" },
  { id: "parse", label: "Parse", detail: "Extract structure from HTML, JSON, or APIs" },
  { id: "structure", label: "Structure", detail: "Normalize, dedupe, and validate records" },
  { id: "ship", label: "Ship", detail: "Deliver datasets, APIs, or AI-ready pipelines" },
] as const;

export const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/elormdokosimarrion",
  },
  {
    label: "GitHub",
    href: "https://github.com/ElormCodes1",
  },
  {
    label: "Email",
    href: "mailto:marriondokosi@gmail.com",
  },
  {
    label: "Resume",
    href: "/resume.pdf",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCu9o9jAc_oYXbQmIIb3aWkg",
  },
] as const;

/** @deprecated Use LabStatusBoard for live status */
export const labStats = {
  datasets: 2,
  apisActive: 6,
  status: "Services online",
} as const;
