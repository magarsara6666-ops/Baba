import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { PageHero } from "@/components/shared";
import { Action, Actions } from "@/components/actions";
import { ConsultationForm } from "@/components/consultation-form";
import { clinic, phoneHref, whatsappHref } from "@/lib/clinic";
import { seo } from "@/lib/seo";
export const metadata = seo(
  "Contact Us",
  "Contact Deepsara Super Speciality and Laser Clinic to discuss your concerns or request a free consultation call.",
  "/contact",
);
export default function Contact() {
  const contactItems = [
    {
      icon: Phone,
      title: "Phone",
      value: clinic.phone || "[ADD PHONE NUMBER]",
      href: phoneHref,
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: clinic.whatsapp || "[ADD WHATSAPP NUMBER]",
      href: whatsappHref,
      external: true,
    },
    {
      icon: Mail,
      title: "Email",
      value: clinic.email || "[ADD EMAIL]",
      href: clinic.email ? `mailto:${clinic.email}` : "",
    },
    {
      icon: MapPin,
      title: "Clinic Address",
      value: clinic.address || "[ADD CLINIC ADDRESS]",
      href: "",
    },
    {
      icon: Clock,
      title: "Opening Hours",
      value: clinic.openingHours || "[ADD OPENING HOURS]",
      href: "",
    },
  ];

  return (
    <>
      <PageHero
        title="We’re Ready to Help"
        text={`Have questions about our services or want to understand your treatment options? Contact ${clinic.name} and speak with our team.`}
      />
      <section className="section container">
        <div className="contact-grid">
          {contactItems.map(({ icon: Icon, title, value, href, external }) => {
            return (
              <article className="contact-card" key={title}>
                <Icon />
                <h2>{title}</h2>
                <p>
                  {href ? (
                    <a
                      href={href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </p>
                {value.startsWith("[") && (
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
