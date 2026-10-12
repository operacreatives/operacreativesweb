import { NextResponse } from "next/server";
import { PROTECTED_LINKS, SLUG_RE, fetchPublicLink, isProtectedSlug, resolveTarget } from "@/lib/links";

// Short links: /qr, /nfc and anything created on the dashboard's Links page.
// Never fails for the protected card links: if the database is down, the row is
// missing/disabled or its destination is invalid, the built-in default is used.

export const dynamic = "force-dynamic";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }): Promise<Response> {
  const slug = (await params).slug.toLowerCase();
  if (!SLUG_RE.test(slug)) return notFound();

  const origin = new URL(req.url).origin;
  let target: URL | null = null;

  try {
    const row = await fetchPublicLink(slug);
    if (row) target = resolveTarget(row.destination, row.ref, slug, origin);
  } catch {
    // database unreachable or row invalid: fall through to the built-in default
  }

  if (!target && isProtectedSlug(slug)) {
    target = resolveTarget(PROTECTED_LINKS[slug], null, slug, origin);
  }
  if (!target) return notFound();

  const res = NextResponse.redirect(target, 307);
  res.headers.set("Cache-Control", "no-store");
  res.headers.set("X-Robots-Tag", "noindex");
  return res;
}

function notFound(): Response {
  return new Response("Not found", { status: 404, headers: { "Cache-Control": "no-store" } });
}
