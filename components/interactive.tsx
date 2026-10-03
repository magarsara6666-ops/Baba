"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, ShieldCheck, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Action } from "./actions";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import { clinic } from "@/lib/clinic";
export function ViewEvent({
  event,
  slug,
}: {
  event: AnalyticsEvent;
  slug: string;
}) {
  useEffect(() => {
    track(event, { slug });
  }, [event, slug]);
  return null;
}
export function MobileStickyCTA() {
  return (
    <div className="mobile-sticky" aria-label="Quick contact">
      <Action kind="call">Call</Action>
      <Action kind="whatsapp">WhatsApp</Action>
      <Action>Free Consultation</Action>
    </div>
  );
}
export function AIChatButton() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>(
    [],
  );
  const [question, setQuestion] = useState("");
  function answer(e: React.FormEvent) {
    e.preventDefault();
    const q = question.trim();
    if (!q) return;
    let text =
      "I can help with clinic services, consultation steps and contact information. For personal medical advice, please arrange an assessment with a qualified healthcare professional.";
    if (/severe|emergency|heavy.*bleed|chest pain|breath|fever|urgent/i.test(q))
      text =
        "Please seek prompt medical care or appropriate local emergency services for urgent or severe symptoms. Do not wait for a website reply.";
    else if (
      /diagnos|do i have|what.*wrong|symptom|pain|bleed|cure|guarantee/i.test(q)
    )
      text =
        "I cannot diagnose conditions or promise treatment outcomes. Individual diagnosis and treatment suitability require assessment by a qualified healthcare professional.";
    else if (/service|treat|laser/i.test(q))
      text =
        "The clinic focuses on varicose veins, fistula, fissure and piles/hemorrhoids. Laser-based options are considered only where clinically appropriate. Explore our Services page or request a consultation.";
    else if (/call|book|appointment|consult/i.test(q))
      text =
        "Start with a free consultation call by using the form below. This offers initial guidance; examinations, tests and treatment may involve separate charges. A request is not a confirmed appointment.";
    else if (/address|hour|phone|contact/i.test(q))
      text = `Phone: ${clinic.phone || "awaiting verified details"}. Address: ${clinic.address || "awaiting verified details"}. Hours: ${clinic.openingHours || "awaiting verified details"}.`;
    setMessages((m) => [
      ...m.slice(-8),
      { role: "you", text: q },
      { role: "guide", text },
    ]);
    setQuestion("");
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="chat-trigger" aria-label="Need Help? Chat With Us">
          <MessageCircle size={20} />
          <span>Need Help? Chat With Us</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="chat-dialog">
        <DialogTitle>Deepsara Clinic Guide</DialogTitle>
        <DialogDescription>
          Automated FAQ guide · General information only
        </DialogDescription>
        <div className="chat-messages" aria-live="polite">
          <p className="chat-guide">
            Welcome. I can help you find services and understand consultation
            steps. Please avoid sharing personal medical details.
          </p>
          {messages.map((m, i) => (
            <p key={i} className={`chat-${m.role}`}>
              <strong>{m.role === "you" ? "You" : "Clinic Guide"}</strong>
              {m.text}
            </p>
          ))}
        </div>
        <div className="chat-links">
          <Link href="/services">Explore services</Link>
          <Link href="/book-consultation">Request a callback</Link>
          <Action kind="whatsapp" />
        </div>
        <form onSubmit={answer} className="chat-input">
          <label className="sr-only" htmlFor="chat-question">
            Ask a general question
          </label>
          <Input
            id="chat-question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask about services or consultation"
            maxLength={300}
          />
          <Button
            type="submit"
            className="btn btn-primary"
            aria-label="Send question"
          >
            <ArrowRight />
          </Button>
        </form>
        <small>
          This guide uses prepared replies. It is ready for a future AI service.
        </small>
      </DialogContent>
    </Dialog>
  );
}
function initializeAnalytics() {
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  const gtm = process.env.NEXT_PUBLIC_GTM_ID;
  const pixel = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const addScript = (src: string) => {
    if (document.querySelector(`script[src="${src}"]`)) return;
    const element = document.createElement("script");
    element.src = src;
    element.async = true;
    document.head.appendChild(element);
  };
  if (ga && /^G-[A-Z0-9]+$/.test(ga) && !gtm) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: unknown[]) {
      window.dataLayer!.push(
        Object.fromEntries(args.map((value, index) => [String(index), value])),
      );
    };
    addScript(`https://www.googletagmanager.com/gtag/js?id=${ga}`);
    window.gtag("js", new Date());
    window.gtag("config", ga);
  }
  if (gtm && /^GTM-[A-Z0-9]+$/.test(gtm)) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    addScript(`https://www.googletagmanager.com/gtm.js?id=${gtm}`);
  }
  if (pixel && /^\d+$/.test(pixel)) {
    const queue: unknown[][] = [];
    const pixelFn = function (...args: unknown[]) {
      const self = pixelFn as typeof pixelFn & {
        callMethod?: (...args: unknown[]) => void;
      };
      if (self.callMethod) self.callMethod(...args);
      else queue.push(args);
    };
    window.fbq = pixelFn;
    Object.assign(pixelFn, {
      queue,
      loaded: true,
      version: "2.0",
      push: pixelFn,
    });
    addScript("https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", pixel);
    window.fbq("track", "PageView");
  }
}
export function AnalyticsConsent() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onReady = () => {
      const preference = localStorage.getItem("deepsara-analytics-consent");
      setShow(!preference);
      if (preference === "accepted") initializeAnalytics();
    };
    const id = requestAnimationFrame(onReady);
    return () => cancelAnimationFrame(id);
  }, []);
  function select(choice: string) {
    const previous = localStorage.getItem("deepsara-analytics-consent");
    localStorage.setItem("deepsara-analytics-consent", choice);
    setShow(false);
    if (choice === "accepted" && previous !== "accepted") initializeAnalytics();
    if (choice === "declined" && previous === "accepted")
      window.location.reload();
  }
  return (
    <>
      {show && (
        <aside className="cookie-banner" aria-label="Analytics preferences">
          <ShieldCheck />
          <div>
            <strong>Your privacy matters</strong>
            <p>
              Optional analytics help us improve the site.{" "}
              <Link href="/privacy-policy">Learn more</Link>
            </p>
          </div>
          <Button
            className="btn btn-outline"
            onClick={() => select("declined")}
          >
            Decline
          </Button>
          <Button
            className="btn btn-primary"
            onClick={() => select("accepted")}
          >
            Accept
          </Button>
        </aside>
      )}
      <button className="privacy-control" onClick={() => setShow(true)}>
        Cookie preferences
      </button>
    </>
  );
}
