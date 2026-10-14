import { CONTACT_EMAIL, SITE_NAME, SOCIALS } from "@/lib/v2/site";

export function Footer() {
  return (
    <footer>
      <div className="credits">
        <div className="big">
          Directed by {SITE_NAME}.
          <br />
          <em>Made to be shared.</em>
        </div>
      </div>
      <div className="fl">
        <nav aria-label="Contact and social">
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ))}
        </nav>
        <span className="mono">© 2026 {SITE_NAME}. All rights reserved.</span>
      </div>
    </footer>
  );
}
