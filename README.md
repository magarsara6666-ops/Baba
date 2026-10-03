# Deepsara Super Speciality Laser Clinic

React 19, TypeScript, Tailwind 4, Lucide icons and Next.js App Router APIs, running with the Sites Vinext runtime for Cloudflare deployment. The App Router application uses standard `next/link`, `next/image` and metadata APIs. Vinext is a compatibility runtime, not the standard Next.js production server.

## Run

```sh
npm install
npm run dev -- --port 3000
npx tsc --noEmit
npm run lint
npm run build
```

With the development server running, `node scripts/verify.mjs` checks all routes, metadata and the consultation adapter with mocked delivery responses.

## Configuration and launch

Copy `.env.example` to `.env.local` for local development and configure verified values. Business details are centralized in `lib/clinic.ts`. Doctor profiles must be replaced with approved details and real photographs. Never use stock photography as a clinic team profile.

Before public launch:

1. Supply verified phone, international WhatsApp number, email, address, hours, map and website domain. Blank contact channels route to the contact page with an availability notice.
2. Add verified doctor credentials and approved real clinic photographs.
3. Have the clinic approve medical copy, draft article dates/content and the privacy policy. Set an enquiry retention policy and approved destination service.
4. Configure `CONSULTATION_WEBHOOK_URL` and server-only `CONSULTATION_WEBHOOK_TOKEN`. The HTTPS destination must verify the bearer token, apply rate limiting and spam protections, restrict staff access, implement retention and durably accept enquiries before returning 2xx. No form payloads are logged or stored in the marketing frontend. Until configured the API returns 503 and never claims receipt.
5. Configure the verified public site URL for canonical URLs and sitemap entries. Until then robots disallows crawling. A private preview is not a public clinic launch.
6. Add verified analytics IDs if wanted. Use direct GA or GTM, not both for the same property. Map the named events to Ads conversions in GTM/GA. No personal contact fields enter analytics events. Optional analytics require consent; a user can withdraw through Cookie preferences. Remove provider cookies as required by the final provider-specific consent policy.
7. Configure provider-side security headers (CSP, HSTS, frame restrictions, MIME protections), bot/rate limiting, delivery monitoring and production secrets.

## Architecture

- `lib/content.ts`: typed treatment and blog records; replace this module with a server CMS adapter later.
- `lib/clinic.ts`: all business details and shared contact URL construction.
- `lib/analytics.ts`: allowlisted funnel events without personal information.
- `lib/consultation.ts`: shared client/server schema.
- `app/api/consultation/route.ts`: delivery adapter, origin protection, bounds, honeypot and timeout handling.
- `components/`: shared UI, accessible Radix menu/dialog/accordion primitives, conversion actions, form and prepared FAQ guide.
- `app/services/[slug]`, `app/blog/[slug]`: data-driven landing pages with unknown slugs rejected.
- `app/sitemap.ts`, `app/robots.ts`: origin-aware SEO endpoints.

The assistant is a prepared FAQ guide with diagnosis/outcome/urgency safeguards. A future AI adapter should preserve these boundaries, avoid collecting sensitive data and use a server endpoint for secret credentials. Approved testimonials are supported but hidden by default.

Stock imagery: Pexels, photo 5215024. It is explicitly illustrative and does not depict the clinic’s medical team. Blog featured illustrations use Lucide icons and CSS.

## Deployment

Sites source identity is in `.openai/hosting.json`. The included Sites build/workflow helpers prepare a Cloudflare-compatible worker; public environment values require a rebuild. Secrets belong in hosted runtime configuration, never in source control. The site remains private until the business details and operational integrations are verified.
