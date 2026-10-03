import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { PageHero } from "@/components/shared";
import { Action, Actions } from "@/components/actions";
import { ConsultationForm } from "@/components/consultation-form";
import { clinic } from "@/lib/clinic";
import { seo } from "@/lib/seo";
export const metadata = seo(
  "Contact Us",
  "Contact Deepsara Super Speciality Laser Clinic to discuss your concerns or request a free consultation call.",
  "/contact",
);
export default function Contact() {
  return (
    <>
      <PageHero
        title="We’re Ready to Help"
        text={`Have questions about our services or want to understand your treatment options? Contact ${clinic.name} and speak with our team.`}
      />
      <section className="section container">
        <div className="contact-grid">
          {[
            [Phone, "Phone", clinic.phone || "[ADD PHONE NUMBER]"],
            [
              MessageCircle,
              "WhatsApp",
              clinic.whatsapp || "[ADD WHATSAPP NUMBER]",
            ],
            [Mail, "Email", clinic.email || "[ADD EMAIL]"],
            [
              MapPin,
              "Clinic Address",
              clinic.address || "[ADD CLINIC ADDRESS]",
            ],
            [
              Clock,
              "Opening Hours",
              clinic.openingHours || "[ADD OPENING HOURS]",
            ],
          ].map(([icon, title, value]) => {
            const Icon = icon as typeof Phone;
            return (
              <article className="contact-card" key={String(title)}>
                <Icon />
                <h2>{title as string}</h2>
                <p>
                  {title === "Email" && clinic.email ? (
                    <a href={`mailto:${clinic.email}`}>{value as string}</a>
                  ) : (
                    (value as string)
                  )}
                </p>
                {String(value).startsWith("[") && (
                  <small>
                    Verified details will be added before public launch.
                  </small>
                )}
              </article>
            );
          })}
        </div>
        <div className="contact-actions">
          <Actions all />
          <Action kind="directions" />
        </div>
        {(!clinic.phone || !clinic.whatsapp) && (
          <p className="care-note" role="status">
            Direct phone and WhatsApp contact will be available when the clinic
            supplies its verified numbers.
          </p>
        )}
      </section>
      <section className="section soft">
        <div className="container contact-form-layout">
          <div>
            <span className="eyebrow">A PRIVATE CONVERSATION</span>
            <h2>
              Let’s Find Your
              <br />
              Next Step.
            </h2>
            <p>
              Request a callback at a time that works for you. Initial
              counselling can help you understand the consultation process and
              appropriate next steps.
            </p>
            <div className="map-container">
              {clinic.mapsEmbedUrl &&
              /^https:\/\/www.google.com\/maps\/embed/.test(
                clinic.mapsEmbedUrl,
              ) ? (
                <iframe
                  src={clinic.mapsEmbedUrl}
                  title="Clinic location on Google Maps"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <>
                  <MapPin size={40} />
                  <h3>Visit Our Clinic</h3>
                  <p>[ADD VERIFIED CLINIC LOCATION]</p>
                  <p>
                    A Google Map will appear here once the location is
                    confirmed.
                  </p>
                </>
              )}
            </div>
          </div>
          <ConsultationForm />
        </div>
      </section>
    </>
  );
}
