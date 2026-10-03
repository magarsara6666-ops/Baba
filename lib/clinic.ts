export const clinic = {
  name: "Deepsara Super Speciality and Laser Clinic",
  phone: process.env.NEXT_PUBLIC_CLINIC_PHONE || "",
  whatsapp: process.env.NEXT_PUBLIC_CLINIC_WHATSAPP || "",
  email: process.env.NEXT_PUBLIC_CLINIC_EMAIL || "",
  address: process.env.NEXT_PUBLIC_CLINIC_ADDRESS || "",
  openingHours: process.env.NEXT_PUBLIC_CLINIC_HOURS || "",
  websiteUrl: process.env.NEXT_PUBLIC_SITE_URL || "",
  googleMapsUrl: process.env.NEXT_PUBLIC_MAPS_URL || "",
  mapsEmbedUrl: process.env.NEXT_PUBLIC_MAPS_EMBED_URL || "",
  doctorName: "Dr Deepak Thapa Magar",
  specialization: "General, Thoracic & Vascular Surgeon",
  qualifications: "MBBS, MS, MCh",
  experience: "",
  socialMedia: [] as { label: string; url: string }[],
};
export const disclaimer =
  "The information provided on this website is for general informational purposes and is not a substitute for professional medical advice, diagnosis, or treatment. Treatment suitability, risks, recovery, and outcomes vary between patients. Consult a qualified healthcare professional for advice about your individual circumstances.";
export const contactMessage = `Hello ${clinic.name}. I would like to know more about your treatment services and book a free consultation.`;
export const phoneHref =
  clinic.phone && /^\+?[\d\s()-]{7,20}$/.test(clinic.phone)
    ? `tel:${clinic.phone.replace(/[^+\d]/g, "")}`
    : "";
export const whatsappHref = /^\+?[\d\s()-]{7,20}$/.test(clinic.whatsapp)
  ? `https://wa.me/${clinic.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(contactMessage)}`
  : "";
