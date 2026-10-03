import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Activity,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  HandHeart,
  MessagesSquare,
  Plus,
  Check,
  LockKeyhole,
} from "lucide-react";
import { clinic, disclaimer } from "@/lib/clinic";
import {
  treatments,
  benefits,
  journey,
  articles,
  type Treatment,
  type Article,
} from "@/lib/content";
import { Action, Actions } from "./actions";
import { Logo } from "./header";
export function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}
export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <Link href="/">Home</Link>
      {items.map((x, i) => (
        <span key={i}>
          <span aria-hidden="true">/</span>
          {x.href ? (
            <Link href={x.href}>{x.label}</Link>
          ) : (
            <span aria-current="page">{x.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
export function PageHero({
  title,
  text,
  eyebrow = "PATIENT-FOCUSED CARE",
  breadcrumb,
  cta = false,
}: {
  title: string;
  text: string;
  eyebrow?: string;
  breadcrumb?: { label: string; href?: string }[];
  cta?: boolean;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <Breadcrumbs items={breadcrumb || [{ label: title }]} />
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{text}</p>
        {cta && <Actions all />}
        <div className="page-hero-symbol" aria-hidden="true">
          <Plus />
        </div>
      </div>
    </section>
  );
}
const icons = [Activity, HeartPulse, ShieldCheck, Stethoscope];
export function ServiceCard({ t, index }: { t: Treatment; index: number }) {
  const Icon = icons[index % 4];
  return (
    <article className={`service-card ${t.color}`}>
      <div className="card-top">
        <span className="icon-box">
          <Icon size={27} />
        </span>
        <span className="card-number">0{index + 1}</span>
      </div>
      <h3>{t.name}</h3>
      <p>{t.description}</p>
      <Link className="text-link" href={`/services/${t.slug}`}>
        Learn More
        <ArrowUpRight size={18} />
      </Link>
      <Action className="card-book">Book Consultation</Action>
    </article>
  );
}
export function ServiceGrid() {
  return (
    <div className="service-grid">
      {treatments.map((t, i) => (
        <ServiceCard key={t.slug} t={t} index={i} />
      ))}
    </div>
  );
}

export function TreatmentComfort() {
  const items = [
    [
      HandHeart,
      "Less Discomfort",
      "Some procedures may involve less discomfort than traditional surgery.",
    ],
    [
      ShieldCheck,
      "Smaller Scars",
      "Smaller cuts may mean smaller scars, depending on the procedure.",
    ],
    [
      Activity,
      "Shorter Hospital Stay",
      "Many suitable procedures are day care or need only a short hospital stay.",
    ],
  ] as const;

  return (
    <section className="comfort-section" aria-labelledby="comfort-heading">
      <div className="comfort-intro">
        <span className="eyebrow">
          WHEN MINIMALLY INVASIVE TREATMENT IS SUITABLE
        </span>
        <h2 id="comfort-heading">Treatment Designed Around Your Comfort</h2>
        <p>Some modern procedures may offer:</p>
      </div>
      <div className="comfort-grid">
        {items.map(([Icon, title, text]) => (
          <article key={title}>
            <span className="comfort-icon" aria-hidden="true">
              <Icon size={22} />
            </span>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
        <p className="comfort-note">
          Your clinician will explain what is suitable for you. Treatment and
          recovery vary from person to person.
        </p>
      </div>
    </section>
  );
}
export function CTASection({
  title = "Not Sure What to Do Next?",
  text = "If you're experiencing symptoms related to varicose veins, fistula, fissure, or piles/hemorrhoids, speak with our team.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="container cta-wrap">
      <div className="cta-section">
        <div>
          <span className="eyebrow">LET’S TALK ABOUT YOUR CARE</span>
          <h2>{title}</h2>
          <p>{text}</p>
          <p>
            Book a free consultation call for initial counselling and guidance
            about the appropriate next steps.
          </p>
          <Actions all />
          <span className="trust-line">
            <LockKeyhole size={15} /> Private · Respectful · Confidential
          </span>
        </div>
        <div className="cta-art" aria-hidden="true">
          <MessagesSquare />
          <span>
            Here to listen.
            <br />
            Here to help.
          </span>
        </div>
      </div>
    </section>
  );
}
export function Journey() {
  return (
    <section className="section container">
      <SectionHeading
        eyebrow="A CLEAR PATH FORWARD"
        title="Your Consultation Journey"
        text="One conversation at a time, with guidance at every step."
      />
      <div className="journey-grid">
        {journey.map(([title, text], i) => (
          <div key={title}>
            <span className="step">0{i + 1}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
      <div className="center-action">
        <Action>Start With a Free Consultation</Action>
      </div>
    </section>
  );
}
export function Benefits() {
  const icon = [
    Stethoscope,
    Activity,
    LockKeyhole,
    HandHeart,
    MessagesSquare,
    HeartPulse,
  ];
  return (
    <section className="section soft">
      <div className="container">
        <SectionHeading
          eyebrow="CARE BUILT AROUND YOU"
          title="Why Choose Deepsara Super Speciality Laser Clinic?"
        />
        <div className="benefit-grid">
          {benefits.map(([title, text], i) => {
            const Icon = icon[i];
            return (
              <article key={title}>
                <Icon />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export function BlogCard({
  article,
  index = 0,
}: {
  article: Article;
  index?: number;
}) {
  return (
    <article className="blog-card">
      <Link
        tabIndex={-1}
        aria-hidden="true"
        href={`/blog/${article.slug}`}
        className={`blog-art art-${index % 3}`}
      >
        <span>{article.category}</span>
        {index % 3 === 0 ? (
          <Stethoscope />
        ) : index % 3 === 1 ? (
          <HeartPulse />
        ) : (
          <MessagesSquare />
        )}
      </Link>
      <div className="blog-body">
        <span className="eyebrow">{article.category}</span>
        <h3>
          <Link href={`/blog/${article.slug}`}>{article.title}</Link>
        </h3>
        <p>{article.excerpt}</p>
        <div className="blog-bottom">
          <time dateTime={article.date}>03 October 2026</time>
          <Link
            href={`/blog/${article.slug}`}
            aria-label={`Read ${article.title}`}
          >
            Read More <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </article>
  );
}
export function BlogGrid({ limit }: { limit?: number }) {
  return (
    <div className="blog-grid">
      {articles.slice(0, limit).map((a, i) => (
        <BlogCard key={a.slug} article={a} index={i} />
      ))}
    </div>
  );
}
export function DoctorCard() {
  return (
    <article className="doctor-card">
      <div className="doctor-photo">
        <Image
          src="/images/dr-deepak-thapa-magar-clinic.png"
          alt="Dr Deepak Thapa Magar in a modern clinic"
          fill
          sizes="(max-width: 640px) 100vw, 280px"
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />
      </div>
      <div>
        <span className="eyebrow">MEET OUR MEDICAL TEAM</span>
        <h3>{clinic.doctorName}</h3>
        <p>{clinic.qualifications}</p>
        <p>{clinic.specialization}</p>
        {clinic.experience && <p>{clinic.experience}</p>}
      </div>
    </article>
  );
}
export function ConsultationPhoto({ className = "" }: { className?: string }) {
  return (
    <div className={`consultation-photo ${className}`}>
      <Image
        src="/images/dr-deepak-thapa-magar-clinic.png"
        alt="Dr Deepak Thapa Magar in a modern clinic"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
    </div>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Logo />
            <p>
              Professional consultation and modern treatment options. Thoughtful
              care starts with listening.
            </p>
            <Action />
          </div>
          <div>
            <h3>Quick Links</h3>
            {[
              ["Home", "/"],
              ["About Us", "/about"],
              ["Services", "/services"],
              ["Blog", "/blog"],
              ["Contact", "/contact"],
            ].map(([a, b]) => (
              <Link key={a} href={b}>
                {a}
              </Link>
            ))}
          </div>
          <div>
            <h3>Our Treatments</h3>
            {treatments.map((t) => (
              <Link key={t.slug} href={`/services/${t.slug}`}>
                {t.short}
              </Link>
            ))}
          </div>
          <div>
            <h3>Contact & Visit</h3>
            <p>{clinic.phone || "[ADD PHONE NUMBER]"}</p>
            <p>WhatsApp: {clinic.whatsapp || "[ADD WHATSAPP NUMBER]"}</p>
            <p>{clinic.email || "[ADD EMAIL]"}</p>
            <p>{clinic.address || "[ADD CLINIC ADDRESS]"}</p>
            <p>{clinic.openingHours || "[ADD OPENING HOURS]"}</p>
          </div>
        </div>
        <div id="medical-disclaimer" className="disclaimer">
          <strong>Medical disclaimer</strong>
          <p>{disclaimer}</p>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {clinic.name}
          </span>
          <div>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <a href="#medical-disclaimer">Medical Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
export function TestimonialsSection({
  testimonials = [],
}: {
  testimonials?: { quote: string; name: string; approved: boolean }[];
}) {
  const approved = testimonials.filter((t) => t.approved);
  if (!approved.length) return null;
  return (
    <section className="section container">
      <SectionHeading
        eyebrow="PATIENT EXPERIENCES"
        title="Shared With Permission"
      />
      {approved.map((t) => (
        <blockquote key={t.name}>
          {t.quote}
          <cite>{t.name}</cite>
        </blockquote>
      ))}
    </section>
  );
}
export function TrustStrip() {
  return (
    <div className="trust-strip container">
      {[
        [ShieldCheck, "Private Consultation"],
        [Stethoscope, "Professional Guidance"],
        [HandHeart, "Patient-Focused Care"],
      ].map(([Icon, title]) => {
        const I = Icon as typeof Check;
        return (
          <div key={String(title)}>
            <I size={24} />
            <span>{title as string}</span>
          </div>
        );
      })}
    </div>
  );
}
