import {
  PageHero,
  ServiceGrid,
  Journey,
  CTASection,
} from "@/components/shared";
import { seo } from "@/lib/seo";
export const metadata = seo(
  "Specialized Treatment & Care",
  "Explore consultation and treatment options for varicose veins, fistula, fissure and piles/hemorrhoids at Deepsara.",
  "/services",
);
export default function Services() {
  return (
    <>
      <PageHero
        title="Specialized Treatment & Care"
        text="Explore consultation and treatment options available at Deepsara Super Speciality Laser Clinic."
      />
      <section className="section container">
        <ServiceGrid />
        <p className="care-note">
          Treatment plans depend on professional evaluation. Laser-based
          treatment is considered where clinically appropriate, alongside other
          available approaches.
        </p>
      </section>
      <Journey />
      <CTASection />
    </>
  );
}
