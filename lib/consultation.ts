import { z } from "zod";
export const consultationSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your full name.").max(100),
    age: z
      .string()
      .trim()
      .regex(
        /^(?:[1-9]|[1-9]\d|1[01]\d|120)$/,
        "Enter an age between 1 and 120.",
      ),
    sex: z.enum(["Female", "Male", "Other", "Prefer not to say"], {
      errorMap: () => ({ message: "Select an option." }),
    }),
    address: z
      .string()
      .trim()
      .min(3, "Enter your address.")
      .max(250, "Keep your address under 250 characters."),
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
    problem: z
      .string()
      .trim()
      .min(2, "Briefly describe your problem or concern.")
      .max(500, "Keep your problem description under 500 characters."),
    method: z.enum(["Phone", "WhatsApp", "Email"]),
    time: z.string().max(100),
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
