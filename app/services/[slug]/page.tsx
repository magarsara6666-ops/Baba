import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ShieldCheck } from "lucide-react";
import { PageHero, CTASection, SectionHeading } from "@/components/shared";
import { Action } from "@/components/actions";
import { FAQAccordion } from "@/components/faq";
import { ViewEvent } from "@/components/interactive";
import { treatments, generalFAQs } from "@/lib/content";
import { seo, JsonLd } from "@/lib/seo";
import { clinic } from "@/lib/clinic";
export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = treatments.find((t) => t.slug === slug);
  return t
    ? seo(t.name, t.description, `/services/${slug}`)
    : { title: "Service not found" };
}
export default async function TreatmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = treatments.find((t) => t.slug === slug);
  if (!t) notFound();
  const sections = [
    [
      "overview",
      `What ${slug === "varicose-veins" ? "are varicose veins" : slug === "fistula" ? "is an anal fistula" : slug === "fissure" ? "is an anal fissure" : "are hemorrhoids / piles"}?`,
      t.definition,
    ],
    ["causes", "Possible Causes & Risk Factors", t.causes],
    ["evaluation", "How Is the Condition Evaluated?", t.evaluation],
    ["approaches", "Available Treatment Approaches", t.approaches],
    ["laser", "Laser-Based Treatment: Is It Appropriate?", t.laser],
    [
      "expect",
      "What to Expect",
      "Before any procedure, ask your clinician to explain the recommendation, alternatives, anaesthesia, preparation, costs and potential complications. You should have time to ask questions and give informed consent.",
    ],
    [
      "recovery",
      "Recovery & Follow-Up",
      "Your recovery plan depends on the condition and procedure. The clinical team should explain activity, wound care if applicable, medicines, warning signs and follow-up. Recovery and outcomes vary; a fixed timeline cannot be promised.",
    ],
  ];
  return (
    <>
      <ViewEvent event="service_view" slug={slug} />
      <PageHero
        title={t.name}
        text={t.description}
        eyebrow="SPECIALIZED CARE · INDIVIDUAL GUIDANCE"
        breadcrumb={[
          { label: "Services", href: "/services" },
          { label: t.short },
        ]}
        cta
      />
      <section className="section container treatment-layout">
        <aside className="treatment-sidebar">
          <span className="eyebrow">ON THIS PAGE</span>
          {sections.map(([id, title]) => (
            <a href={`#${id}`} key={id}>
              {title}
            </a>
          ))}
          <a href="#symptoms">Common Symptoms</a>
          <a href="#faq">Frequently Asked Questions</a>
          <div className="sidebar-help">
            <ShieldCheck />
            <h3>Talk privately with us.</h3>
            <p>You can ask questions before deciding on the next step.</p>
            <Action />
          </div>
        </aside>
        <div className="treatment-content">
          {sections.map(([id, title, text], i) => (
            <div key={id}>
              <section id={id}>
                <h2>{title}</h2>
                <p>{text}</p>
              </section>
              {i === 0 && (
                <section id="symptoms">
                  <h2>Common Symptoms</h2>
                  <ul className="symptom-list">
                    {t.symptoms.map((s) => (
                      <li key={s}>
                        <Check size={18} />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <p className="care-note">
                    These symptoms can have different causes. This information
                    cannot diagnose your condition.
                  </p>
                </section>
              )}
              {i === 1 && (
                <section className="medical-note">
                  <h2>When to Seek Medical Advice</h2>
                  <p>{t.urgent}</p>
                  <p>
                    For urgent or severe symptoms, seek prompt medical care or
                    appropriate local emergency services. Do not wait for a
                    consultation callback.
                  </p>
                </section>
              )}
            </div>
          ))}
          {slug === "fissure" && (
            <section>
              <h2>General Prevention & Care Information</h2>
              <p>
                Discuss bowel habits and stool-softening measures with your
                healthcare professional. Ask which changes are suitable for you
                and when to return if discomfort continues.
              </p>
            </section>
          )}
          {slug === "piles-hemorrhoids" && (
            <section className="compassion-note">
              <h2>A Private, Respectful Conversation</h2>
              <p>
                You don’t need to feel embarrassed about discussing your
                concerns. Our team provides a private and respectful environment
                where you can ask questions and understand your options.
              </p>
              <h3>Types of Hemorrhoids</h3>
              <p>
                Internal hemorrhoids develop inside the anal canal. External
                hemorrhoids affect the area around the opening. A professional
                examination helps identify the cause of symptoms.
              </p>
            </section>
          )}
          <section id="faq">
            <SectionHeading
              eyebrow="YOUR QUESTIONS ANSWERED"
              title="Frequently Asked Questions"
            />
            <FAQAccordion
              items={[
                [
                  `How do I know which ${t.short.toLowerCase()} treatment I need?`,
                  "A qualified healthcare professional needs to assess your condition. Your symptoms, medical history and examination findings guide the recommendation.",
                ],
                ...generalFAQs,
              ]}
            />
          </section>
          <p className="source-note">
            Educational reference:{" "}
            <a href={t.source} target="_blank" rel="noopener noreferrer">
              NHS: {t.short}
            </a>
            . Clinic-specific procedures and suitability must be confirmed with
            the medical team.
          </p>
          <Link className="text-link" href="/services">
            Explore our other services →
          </Link>
        </div>
      </section>
      <CTASection
        title={
          slug === "varicose-veins"
            ? "Concerned About Varicose Veins?"
            : slug === "fistula"
              ? "Have Questions About Fistula Treatment?"
              : slug === "fissure"
                ? "Experiencing Pain or Discomfort?"
                : "Have Questions About Piles / Hemorrhoids?"
        }
        text="Speak privately with our team and learn about the appropriate next steps."
      />
      {clinic.websiteUrl && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: clinic.websiteUrl,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: `${clinic.websiteUrl}/services`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: t.name,
                item: `${clinic.websiteUrl}/services/${slug}`,
              },
            ],
          }}
        />
      )}
    </>
  );
}
