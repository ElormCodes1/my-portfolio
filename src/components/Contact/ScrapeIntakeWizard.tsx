"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { sendScrapeIntakeEmail } from "@/lib/actions";
import { useRouter } from "next/navigation";

const steps = ["Targets", "Fields", "Volume", "Delivery"] as const;

const volumeOptions = [
  "Under 1,000 records",
  "1,000 – 10,000",
  "10,000 – 100,000",
  "100,000+",
];

const frequencyOptions = [
  "One-time export",
  "Daily",
  "Weekly",
  "Monthly",
];

const deliveryOptions = [
  "REST API",
  "CSV / JSON files",
  "PostgreSQL / warehouse",
  "Google Sheets",
  "Other (describe in notes)",
];

export default function ScrapeIntakeWizard({
  initialTarget,
}: {
  initialTarget?: string | null;
}) {
  const [step, setStep] = useState(0);
  const [urls, setUrls] = useState(initialTarget ?? "");
  const [fields, setFields] = useState("");
  const [volume, setVolume] = useState(volumeOptions[1]);
  const [frequency, setFrequency] = useState(frequencyOptions[0]);
  const [delivery, setDelivery] = useState(deliveryOptions[0]);
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !urls.trim()) {
      toast.error("Name, email, and at least one target URL are required.");
      return;
    }
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.set("name", name);
      formData.set("email", email);
      formData.set("urls", urls);
      formData.set("fields", fields);
      formData.set("volume", volume);
      formData.set("frequency", frequency);
      formData.set("delivery", delivery);
      formData.set("notes", notes);
      await sendScrapeIntakeEmail(formData);
      toast.success("Intake received — I'll reply by email.");
      router.push("/");
    } catch {
      toast.error("Could not send. Try email directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card-lab p-6 sm:p-8">
      <div className="mb-8 flex gap-2">
        {steps.map((label, i) => (
          <div
            key={label}
            className={`flex-1 border-b-2 pb-2 font-mono text-[0.6rem] uppercase tracking-wider ${
              i === step
                ? "border-radar text-radar"
                : i < step
                  ? "border-signal/50 text-steel"
                  : "border-[var(--color-border)] text-steel"
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      {step === 0 && (
        <div>
          <label className="label-mono mb-2 block">Target URL(s)</label>
          <textarea
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            rows={4}
            placeholder="https://example.com/listings&#10;https://..."
            className="input-lab resize-none"
          />
        </div>
      )}

      {step === 1 && (
        <div>
          <label className="label-mono mb-2 block">Fields needed</label>
          <textarea
            value={fields}
            onChange={(e) => setFields(e.target.value)}
            rows={5}
            placeholder="e.g. title, price, seller_id, geo_lat, geo_lng, scraped_at"
            className="input-lab resize-none"
          />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <label className="label-mono mb-2 block">Expected volume</label>
            <select
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="input-lab"
            >
              {volumeOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-mono mb-2 block">Refresh frequency</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="input-lab"
            >
              {frequencyOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div>
            <label className="label-mono mb-2 block">Delivery format</label>
            <select
              value={delivery}
              onChange={(e) => setDelivery(e.target.value)}
              className="input-lab"
            >
              {deliveryOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-mono mb-2 block">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="input-lab resize-none"
              placeholder="Compliance constraints, auth, SLAs…"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-mono mb-2 block">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="input-lab"
              />
            </div>
            <div>
              <label className="label-mono mb-2 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-lab"
              />
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 flex justify-between gap-4">
        <button
          type="button"
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className="btn-ghost disabled:opacity-40"
        >
          Back
        </button>
        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="btn-primary"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="btn-primary disabled:opacity-50"
          >
            {submitting ? "Sending…" : "Submit intake"}
          </button>
        )}
      </div>
    </div>
  );
}
