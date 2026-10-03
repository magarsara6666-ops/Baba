import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Activity,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { Actions, Action } from "@/components/actions";
import {
  ServiceGrid,
  CTASection,
  Journey,
  Benefits,
  SectionHeading,
  ConsultationPhoto,
  TrustStrip,
  BlogGrid,
} from "@/components/shared";
import { FAQAccordion } from "@/components/faq";
import { seo } from "@/lib/seo";
export const metadata = seo(
  "Advanced Laser Care & Free Consultation",
  "Professional guidance and treatment options for varicose veins, fistula, fissure and piles. Start with a private, free consultation call.",
  "/",
);
export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="tiny-line" />
              WELCOME TO DEEPSARA SUPER SPECIALITY LASER CLINIC
            </span>
            <h1>
              Advanced Laser Care
              <br />
              <span className="hero-with">with </span>
              <span>
                Professional
                <br />
                Guidance
              </span>
            </h1>
            <p className="hero-lead">
              Get professional consultation and modern treatment options for
              varicose veins, fistula, fissure, and piles/hemorrhoids.
            </p>
            <p className="hero-support">
              Have questions about your symptoms? Start with a free consultation
              call and speak privately with our team about the appropriate next
              steps.
            </p>
            <Actions />
            <div className="hero-secondary">
              <Action kind="whatsapp" />
              <span>
                <Check size={16} />A conversation, without pressure.
              </span>
            </div>
          </div>
          <div className="hero-image-wrap">
            <ConsultationPhoto />
            <div className="hero-image-label">
              <span className="label-icon">
                <ShieldCheck />
              </span>
              <div>
                <strong>Your comfort comes first</strong>
                <span>Private, respectful, patient-focused care</span>
              </div>
            </div>
            <span className="hero-image-corner" aria-hidden="true">
              +
            </span>
          </div>
        </div>
        <TrustStrip />
      </section>
      <section className="section container">
        <div className="section-header-row">
          <SectionHeading
            eyebrow="SPECIALIZED CARE, THOUGHTFULLY DELIVERED"
            title="Our Specialized Treatments"
            text="Professional consultation and modern treatment options tailored to individual patient needs."
          />
          <Link className="text-link" href="/services">
            Explore all services
            <ArrowUpRight size={19} />
          </Link>
        </div>
        <ServiceGrid />
      </section>
      <section className="section soft">
        <div className="container concern-layout">
          <div>
            <span className="eyebrow">YOU DESERVE TO BE HEARD</span>
            <h2>
              Don’t Keep Ignoring
              <br />
              Your Symptoms
            </h2>
            <p>
              Some health concerns can be uncomfortable or difficult to discuss.
              Our team aims to provide a private, respectful environment where
              you can talk about your concerns and understand the available
              options.
            </p>
            <Action>Talk to Our Team</Action>
          </div>
          <div className="concern-grid">
            {[
              [
                Activity,
                "Visible or uncomfortable veins",
                "Heaviness, swelling or concerns about enlarged veins.",
              ],
              [
                HeartPulse,
                "Piles / hemorrhoid symptoms",
                "Questions about itching, swelling or bowel discomfort.",
              ],
              [
                ShieldCheck,
                "Fissure-related discomfort",
                "Pain or discomfort you would like to discuss.",
              ],
              [
                Stethoscope,
                "Fistula-related concerns",
                "Persistent symptoms that deserve professional evaluation.",
              ],
            ].map(([icon, title, text]) => {
              const Icon = icon as typeof Activity;
              return (
                <article key={String(title)}>
                  <Icon />
                  <h3>{title as string}</h3>
                  <p>{text as string}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <CTASection />
      <Journey />
      <Benefits />
      <section className="section container faq-section">
        <SectionHeading
          eyebrow="CLEAR ANSWERS, MORE CONFIDENCE"
          title="A Few Questions You May Have"
          text="You don’t need to have everything figured out before speaking with us."
        />
        <FAQAccordion />
      </section>
      <section className="section soft">
        <div className="container">
          <div className="section-header-row">
            <SectionHeading
              eyebrow="INFORMATION FOR YOUR CARE JOURNEY"
              title="Learn. Understand. Feel Prepared."
            />
            <Link className="text-link" href="/blog">
              Visit our patient resources
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <BlogGrid limit={3} />
        </div>
      </section>
      <CTASection
        title="Your First Step Can Be a Simple Conversation."
        text="Talk to a team that listens. Ask your questions and understand your options."
      />
    </>
  );
}
