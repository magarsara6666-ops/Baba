import { z } from "zod";
export const consultationSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your full name.").max(100),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[\d\s()-]{7,20}$/, "Enter a valid phone number.")
      .refine(
        (v) => v.replace(/\D/g, "").length >= 7,
        "Enter a valid phone number.",
      ),
    email: z.union([
      z.literal(""),
      z.string().email("Enter a valid email address.").max(254),
    ]),
    condition: z.enum(
      ["Varicose Veins", "Fistula", "Fissure", "Piles / Hemorrhoids", "Other"],
      { errorMap: () => ({ message: "Choose your concern." }) },
    ),
    method: z.enum(["Phone", "WhatsApp", "Email"]),
    time: z.string().max(100),
    message: z.string().max(1000, "Keep your message under 1,000 characters."),
    consent: z.literal(true, {
      errorMap: () => ({ message: "Please agree to be contacted." }),
    }),
    website: z.string().max(0),
  })
  .superRefine((data, ctx) => {
    if (data.method === "Email" && !data.email)
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: "Add an email address for email contact.",
      });
  });
