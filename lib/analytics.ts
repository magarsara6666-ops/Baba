export type AnalyticsEvent =
  | "book_consultation_click"
  | "call_click"
  | "whatsapp_click"
  | "consultation_form_start"
  | "consultation_form_submit"
  | "service_view"
  | "blog_view"
  | "directions_click";
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}
export function track(
  event: AnalyticsEvent,
  details: Record<string, string> = {},
) {
  if (
    typeof window === "undefined" ||
    localStorage.getItem("deepsara-analytics-consent") !== "accepted"
  )
    return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...details });
  window.gtag?.("event", event, details);
  window.fbq?.("trackCustom", event, details);
}
