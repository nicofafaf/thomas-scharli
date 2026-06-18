import { z } from "zod";

export const reviewSchema = z.object({
  author_name: z
    .string()
    .trim()
    .min(2, "Bitte geben Sie Ihren Namen an (min. 2 Zeichen)."),
  company: z.string().trim().max(120, "Firmenname ist zu lang.").optional().or(z.literal("")),
  email: z
    .string()
    .trim()
    .min(1, "Bitte geben Sie Ihre E-Mail-Adresse an.")
    .email("Bitte geben Sie eine gültige E-Mail-Adresse ein."),
  rating: z
    .number({ invalid_type_error: "Bitte wählen Sie eine Bewertung." })
    .int()
    .min(1, "Bitte vergeben Sie mindestens einen Stern.")
    .max(5),
  comment: z
    .string()
    .trim()
    .min(20, "Ihr Kommentar sollte mindestens 20 Zeichen lang sein."),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;
