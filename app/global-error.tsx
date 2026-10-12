"use client";

import posthog from "posthog-js";
import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    posthog.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ background: "#000", color: "#fff", fontFamily: "system-ui, sans-serif", display: "grid", placeItems: "center", minHeight: "100vh", margin: 0 }}>
        <div style={{ textAlign: "center" }}>
          <p>Something went wrong.</p>
          <button onClick={reset} style={{ marginTop: 12, padding: "8px 16px", borderRadius: 999, border: "1px solid #fff", background: "none", color: "#fff", cursor: "pointer" }}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
