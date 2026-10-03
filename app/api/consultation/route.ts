import { consultationSchema } from "@/lib/consultation";
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
  const url = process.env.CONSULTATION_WEBHOOK_URL;
  const token = process.env.CONSULTATION_WEBHOOK_TOKEN;
  if (!url || !token)
    return Response.json(
      {
        error:
          "Online requests are not available yet. Your request has not been sent. Please use the clinic’s verified phone or WhatsApp contact when available.",
      },
      { status: 503 },
    );
  if (!url.startsWith("https://") && process.env.NODE_ENV === "production")
    return Response.json(
      { error: "Online requests are temporarily unavailable." },
      { status: 503 },
    );
  try {
    const { website: _website, ...payload } = parsed.data;
    void _website;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...payload,
        source: "website",
        submittedAt: new Date().toISOString(),
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
          "We could not deliver your request. Please try again or contact the clinic directly.",
      },
      { status: 502 },
    );
  }
}
