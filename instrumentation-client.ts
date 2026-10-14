import posthog from "posthog-js";
import { POSTHOG_HOST, POSTHOG_KEY } from "@/lib/analytics";

posthog.init(POSTHOG_KEY, {
  api_host: POSTHOG_HOST,
  capture_exceptions: true,
  capture_pageview: "history_change",
  capture_pageleave: true,
});
