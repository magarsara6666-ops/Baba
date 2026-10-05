import { PageHero } from "@/components/shared";
import { clinic } from "@/lib/clinic";
import { seo } from "@/lib/seo";
export const metadata = seo(
  "Privacy Policy",
  "Learn how consultation requests, optional analytics and contact preferences are handled on the Deepsara website.",
  "/privacy-policy",
);
export default function Privacy() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        text="How information submitted through this website is handled."
      />
      <article className="section container article">
        <p>
          Last updated: 05 October 2026. This policy describes how information
          submitted through the website is handled. The clinic is responsible
          for reviewing its retention periods and applicable legal requirements.
        </p>
        <section>
          <h2>Who Handles Your Information</h2>
          <p>
            {clinic.name} is responsible for consultation enquiries. Contact:{" "}
            {clinic.email || "[ADD PRIVACY CONTACT EMAIL]"}; address:{" "}
            {clinic.address || "[ADD CLINIC ADDRESS]"}.
          </p>
        </section>
        <section>
          <h2>Information You Choose to Provide</h2>
          <p>
            The consultation form requests your name, age, sex, address, phone
            number, optional email, a brief problem or concern, contact
            preference and preferred time. Do not submit medical records,
            identity documents or detailed medical history.
          </p>
        </section>
        <section>
          <h2>Why We Use It</h2>
          <p>
            With your consent, enquiry information is used to contact you about
            your consultation request and next steps. This form does not confirm
            an appointment and does not subscribe you to marketing.
          </p>
        </section>
        <section>
          <h2>Delivery and Service Providers</h2>
          <p>
            The form sends your request over an encrypted connection to
            FormSubmit, which emails it to the clinic at {clinic.email}. The
            form shows confirmation only after the delivery service accepts the
            request. If delivery is unavailable, the form displays an error.
          </p>
        </section>
        <section>
          <h2>Retention and Your Choices</h2>
          <p>
            The clinic should retain enquiries only as long as needed to respond
            and meet applicable requirements. FormSubmit may temporarily retain
            submissions under its own service terms. You can contact the clinic
            to request access, correction, deletion or withdrawal of contact
            consent, subject to applicable requirements.
          </p>
        </section>
        <section>
          <h2>Optional Analytics</h2>
          <p>
            Optional analytics are enabled only when you accept them and
            verified tracking IDs are configured. Events measure actions such as
            consultation clicks, call clicks and form submissions. Names, phone
            numbers, emails and messages are never included in analytics events.
            A preference is stored in your browser. You can reopen cookie
            preferences at the bottom of the page.
          </p>
        </section>
        <section>
          <h2>Third-Party Services</h2>
          <p>
            FormSubmit, WhatsApp, maps and external educational references have
            their own privacy policies. Clicking external links can take you
            outside this website. A configured embedded Google Map may send
            connection information to Google.
          </p>
        </section>
        <section>
          <h2>Security</h2>
          <p>
            The form validates requests before delivery. Access controls for the
            destination email account and retention arrangements remain the
            clinic’s responsibility. Avoid sharing medical records or highly
            sensitive information through this general enquiry form.
          </p>
        </section>
        <section>
          <h2>Children and Urgent Care</h2>
          <p>
            A parent or guardian should make enquiries for children. This
            website is not an emergency service. Seek prompt medical care or
            local emergency services for urgent or severe symptoms.
          </p>
        </section>
      </article>
    </>
  );
}
