"use client";

import { sendEmailListData } from "@/lib/actions";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const NewsLatterBox = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    if (!formRef.current) return;
    formRef.current.reset();
    await sendEmailListData(formData);
    toast.success("Subscribed successfully");
    router.push("/");
  };

  return (
    <div className="card-lab p-6">
      <h3 className="heading-display text-lg">Stay updated</h3>
      <p className="mt-2 text-sm text-steel">
        Occasional notes on scraping, data, and what I&apos;m building — no spam.
      </p>
      <form ref={formRef} action={handleSubmit} className="mt-6 space-y-4" noValidate>
        <input
          type="text"
          id="newsletter-name"
          name="name"
          required
          placeholder="Name"
          className="input-lab"
        />
        <input
          type="email"
          id="newsletter-email"
          name="email"
          required
          placeholder="Email"
          className="input-lab"
        />
        <button type="submit" className="btn-primary w-full">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLatterBox;
