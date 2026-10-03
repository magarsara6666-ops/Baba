import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/shared";
import {
  AIChatButton,
  MobileStickyCTA,
  AnalyticsConsent,
} from "@/components/interactive";
import { clinic } from "@/lib/clinic";
import { JsonLd } from "@/lib/seo";
export const metadata: Metadata = {
  title: {
    default: "Deepsara Super Speciality Laser Clinic",
    template: "%s | Deepsara",
  },
  description:
    "Professional consultation and modern treatment options for varicose veins, fistula, fissure and piles/hemorrhoids.",
  icons: { icon: "/favicon.svg" },
  ...(clinic.websiteUrl ? { metadataBase: new URL(clinic.websiteUrl) } : {}),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <AIChatButton />
        <MobileStickyCTA />
        <AnalyticsConsent />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "MedicalClinic",
            name: clinic.name,
            ...(clinic.websiteUrl ? { url: clinic.websiteUrl } : {}),
            ...(clinic.phone ? { telephone: clinic.phone } : {}),
            ...(clinic.address ? { address: clinic.address } : {}),
            medicalSpecialty: ["Vascular", "Colorectal"],
          }}
        />
        {clinic.websiteUrl && (
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: clinic.name,
              url: clinic.websiteUrl,
            }}
          />
        )}
      </body>
    </html>
  );
}
