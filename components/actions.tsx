"use client";
import Link from "next/link";
import { ArrowUpRight, Phone, MessageCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { clinic, phoneHref, whatsappHref } from "@/lib/clinic";
import { track, type AnalyticsEvent } from "@/lib/analytics";
export function Action({
  kind = "book",
  children,
  className = "",
}: {
  kind?: "book" | "call" | "whatsapp" | "directions";
  children?: React.ReactNode;
  className?: string;
}) {
  const config = {
    book: {
      href: "/book-consultation",
      event: "book_consultation_click",
      Icon: ArrowUpRight,
      label: "Book Free Consultation",
    },
    call: {
      href: phoneHref,
      event: "call_click",
      Icon: Phone,
      label: "Call Us Now",
    },
    whatsapp: {
      href: whatsappHref,
      event: "whatsapp_click",
      Icon: MessageCircle,
      label: "WhatsApp Us",
    },
    directions: {
      href: clinic.googleMapsUrl,
      event: "directions_click",
      Icon: MapPin,
      label: "Get Directions",
    },
  }[kind];
  const { Icon } = config;
  if (!config.href)
    return (
      <Button
        asChild
        className={`btn ${kind === "book" ? "btn-primary" : "btn-outline"} ${className}`}
      >
        <Link href={`/contact?unavailable=${kind}`}>
          <Icon size={17} />
          {children || config.label}
        </Link>
      </Button>
    );
  return (
    <Button
      asChild
      className={`btn ${kind === "book" ? "btn-primary" : "btn-outline"} ${className}`}
    >
      <Link
        href={config.href}
        onClick={() => track(config.event as AnalyticsEvent)}
        {...(kind === "whatsapp" || kind === "directions"
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children || config.label}
        <Icon size={17} />
      </Link>
    </Button>
  );
}
export function Actions({ all = false }: { all?: boolean }) {
  return (
    <div className="actions">
      <Action />
      <Action kind="call" />
      {all && <Action kind="whatsapp" />}
    </div>
  );
}
