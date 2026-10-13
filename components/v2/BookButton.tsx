"use client";

import posthog from "posthog-js";
import { BOOK_LABEL, CAL_URL } from "@/lib/v2/site";

interface BookButtonProps {
  source: string;
  variant?: "dark" | "light";
  large?: boolean;
  children?: React.ReactNode;
}

// Goes straight to the Cal.com booking page in a new tab.
export function BookButton({ source, variant = "dark", large = false, children = BOOK_LABEL }: BookButtonProps) {
  return (
    <a
      className={`btn ${variant === "light" ? "btn--light" : ""} ${large ? "btn--lg" : ""}`}
      href={CAL_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        try {
          posthog.capture("book_click", { source });
        } catch {
          // analytics must never block the booking link
        }
      }}
    >
      <span>{children}</span>
      <i aria-hidden="true">↗</i>
    </a>
  );
}
