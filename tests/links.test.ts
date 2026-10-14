// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/app/[slug]/route";
import { resolveTarget } from "@/lib/links";

const call = (slug: string, host = "https://www.operacreatives.com") =>
  GET(new Request(`${host}/${slug}`), { params: Promise.resolve({ slug }) });

function mockDb(impl: () => Promise<Response>) {
  vi.stubGlobal("fetch", vi.fn(impl));
}
const row = (destination: string, ref: string | null = null) =>
  Promise.resolve(new Response(JSON.stringify([{ destination, ref }]), { status: 200 }));

afterEach(() => vi.unstubAllGlobals());

describe("short link redirects", () => {
  it("redirects to the destination stored in the database", async () => {
    mockDb(() => row("https://cal.com/opera"));
    const res = await call("book");
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("https://cal.com/opera");
  });

  it("tags internal destinations with ref so PostHog can tell entry points apart", async () => {
    mockDb(() => row("/deck"));
    expect((await call("pitch")).headers.get("location")).toBe("https://www.operacreatives.com/deck?ref=pitch");
    mockDb(() => row("/deck", "nfc-sanchit"));
    expect((await call("pitch")).headers.get("location")).toBe("https://www.operacreatives.com/deck?ref=nfc-sanchit");
  });

  it("is case-insensitive", async () => {
    mockDb(() => row("https://cal.com/opera"));
    expect((await call("BOOK")).status).toBe(307);
  });
});

describe("printed card links never break", () => {
  const qr = "https://www.operacreatives.com/deck?ref=card";
  const nfc = "https://www.operacreatives.com/deck?ref=nfc";

  it("falls back when the database is unreachable", async () => {
    mockDb(() => Promise.reject(new Error("network down")));
    expect((await call("qr")).headers.get("location")).toBe(qr);
    expect((await call("nfc")).headers.get("location")).toBe(nfc);
  });

  it("falls back when the database errors or times out", async () => {
    mockDb(() => Promise.resolve(new Response("boom", { status: 500 })));
    expect((await call("qr")).headers.get("location")).toBe(qr);
    mockDb(() => Promise.reject(new DOMException("timeout", "TimeoutError")));
    expect((await call("nfc")).headers.get("location")).toBe(nfc);
  });

  it("falls back when the row is deleted or disabled", async () => {
    mockDb(() => Promise.resolve(new Response("[]", { status: 200 })));
    expect((await call("qr")).headers.get("location")).toBe(qr);
  });

  it("falls back when the stored destination is garbage", async () => {
    mockDb(() => row("http://[bad"));
    expect((await call("qr")).headers.get("location")).toBe(qr);
  });

  it("keeps the founders' card QR codes working on the links page when the database is down", async () => {
    mockDb(() => Promise.reject(new Error("network down")));
    for (const slug of ["kshitij", "sanchit", "jinesh"]) {
      expect((await call(slug)).headers.get("location")).toBe(`https://www.operacreatives.com/links?ref=${slug}-qr`);
    }
    expect((await call("sanchit-nfc")).headers.get("location")).toBe("https://www.operacreatives.com/links?ref=sanchit-nfc");
  });

  it("follows the database when it is healthy, so the destination stays editable", async () => {
    mockDb(() => row("https://example.com/new"));
    expect((await call("qr")).headers.get("location")).toBe("https://example.com/new");
  });
});

describe("unknown links", () => {
  it("returns 404 for unknown slugs, even when the database is down", async () => {
    mockDb(() => Promise.reject(new Error("network down")));
    expect((await call("nope")).status).toBe(404);
    mockDb(() => Promise.resolve(new Response("[]", { status: 200 })));
    expect((await call("nope")).status).toBe(404);
  });

  it("rejects malformed slugs without hitting the database", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    expect((await call("wp-login.php")).status).toBe(404);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe("redirect target", () => {
  it("leaves external destinations untouched", () => {
    expect(resolveTarget("https://cal.com/opera?x=1", null, "book", "https://www.operacreatives.com").toString()).toBe(
      "https://cal.com/opera?x=1",
    );
  });

  it("keeps an existing ref on internal destinations", () => {
    expect(resolveTarget("/deck?ref=card", null, "qr", "https://www.operacreatives.com").toString()).toBe(
      "https://www.operacreatives.com/deck?ref=card",
    );
  });
});

describe("scan analytics", () => {
  it("records the slug, ref, destination and rough origin of a scan", async () => {
    const { scanProperties } = await import("@/lib/analytics");
    const req = new Request("https://www.operacreatives.com/kshitij", {
      headers: {
        "x-vercel-ip-country": "IN",
        "x-vercel-ip-city": "Pune",
        "x-forwarded-for": "203.0.113.9, 10.0.0.1",
        "user-agent": "TestPhone",
      },
    });
    const props = scanProperties(req, "kshitij", new URL("https://www.operacreatives.com/links?ref=kshitij-qr"));
    expect(props).toMatchObject({ slug: "kshitij", ref: "kshitij-qr", destination: "/links", country: "IN", city: "Pune", $ip: "203.0.113.9", user_agent: "TestPhone" });
  });

  it("sends the event to PostHog without a person profile, and never throws", async () => {
    const { captureServer } = await import("@/lib/analytics");
    const f = vi.fn(() => Promise.resolve(new Response("{}", { status: 200 })));
    vi.stubGlobal("fetch", f);
    await captureServer("short_link_scan", { slug: "qr" });
    const [url, init] = f.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toMatch(/\/capture\/$/);
    const body = JSON.parse(init.body as string);
    expect(body.event).toBe("short_link_scan");
    expect(body.properties).toMatchObject({ slug: "qr", $process_person_profile: false });
    vi.stubGlobal("fetch", vi.fn(() => Promise.reject(new Error("down"))));
    await expect(captureServer("x", {})).resolves.toBeUndefined();
  });
});
