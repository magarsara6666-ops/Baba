export const clinic = {
  name: "Deepsara Super Speciality and Laser Clinic",
  phone: process.env.NEXT_PUBLIC_CLINIC_PHONE || "9855087612",
  whatsapp: process.env.NEXT_PUBLIC_CLINIC_WHATSAPP || "9855087612",
  email:
    process.env.NEXT_PUBLIC_CLINIC_EMAIL || "deepsaraclinic@gmail.com",
  address:
    process.env.NEXT_PUBLIC_CLINIC_ADDRESS ||
    "Balmandir Road, Bharatpur-10, Chitwan",
  openingHours:
    process.env.NEXT_PUBLIC_CLINIC_HOURS ||
    "Morning: 7:00–8:00 AM · Evening: 5:00–7:00 PM",
  websiteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://deepsara-laser-clinic.margaretmoorex102.chatgpt.site",
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
const whatsappDigits = clinic.whatsapp.replace(/\D/g, "");
const whatsappInternational = /^9[678]\d{8}$/.test(whatsappDigits)
  ? `977${whatsappDigits}`
  : whatsappDigits;
export const whatsappHref = /^\+?[\d\s()-]{7,20}$/.test(clinic.whatsapp)
  ? `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(contactMessage)}`
  : "";
