"use client";
import { useRef, useState, useEffect } from "react";
import {
  CheckCircle2,
  LockKeyhole,
  LoaderCircle,
  ArrowUpRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect } from "@/components/ui/native-select";
import { Button } from "@/components/ui/button";
import { consultationSchema } from "@/lib/consultation";
import { track } from "@/lib/analytics";
import { clinic } from "@/lib/clinic";
import { z } from "zod";

type MetaPixelWindow = Window & {
  fbq?: (...args: unknown[]) => void;
};
export function ConsultationForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [serverError, setServerError] = useState("");
  const started = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    const modelContext = (
      document as Document & {
        modelContext?: {
          registerTool: (
            tool: unknown,
            options: { signal: AbortSignal },
          ) => void | Promise<void>;
        };
      }
    ).modelContext;
    if (!modelContext?.registerTool) return;
    const lifecycle = new AbortController();
    const schema = z
      .object({
        problem: z.enum([
          "Varicose Veins",
          "Fistula / Fissure",
          "Piles / Hemorrhoids",
          "Other",
        ]),
        method: z.enum(["Phone", "WhatsApp", "Email"]).optional(),
        time: z
          .enum(["Any time", "Morning", "Afternoon", "Evening"])
          .optional(),
      })
      .strict();
    try {
      void Promise.resolve(
        modelContext.registerTool(
          {
            name: "prepare_consultation_request",
            title: "Prepare consultation request",
            description:
              "Stage the broad concern and contact preference in the visible consultation form. Does not submit, contact the clinic, or confirm an appointment. The visitor must enter contact details and consent before submission.",
            inputSchema: {
              type: "object",
              properties: {
                problem: {
                  type: "string",
                  enum: [
                    "Varicose Veins",
                    "Fistula / Fissure",
                    "Piles / Hemorrhoids",
                    "Other",
                  ],
                },
                method: {
                  type: "string",
                  enum: ["Phone", "WhatsApp", "Email"],
                },
                time: {
                  type: "string",
                  enum: ["Any time", "Morning", "Afternoon", "Evening"],
                },
              },
              required: ["problem"],
              additionalProperties: false,
            },
            annotations: { readOnlyHint: false, untrustedContentHint: false },
            async execute(input: unknown) {
              const parsed = schema.safeParse(input);
              if (!parsed.success) return { status: "invalid_input" };
              const form = formRef.current;
              if (!form) return { status: "form_unavailable" };
              for (const [key, value] of Object.entries(parsed.data)) {
                const field = form.elements.namedItem(key);
                if (
                  field instanceof HTMLSelectElement ||
                  field instanceof HTMLInputElement ||
                  field instanceof HTMLTextAreaElement
                )
                  field.value = value;
              }
              form.scrollIntoView({ block: "center" });
              return {
                status: "prepared",
                submitted: false,
                problem: parsed.data.problem,
              };
            },
          },
          { signal: lifecycle.signal },
        ),
      ).catch(() => {});
    } catch {
      /* Unsupported implementations leave the visible form available. */
    }
    return () => lifecycle.abort();
  }, []);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const values = Object.fromEntries(f);
    const result = consultationSchema.safeParse({
      ...values,
      consent: f.get("consent") === "on",
    });
    if (!result.success) {
      const next: Record<string, string> = {};
      result.error.issues.forEach((x) => {
        next[String(x.path[0])] = x.message;
      });
      setErrors(next);
      setTimeout(
        () => form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
        0,
      );
      return;
    }
    setErrors({});
    setState("loading");
    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${clinic.email}`,
        {
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
            name: result.data.name,
            age: result.data.age,
            sex: result.data.sex,
            address: result.data.address,
            phone: result.data.phone,
            email: result.data.email || "Not provided",
            problem: result.data.problem,
            preferred_contact_method: result.data.method,
            preferred_consultation_time: result.data.time,
            consent_to_contact: "Yes",
            submitted_at: new Date().toISOString(),
          }),
        },
      );
      const body = (await response.json().catch(() => null)) as {
        success?: boolean | string;
        message?: string;
      } | null;
      const delivered =
        response.ok &&
        (body?.success === true || body?.success === "true");
      if (!delivered) {
        const needsActivation = body?.message && /activat/i.test(body.message);
        throw new Error(
          needsActivation
            ? "Email delivery is waiting for one-time FormSubmit activation. Please call or WhatsApp the clinic until activation is completed."
            : "We could not email your request. Please try again or call or WhatsApp the clinic directly.",
        );
      }

      // The Flodesk form ID from the supplied embed is wired through a
      // same-origin route so the existing visual form can stay unchanged.
      // Flodesk requires an email address; the clinic email submission above
      // still works when the visitor leaves the optional email blank.
      if (result.data.email) {
        const iframe = document.createElement("iframe");
        iframe.name = `flodesk-submit-${Date.now()}`;
        iframe.title = "Flodesk submission";
        iframe.hidden = true;
        document.body.appendChild(iframe);
        const flodeskForm = document.createElement("form");
        flodeskForm.action =
          "https://form.flodesk.com/forms/6ae5a87c6e4a3ea82039839a/submit";
        flodeskForm.method = "post";
        flodeskForm.target = iframe.name;
        const firstName = result.data.name.trim().split(/\s+/)[0] ?? "";
        const fields: Record<string, string> = {
          firstName,
          email: result.data.email,
          "fields.whatsappNumber": result.data.phone,
          "fields.anythingYouWantToSay": `Age: ${result.data.age} | Sex: ${result.data.sex} | Problem: ${result.data.problem}`,
          "fields.preferredConsultationTime": result.data.time,
          confirm_email_address: "",
        };
        Object.entries(fields).forEach(([name, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = name;
          input.value = value;
          flodeskForm.appendChild(input);
        });
        document.body.appendChild(flodeskForm);
        flodeskForm.submit();
        window.setTimeout(() => {
          iframe.remove();
          flodeskForm.remove();
        }, 10_000);
      }
      setState("success");
      const metaPixel = (window as MetaPixelWindow).fbq;
      if (typeof metaPixel === "function") {
        // Send only the generic conversion event. Never send patient details
        // or medical information to Meta.
        metaPixel("track", "Lead");
      }
      track("consultation_form_submit", {
        method: result.data.method,
      });
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Please try again.");
      setState("error");
    }
  }
  const attrs = (name: string) => ({
    id: name,
    name,
    "aria-invalid": !!errors[name],
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });
  const error = (name: string) =>
    errors[name] && (
      <span id={`${name}-error`} className="field-error">
        {errors[name]}
      </span>
    );
  if (state === "success")
    return (
      <div className="form-success" role="status">
        <CheckCircle2 size={48} />
        <h2>Thank you.</h2>
        <p>
          We’ve received your consultation request. Our team will contact you
          regarding the next steps.
        </p>
        <Button className="btn btn-primary" onClick={() => setState("idle")}>
          Send another request
        </Button>
      </div>
    );
  return (
    <form
      ref={formRef}
      noValidate
      className="consultation-form"
      onSubmit={submit}
      onFocus={() => {
        if (!started.current) {
          track("consultation_form_start");
          started.current = true;
        }
      }}
    >
      <div className="form-intro">
        <span className="eyebrow">LET’S START A CONVERSATION</span>
        <h2>Request a Free Consultation</h2>
        <p>
          Complete this short form. Our team will use your details only to
          respond to your consultation request.
        </p>
      </div>
      <fieldset className="form-section">
        <legend>
          <span>1</span> Patient details
        </legend>
        <div className="form-grid">
          <div>
            <label htmlFor="name">
              Full Name <span>*</span>
            </label>
            <Input
              {...attrs("name")}
              autoComplete="name"
              maxLength={100}
              required
              placeholder="Your full name"
            />
            {error("name")}
          </div>
          <div>
            <label htmlFor="phone">
              Phone Number <span>*</span>
            </label>
            <Input
              {...attrs("phone")}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              maxLength={20}
              placeholder="Include your country code"
            />
            {error("phone")}
          </div>
          <div>
            <label htmlFor="age">
              Age <span>*</span>
            </label>
            <Input
              {...attrs("age")}
              type="number"
              inputMode="numeric"
              min={1}
              max={120}
              required
              placeholder="Age"
            />
            {error("age")}
          </div>
          <div>
            <label htmlFor="sex">
              Sex <span>*</span>
            </label>
            <NativeSelect {...attrs("sex")} defaultValue="" required>
              <option value="" disabled>
                Select an option
              </option>
              {["Female", "Male", "Other", "Prefer not to say"].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </NativeSelect>
            {error("sex")}
          </div>
          <div className="full">
            <label htmlFor="address">
              Address <span>*</span>
            </label>
            <Input
              {...attrs("address")}
              autoComplete="street-address"
              maxLength={250}
              required
              placeholder="Your address"
            />
            {error("address")}
          </div>
          <div className="full">
            <label htmlFor="email">
              Email <small>(optional)</small>
            </label>
            <Input
              {...attrs("email")}
              autoComplete="email"
              type="email"
              inputMode="email"
              maxLength={254}
              placeholder="you@example.com"
            />
            {error("email")}
          </div>
        </div>
      </fieldset>

      <fieldset className="form-section">
        <legend>
          <span>2</span> Consultation details
        </legend>
        <div className="form-grid">
          <div className="full">
            <label htmlFor="problem">
              Problem / Concern <span>*</span>
            </label>
            <Textarea
              {...attrs("problem")}
              maxLength={500}
              rows={4}
              required
              placeholder="Briefly describe your problem or select the service you want to discuss"
            />
            <p className="form-help">
              Please keep this brief. Do not include medical reports or
              identification numbers.
            </p>
            {error("problem")}
          </div>
          <div>
            <label htmlFor="method">Preferred Contact Method</label>
            <NativeSelect {...attrs("method")} defaultValue="Phone">
              {["Phone", "WhatsApp", "Email"].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </NativeSelect>
          </div>
          <div>
            <label htmlFor="time">Preferred Consultation Time</label>
            <NativeSelect {...attrs("time")} defaultValue="Any time">
              <option>Any time</option>
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
            </NativeSelect>
          </div>
        </div>
      </fieldset>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="consent">
        <input {...attrs("consent")} type="checkbox" required />
        <span>
          I agree to be contacted by {clinic.name} regarding my consultation
          request. <a href="/privacy-policy">Privacy Policy</a>
        </span>
      </label>
      {error("consent")}
      {state === "error" && (
        <p className="form-error" role="alert">
          {serverError}
        </p>
      )}
      <Button
        disabled={state === "loading"}
        className="btn btn-primary form-submit"
        type="submit"
      >
        {state === "loading" ? (
          <>
            <LoaderCircle className="spin" />
            Sending your request…
          </>
        ) : (
          <>
            Request Free Consultation
            <ArrowUpRight size={18} />
          </>
        )}
      </Button>
      <p className="form-help">
        <LockKeyhole size={14} /> Your request is for a callback, not a
        confirmed appointment.
      </p>
    </form>
  );
}
