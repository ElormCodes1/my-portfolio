"use client";

import { useRef, useEffect, useState } from "react";
import toast from "react-hot-toast";
import NewsLatterBox from "@/components/Contact/NewsLatterBox";
import ScrapeIntakeWizard from "@/components/Contact/ScrapeIntakeWizard";
import { sendTicketEmail } from "@/lib/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

type ContactMode = "message" | "scrape";

const Contact = ({
  initialTarget,
  initialMode = "message",
}: {
  initialTarget?: string | null;
  initialMode?: ContactMode;
}) => {
  const [mode, setMode] = useState<ContactMode>(initialMode);
  const formRef = useRef<HTMLFormElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    if (initialTarget && messageRef.current && mode === "message") {
      const prefix = `Target URL: ${initialTarget}\n\n`;
      if (!messageRef.current.value.startsWith(prefix)) {
        messageRef.current.value = prefix + messageRef.current.value;
      }
    }
  }, [initialTarget, mode]);

  const handleSubmit = async (formData: FormData) => {
    if (!formRef.current) return;
    formRef.current.reset();
    await sendTicketEmail(formData);
    toast.success("Message sent — I'll reply by email.");
    router.push("/");
  };

  return (
    <section id="contact" className="pt-24 pb-20 md:pt-28 md:pb-28">
      <div className="container">
        <header className="mb-10 max-w-2xl">
          <p className="label-mono mb-3 text-radar">Contact</p>
          <h1 className="heading-display text-4xl md:text-5xl">Start a project</h1>
          <p className="mt-4 text-lg text-steel">
            Scraping, datasets, APIs, or automation — share your targets and
            requirements, or send a quick message.
          </p>
        </header>

        <div className="mb-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setMode("scrape")}
            className={`rounded border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
              mode === "scrape"
                ? "border-radar/50 text-radar"
                : "border-[var(--color-border)] text-steel hover:text-frost"
            }`}
          >
            Start a scrape
          </button>
          <button
            type="button"
            onClick={() => setMode("message")}
            className={`rounded border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
              mode === "message"
                ? "border-radar/50 text-radar"
                : "border-[var(--color-border)] text-steel hover:text-frost"
            }`}
          >
            Quick message
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {mode === "scrape" ? (
            <ScrapeIntakeWizard initialTarget={initialTarget} />
          ) : (
            <div className="card-lab p-6 sm:p-8">
              <h2 className="heading-display mb-2 text-2xl">Send a message</h2>
              <p className="mb-8 text-sm text-steel">
                Typical reply within 24–48 hours.
              </p>
              <form ref={formRef} action={handleSubmit} noValidate>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <label htmlFor="name" className="label-mono mb-2 block">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="input-lab"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label htmlFor="email" className="label-mono mb-2 block">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      className="input-lab"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="label-mono mb-2 block">
                      Message
                    </label>
                    <textarea
                      ref={messageRef}
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="What are you trying to extract or build?"
                      className="input-lab resize-none"
                    />
                  </div>
                </div>
                <button type="submit" className="btn-primary mt-8">
                  Send message
                </button>
              </form>
            </div>
          )}

          <div className="space-y-6">
            <NewsLatterBox />
            <div className="card-lab p-6">
              <h3 className="label-mono mb-3">Elsewhere</h3>
              <ul className="space-y-2 text-sm text-steel">
                <li>
                  <Link href="/lab" className="text-radar hover:text-frost">
                    Open the Lab →
                  </Link>
                </li>
                <li>
                  <Link href="/changelog" className="text-radar hover:text-frost">
                    Changelog →
                  </Link>
                </li>
                <li>
                  <Link href="/work" className="text-radar hover:text-frost">
                    View case studies →
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:marriondokosi@gmail.com"
                    className="text-radar hover:text-frost"
                  >
                    marriondokosi@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
