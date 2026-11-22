import type { Metadata } from "next";
import Script from "next/script";
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
    default: "Deepsara Super Speciality and Laser Clinic",
    template: "%s | Deepsara",
  },
  description:
    "Professional consultation and modern treatment options for varicose veins, fistula/fissure and piles/hemorrhoids.",
  icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
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
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);
t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1078528721881531');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1078528721881531&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
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
