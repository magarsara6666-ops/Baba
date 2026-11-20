import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone, Stethoscope } from "lucide-react";
import { PageHero } from "@/components/shared";
import { Action } from "@/components/actions";
import { clinic, phoneHref } from "@/lib/clinic";
import { seo } from "@/lib/seo";

export const metadata = seo(
  "Doctor Profile and Clinic Portfolio",
  "Meet Dr Deepak Thapa Magar and explore Deepsara's laser, speciality and general surgery services.",
  "/portfolio",
);

const serviceGroups = [
  {
    title: "Laser Treatment",
    items: ["Varicose veins", "Piles and fissures", "Fistula", "Hemorrhoids"],
  },
  {
    title: "Speciality Treatment",
    items: ["AV fistula creation"],
  },
  {
    title: "General Surgery",
    items: ["Hernia", "Phimosis", "Appendicitis", "Hydrocele"],
  },
];

export default function Portfolio() {
  return (
    <>
      <PageHero
        eyebrow="DEEPSARA MULTI-SPECIALITY AND LASER CLINIC"
        title="Professional care, guided by experience."
        text="Meet our surgeon and learn about the treatment services available at Deepsara in Bharatpur, Chitwan."
        breadcrumb={[{ label: "Portfolio" }]}
      />

      <section className="section container portfolio-profile">
        <div className="portfolio-photo">
          <Image
            src="/images/dr-deepak-thapa-magar-clinic.png"
            alt="Dr Deepak Thapa Magar in a modern clinic"
            fill
            sizes="(max-width: 700px) 180px, 220px"
            priority
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
        <div className="portfolio-profile-copy">
          <span className="eyebrow">MEET THE SURGEON</span>
          <h2>{clinic.doctorName}</h2>
          <p className="portfolio-credentials">{clinic.qualifications}</p>
          <p className="portfolio-specialty">{clinic.specialization}</p>
          <p>
            Consult with our team about your symptoms, treatment questions and
            appropriate next steps. A clinical evaluation is needed to confirm
            diagnosis and treatment suitability.
          </p>
          <Action>Book a Consultation</Action>
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">AREAS OF CARE</span>
            <h2>Treatment services</h2>
            <p>Professional guidance for common surgical and vascular concerns.</p>
          </div>
          <div className="portfolio-services">
            {serviceGroups.map((group) => (
              <article className="portfolio-service" key={group.title}>
                <span className="portfolio-service-icon"><Stethoscope size={20} /></span>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section container portfolio-contact">
        <div>
          <span className="eyebrow">VISIT DEEPSARA</span>
          <h2>Start with a private conversation.</h2>
          <p>Share your concern and our team will guide you about the next appropriate step.</p>
          <Action>Request a Consultation</Action>
        </div>
        <div className="portfolio-contact-list">
          <p><MapPin size={18} /> {clinic.address}</p>
          <p><Phone size={18} /> <a href={phoneHref}> {clinic.phone}</a></p>
          <p><Mail size={18} /> <a href={`mailto:${clinic.email}`}>{clinic.email}</a></p>
          <Link className="text-link" href="/contact">Contact the clinic <ArrowUpRight size={18} /></Link>
        </div>
      </section>
    </>
  );
}
