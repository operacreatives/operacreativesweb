import posthog from "posthog-js";

// Public project key; env vars override it.
const key =
  process.env.NEXT_PUBLIC_POSTHOG_KEY ||
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ||
  "phc_BP7bkAroU9JunCphcQijDrHMQKUfnwnbMZLjJ2N4SVA4";

posthog.init(key, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
  capture_exceptions: true,
  capture_pageview: "history_change",
  capture_pageleave: true,
});
