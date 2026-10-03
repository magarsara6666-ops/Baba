# Clinic website verification

Verified 03 October 2026.

- 17 rendered pages return 200 with one H1 and unique SEO metadata.
- Unknown service, blog and general routes return 404.
- sitemap.xml and robots.txt return 200; unconfigured site stays non-indexable.
- API validates fields, consent, origin and honeypot.
- Mocked delivery acceptance returns success; unavailable and failed delivery return truthful errors.
- Configured telephone and WhatsApp URL formats pass.
- Browser interactions and responsive checks documented below.

Browser QA:

- 77 layout checks across 1440, 1280, 1024, 768, 430, 390 and 375 pixels on home, about, services, blog, contact, consultation, privacy, three treatment pages and one article: no horizontal overflow or broken images.
- Fistula treatment also checked at all seven widths; FAQ expands and displays its answer.
- Desktop Services menu opens and navigates to a treatment page.
- Mobile navigation opens, exposes all links and closes after selecting consultation.
- Empty form shows name, phone, concern and consent errors; focus moves to the first invalid field. A valid test enquiry displays the expected unconfigured-delivery error without losing input.
- Blog category filter displays matching content; article links resolve.
- FAQ assistant refuses a diagnosis request and directs to a qualified healthcare professional.
- Browser console: no warnings or errors in inspected pages.
- WebMCP preparation tool registered; valid staging updated visible condition/time, invalid input returned invalid_input. No submission occurred.
- Phone and WhatsApp links validated with test-only configuration; no calls/messages were sent.
- Production build, TypeScript and lint pass. Public integration IDs and clinic details remain deliberately empty.

Limitations: no real CRM endpoint, analytics IDs, clinic phone, location, medical team credentials or approved clinic photographs were supplied. Successful delivery is tested with a mock, not a real clinic system. Public launch requires these details and privacy/medical review.
