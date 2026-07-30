"use client";

export function ClapperboardSection() {
  return (
    <section className="clapperboard-section">
      <div className="clapperboard-wrapper">
        <div className="mascot mascot-left" aria-hidden="true">
          <svg viewBox="0 0 100 100" width="80" height="80" fill="var(--cream)">
            <rect x="20" y="20" width="60" height="60" rx="10" />
            <circle cx="35" cy="45" r="8" fill="var(--black)" />
            <circle cx="65" cy="45" r="8" fill="var(--black)" />
            <rect x="30" y="65" width="40" height="5" fill="var(--black)" rx="2" />
            <rect x="45" y="0" width="10" height="20" />
            <circle cx="50" cy="5" r="5" fill="var(--black)" />
          </svg>
        </div>
        <div className="clapperboard-board">
          <div className="clapperboard-stick" />
          <div className="clapperboard-content">
            <h2 className="clapperboard-title">Let&apos;s Collaborate</h2>
            <form className="clapperboard-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Prod. No.</label>
                <input type="text" placeholder="001" />
              </div>
              <div className="form-group">
                <label>Prod. Name</label>
                <input type="text" placeholder="Your Project" />
              </div>
              <div className="form-group">
                <label>Contact Freq.</label>
                <input type="text" placeholder="Email / Phone" />
              </div>
              <button type="submit" className="clapperboard-cta">
                Book a Scene
              </button>
            </form>
          </div>
        </div>
        <div className="mascot mascot-right" aria-hidden="true">
          <svg viewBox="0 0 100 100" width="80" height="80" fill="var(--cream)">
            <rect x="20" y="20" width="60" height="60" rx="10" />
            <circle cx="35" cy="45" r="8" fill="var(--black)" />
            <circle cx="65" cy="45" r="8" fill="var(--black)" />
            <rect x="30" y="65" width="40" height="5" fill="var(--black)" rx="2" />
            <rect x="45" y="0" width="10" height="20" />
            <circle cx="50" cy="5" r="5" fill="var(--black)" />
          </svg>
        </div>
      </div>
      <nav className="clapperboard-socials" aria-label="Social links">
        <a href="https://linkedin.com" rel="noreferrer" target="_blank">
          LinkedIn
        </a>
        <a href="https://x.com/operacreatives_" rel="noreferrer" target="_blank">
          Twitter/X
        </a>
        <a href="https://www.instagram.com/operacreatives_" rel="noreferrer" target="_blank">
          Instagram
        </a>
        <a href="mailto:hello@operacreatives.example">Mail</a>
      </nav>
    </section>
  );
}
