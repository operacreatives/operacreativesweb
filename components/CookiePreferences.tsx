"use client";

import { useEffect, useRef, useState } from "react";

export function CookiePreferences() {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const firstButton = dialogRef.current?.querySelector<HTMLButtonElement>("button");
    firstButton?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const save = () => {
    localStorage.setItem("oc-cookie-preferences", JSON.stringify({ essential: true, analytics: false }));
    setSaved(true);
    setOpen(false);
  };

  return (
    <>
      <button type="button" className="footer-link" onClick={() => setOpen(true)}>
        Cookies{saved ? " ✓" : ""}
      </button>
      {open && (
        <div className="dialog-backdrop" role="presentation" onMouseDown={() => setOpen(false)}>
          <div
            ref={dialogRef}
            className="cookie-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <p className="section-kicker">Preferences</p>
            <h2 id="cookie-title">Only the useful kind.</h2>
            <p>This demo uses essential browser storage only. Analytics and advertising cookies are off.</p>
            <div className="cookie-dialog__row">
              <span>Essential</span>
              <strong>Always on</strong>
            </div>
            <div className="cookie-dialog__row">
              <span>Analytics</span>
              <strong>Off</strong>
            </div>
            <div className="cookie-dialog__actions">
              <button type="button" className="button-solid" onClick={save}>
                Save preferences
              </button>
              <button type="button" className="text-link" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
