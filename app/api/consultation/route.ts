import { consultationSchema } from "@/lib/consultation";
import { clinic } from "@/lib/clinic";
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return Response.json(
      { error: "This request is not allowed." },
      { status: 403 },
    );
  if (!request.headers.get("content-type")?.includes("application/json"))
    return Response.json(
      { error: "Unsupported request format." },
      { status: 415 },
    );
  const raw = await request.text();
  if (raw.length > 10000)
    return Response.json({ error: "Request too large." }, { status: 413 });
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  const parsed = consultationSchema.safeParse(data);
  if (!parsed.success)
    return Response.json(
      { error: "Please check the required fields." },
      { status: 400 },
    );
  try {
    const { website: _website, ...payload } = parsed.data;
    void _website;
    const webhookUrl = process.env.CONSULTATION_WEBHOOK_URL;
    const webhookToken = process.env.CONSULTATION_WEBHOOK_TOKEN;
    const submittedAt = new Date().toISOString();
    const response =
      webhookUrl && webhookToken
        ? await fetch(webhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${webhookToken}`,
            },
            body: JSON.stringify({
              ...payload,
              source: "website",
              submittedAt,
            }),
            signal: AbortSignal.timeout(10000),
          })
        : await fetch(`https://formsubmit.co/ajax/${clinic.email}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              _subject: "New Free Consultation Request — Deepsara Clinic",
              _template: "table",
              _captcha: "false",
              _url: `${clinic.websiteUrl}/book-consultation`,
              name: payload.name,
              age: payload.age,
              sex: payload.sex,
              address: payload.address,
              phone: payload.phone,
              email: payload.email || "Not provided",
              problem: payload.problem,
              preferred_contact_method: payload.method,
              preferred_consultation_time: payload.time,
              consent_to_contact: "Yes",
              submitted_at: submittedAt,
            }),
            signal: AbortSignal.timeout(10000),
          });
    if (!response.ok) throw new Error("delivery");
    return Response.json(
      { success: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      {
        error:
          "We could not email your request. Please try again or call or WhatsApp the clinic directly.",
      },
      { status: 502 },
    );
  }
}
