import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="pad on-light" style={{ minHeight: "80svh", paddingTop: "9rem" }}>
      <span className="slate">404</span>
      <h1 className="display h2">Page not found</h1>
      <p style={{ margin: "1.2rem 0 2rem", maxWidth: "30rem", fontSize: "1.15rem" }}>
        That link doesn&apos;t lead anywhere. Head back to the home page to see our work.
      </p>
      <Link className="btn" href="/">
        <span>Back to home</span>
        <i aria-hidden="true">↗</i>
      </Link>
    </section>
  );
}
