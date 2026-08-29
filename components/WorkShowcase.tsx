"use client";

import { useState, type ReactNode } from "react";
import { FifaStarIcon } from "./FifaStarIcon";

type TabKey = "work" | "fifa";

const TABS: Array<{ key: TabKey; index: string; label: string }> = [
  { key: "work", index: "01", label: "Our Work" },
  { key: "fifa", index: "02", label: "FIFA World Cup Animations" },
];

export function WorkShowcase({
  selectedWork,
  fifaWork,
}: {
  selectedWork: ReactNode;
  fifaWork: ReactNode;
}) {
  const [active, setActive] = useState<TabKey>("work");

  return (
    <section id="work" className="work-showcase">
      <header className="work-showcase__head">
        <div className="work-showcase__tabs" role="tablist" aria-label="Work categories">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              id={`work-tab-${tab.key}`}
              aria-selected={active === tab.key}
              aria-controls={`work-panel-${tab.key}`}
              className={`work-showcase__tab ${active === tab.key ? "is-active" : ""}`}
              onClick={() => setActive(tab.key)}
            >
              <span className="work-showcase__tab-index">{tab.index}</span>
              <span className="work-showcase__tab-name">
                {tab.label}
                {tab.key === "fifa" && (
                  <span className="fifa-star-badge" aria-hidden="true">
                    <FifaStarIcon className="fifa-star-svg" width={26} height={26} />
                  </span>
                )}
              </span>
              <svg
                className="work-showcase__tab-arrow"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 12h13M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ))}
        </div>
        <span className="work-showcase__hint" aria-hidden="true">
          Tap to explore each creation
        </span>
      </header>

      <div
        role="tabpanel"
        id="work-panel-work"
        aria-labelledby="work-tab-work"
        hidden={active !== "work"}
      >
        {selectedWork}
      </div>

      <div
        role="tabpanel"
        id="work-panel-fifa"
        aria-labelledby="work-tab-fifa"
        hidden={active !== "fifa"}
      >
        {fifaWork}
      </div>
    </section>
  );
}
