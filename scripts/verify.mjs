import assert from "node:assert/strict";
import { build } from "esbuild";
import { writeFile } from "node:fs/promises";
const result = await build({
  entryPoints: ["lib/content.ts"],
  bundle: true,
  format: "esm",
  platform: "node",
  write: false,
});
const content = await import(
  `data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString("base64")}`
);
const routes = [
  "/",
  "/about",
  "/services",
  "/blog",
  "/contact",
  "/book-consultation",
  "/privacy-policy",
  ...content.treatments.map((t) => `/services/${t.slug}`),
  ...content.articles.map((a) => `/blog/${a.slug}`),
];
const titles = new Set();
for (const route of routes) {
  const r = await fetch(`http://127.0.0.1:3000${route}`);
  assert.equal(r.status, 200, route);
  const html = await r.text();
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, route);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert.ok(title, route);
  assert.ok(!titles.has(title), `Duplicate title ${route}`);
  titles.add(title);
  assert.match(html, /name="description"/, route);
  assert.match(html, /property="og:title"/, route);
  assert.match(html, /name="twitter:card"/, route);
  console.log(`PASS ${route}: H1, title, description, OG, Twitter`);
}
for (const path of ["/services/missing", "/blog/missing", "/missing"])
  assert.equal((await fetch(`http://127.0.0.1:3000${path}`)).status, 404, path);
assert.equal((await fetch("http://127.0.0.1:3000/sitemap.xml")).status, 200);
const robots = await (await fetch("http://127.0.0.1:3000/robots.txt")).text();
assert.match(robots, /Disallow: \//);
const bundle = await build({
  entryPoints: ["app/api/consultation/route.ts"],
  bundle: true,
  format: "esm",
  platform: "node",
  write: false,
});
const { POST } = await import(
  `data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString("base64")}`
);
const valid = {
  name: "Website Test",
  phone: "+9779800000000",
  email: "",
  condition: "Other",
  method: "Phone",
  time: "Any time",
  message: "",
  consent: true,
  website: "",
};
const req = (data, headers = {}) =>
  new Request("http://localhost/api/consultation", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(data),
  });
assert.equal((await POST(req({}))).status, 400);
assert.equal(
  (await POST(req(valid, { origin: "https://untrusted.invalid" }))).status,
  403,
);
assert.equal((await POST(req({ ...valid, website: "spam" }))).status, 400);
assert.equal((await POST(req({ ...valid, method: "Email" }))).status, 400);
assert.equal((await POST(req(valid))).status, 503);
process.env.CONSULTATION_WEBHOOK_URL = "https://delivery.example.invalid";
process.env.CONSULTATION_WEBHOOK_TOKEN = "test-only";
const nativeFetch = globalThis.fetch;
let submitted;
globalThis.fetch = async (url, options) => {
  assert.equal(url, process.env.CONSULTATION_WEBHOOK_URL);
  assert.equal(options.headers.Authorization, "Bearer test-only");
  submitted = JSON.parse(options.body);
  return new Response("{}", { status: 200 });
};
assert.equal((await POST(req(valid))).status, 200);
assert.equal(submitted.name, valid.name);
assert.equal(submitted.consent, true);
assert.equal(submitted.website, undefined);
globalThis.fetch = async () => new Response("{}", { status: 500 });
assert.equal((await POST(req(valid))).status, 502);
globalThis.fetch = nativeFetch;
delete process.env.CONSULTATION_WEBHOOK_URL;
delete process.env.CONSULTATION_WEBHOOK_TOKEN;
const clinicBundle = await build({
  entryPoints: ["lib/clinic.ts"],
  bundle: true,
  platform: "node",
  format: "esm",
  write: false,
  define: {
    "process.env.NEXT_PUBLIC_CLINIC_PHONE": '"+9779800000000"',
    "process.env.NEXT_PUBLIC_CLINIC_WHATSAPP": '"+9779800000000"',
  },
});
const configured = await import(
  `data:text/javascript;base64,${Buffer.from(clinicBundle.outputFiles[0].text).toString("base64")}`
);
assert.equal(configured.phoneHref, "tel:+9779800000000");
assert.match(configured.whatsappHref, /^https:\/\/wa.me\/9779800000000\?text=/);
console.log(
  "PASS invalid/unknown routes, sitemap, robots, form validation, origin check, honeypot, unavailable delivery, successful delivery, failed delivery, configured call/WhatsApp links",
);
await writeFile(
  "QA-REPORT.md",
  `# Clinic website verification\n\nVerified 03 October 2026.\n\n- ${routes.length} rendered pages return 200 with one H1 and unique SEO metadata.\n- Unknown service, blog and general routes return 404.\n- sitemap.xml and robots.txt return 200; unconfigured site stays non-indexable.\n- API validates fields, consent, origin and honeypot.\n- Mocked delivery acceptance returns success; unavailable and failed delivery return truthful errors.\n- Configured telephone and WhatsApp URL formats pass.\n- Browser interactions and responsive checks documented below.\n`,
);
