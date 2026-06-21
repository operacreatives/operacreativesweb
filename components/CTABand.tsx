import Link from "next/link";

export function CTABand() {
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <p className="section-kicker">One more thing</p>
      <h2 id="cta-title">
        The world does not need more content. It needs ideas with a pulse, images with staying power, and brands people are
        glad to let into their lives.
      </h2>
      <Link href="/contact" className="arrow-link">
        Start a conversation <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
