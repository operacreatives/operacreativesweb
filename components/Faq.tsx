import { CONTACT_EMAIL, FAQS } from "@/lib/site";

// `name="faq"` makes the browser close the other questions when one opens.
export function Faq() {
  return (
    <section className="pad on-light" id="faq">
      <div className="faq__head">
        <span className="slate">FAQ</span>
        <h2 className="display h2 rv">Before we hit render</h2>
      </div>
      <div className="faq">
        {FAQS.map((f) => (
          <details name="faq" key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
        <p className="faq__note">
          Still have a question? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </div>
    </section>
  );
}
