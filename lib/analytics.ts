// PostHog project settings (public key, safe to ship) and a tiny server-side capture,
// used to count short-link scans (QR codes and NFC taps) at the moment of the redirect.

export const POSTHOG_KEY =
  process.env.NEXT_PUBLIC_POSTHOG_KEY ||
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ||
  "phc_BP7bkAroU9JunCphcQijDrHMQKUfnwnbMZLjJ2N4SVA4";
export const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

// Sends one event without a person profile (each scan is anonymous). Never throws:
// analytics must not slow down or break a redirect.
export async function captureServer(event: string, properties: Record<string, unknown>): Promise<void> {
  try {
    await fetch(`${POSTHOG_HOST}/capture/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: POSTHOG_KEY,
        event,
        distinct_id: crypto.randomUUID(),
        properties: { ...properties, $process_person_profile: false },
        timestamp: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(2500),
    });
  } catch {
    // ignore
  }
}

// What we record about a scan: which link, where it went, and rough origin
// (country and city come from Vercel's request headers, no tracking cookies involved).
export function scanProperties(req: Request, slug: string, target: URL): Record<string, unknown> {
  const h = req.headers;
  const city = h.get("x-vercel-ip-city");
  return {
    slug,
    ref: target.searchParams.get("ref"),
    destination: target.pathname,
    link_host: target.host,
    referrer: h.get("referer"),
    user_agent: h.get("user-agent"),
    country: h.get("x-vercel-ip-country"),
    region: h.get("x-vercel-ip-country-region"),
    city: city ? decodeURIComponent(city) : null,
    $ip: h.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined,
  };
}
