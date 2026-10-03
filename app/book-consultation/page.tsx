import { LockKeyhole, MessagesSquare, Check } from "lucide-react";
import { PageHero } from "@/components/shared";
import { ConsultationForm } from "@/components/consultation-form";
import { Action } from "@/components/actions";
import { seo } from "@/lib/seo";
export const metadata = seo(
  "Book a Free Consultation",
  "Request a private, free consultation call for initial guidance about varicose veins, fistula/fissure and piles concerns.",
  "/book-consultation",
);
export default function Booking() {
  return (
    <>
      <PageHero
        title="Book a Free Consultation"
        text="A simple conversation can help you understand the appropriate next steps."
        eyebrow="YOUR CARE JOURNEY STARTS HERE"
      />
      <section className="section container booking-layout">
        <div>
          <div className="booking-icon">
            <MessagesSquare size={35} />
          </div>
          <h2>We’re Here to Listen.</h2>
          <p>
            Speak privately with our team about your concerns and receive
            initial counselling and guidance.
          </p>
          <ul className="symptom-list">
            {[
              "No need to choose a treatment first",
              "Clear guidance about the consultation process",
              "Private and respectful communication",
            ].map((x) => (
              <li key={x}>
                <Check size={18} />
                {x}
              </li>
            ))}
          </ul>
          <div className="care-note">
            <LockKeyhole size={20} />
            <p>
              The free call is for initial guidance. Examinations, tests and
              treatment may have separate fees. Confirm any costs with the
              clinic.
            </p>
          </div>
          <p>Prefer to speak directly?</p>
          <div className="actions">
            <Action kind="call" />
            <Action kind="whatsapp" />
          </div>
          <p className="form-help">
            For urgent or severe symptoms, seek prompt medical care rather than
            waiting for a callback.
          </p>
        </div>
        <ConsultationForm />
      </section>
    </>
  );
}
