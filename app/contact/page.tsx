import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { pageHeroes } from "@/data/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a fictional project enquiry with Opera Creatives.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero {...pageHeroes.contact} />
      <section className="contact-details" id="location">
        <div>
          <p className="section-kicker">New business</p>
          <a href="mailto:hello@opera-creatives.example">hello@opera-creatives.example</a>
        </div>
        <div>
          <p className="section-kicker">Studios</p>
          <p>Bengaluru / Mumbai / Remote</p>
        </div>
        <div>
          <p className="section-kicker">Elsewhere</p>
          <p>Instagram / LinkedIn / Are.na</p>
        </div>
      </section>
      <ContactForm />
    </>
  );
}
