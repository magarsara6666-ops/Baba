import { NextResponse } from "next/server";

const FLODESK_FORM_URL =
  "https://form.flodesk.com/forms/6ae5a87c6e4a3ea82039839a/submit";

type FlodeskPayload = {
  name?: string;
  email?: string;
  phone?: string;
  age?: string;
  sex?: string;
  problem?: string;
  time?: string;
};

export async function POST(request: Request) {
  let payload: FlodeskPayload;
  try {
    payload = (await request.json()) as FlodeskPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = payload.email?.trim() ?? "";
  if (!email) {
    return NextResponse.json(
      { error: "An email address is required for the email automation." },
      { status: 400 },
    );
  }

  const nameParts = (payload.name?.trim() ?? "").split(/\s+/).filter(Boolean);
  const firstName = nameParts.shift() ?? "";
  const form = new URLSearchParams({
    firstName,
    email,
    "fields.whatsappNumber": payload.phone?.trim() ?? "",
    "fields.anythingYouWantToSay": [
      payload.age?.trim() ? `Age: ${payload.age.trim()}` : "",
      payload.sex?.trim() ? `Sex: ${payload.sex.trim()}` : "",
      payload.problem?.trim() ? `Problem: ${payload.problem.trim()}` : "",
    ]
      .filter(Boolean)
      .join(" | "),
    "fields.preferredConsultationTime": payload.time?.trim() ?? "",
    confirm_email_address: "",
  });

  try {
    const response = await fetch(FLODESK_FORM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "text/html,application/xhtml+xml",
      },
      body: form.toString(),
      redirect: "follow",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Flodesk did not accept the submission." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Flodesk is temporarily unavailable." },
      { status: 502 },
    );
  }
}
