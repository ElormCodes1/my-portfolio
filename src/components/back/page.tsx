"use client";

import { useRouter } from "next/navigation";
import { Button } from "../button/page";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button variant="outline" size="sm" onClick={() => router.back()}>
      Go Back
    </Button>
  );
}