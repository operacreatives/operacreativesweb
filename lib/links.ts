// Short links (QR codes, NFC taps, bio links). Links are managed in the
// dashboard (Links page) and stored in its Supabase project; the website only
// reads them, with the publishable key (safe to ship). That key can see just
// slug/destination/ref of ACTIVE links, nothing else.

const SUPABASE_URL = process.env.SUPABASE_URL || "https://kcebwacbolietlwylxwi.supabase.co";
const PUBLISHABLE_KEY =
  process.env.SUPABASE_PUBLISHABLE_KEY || "sb_publishable_6lzSTkAo01hGorlT072n9g_T54blJRm";

// Printed on cards, so these must never stop working: they always fall back to
// these destinations when the database is unreachable, or the row is missing,
// disabled or invalid.
export const PROTECTED_LINKS: Record<string, string> = {
  qr: "/deck?ref=card",
  nfc: "/deck?ref=nfc",
  // The founders' own card QR codes and NFC chips point at the links page.
  kshitij: "/links?ref=kshitij-qr",
  sanchit: "/links?ref=sanchit-qr",
  jinesh: "/links?ref=jinesh-qr",
  "sanchit-nfc": "/links?ref=sanchit-nfc",
};

export const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,39}$/;

export function isProtectedSlug(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(PROTECTED_LINKS, slug);
}

// Internal destinations get ?ref=<ref or slug> so PostHog can tell QR, NFC and
// other entry points apart. External destinations are left untouched.
export function resolveTarget(destination: string, ref: string | null, slug: string, origin: string): URL {
  const url = new URL(destination, origin);
  const internal = url.origin === origin || /^(www\.)?operacreatives\.com$/.test(url.hostname);
  if (internal && !url.searchParams.has("ref")) url.searchParams.set("ref", ref || slug);
  return url;
}

export async function fetchPublicLink(slug: string): Promise<{ destination: string; ref: string | null } | null> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/short_links?select=destination,ref&slug=eq.${encodeURIComponent(slug)}&active=eq.true&limit=1`,
    { headers: { apikey: PUBLISHABLE_KEY }, cache: "no-store", signal: AbortSignal.timeout(2500) },
  );
  if (!res.ok) throw new Error(`links lookup failed: ${res.status}`);
  const rows = (await res.json()) as { destination: string; ref: string | null }[];
  return rows[0] ?? null;
}
