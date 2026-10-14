"use client";

import { usePathname } from "next/navigation";

// Pages like /links are a standalone card: hide the site header and footer there.
const STANDALONE = ["/links"];

export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (STANDALONE.includes(pathname)) return null;
  return <>{children}</>;
}
