import * as z from "zod";
export const formKeyboardSchema = z.object({
  name: z.string().trim().min(3).max(12),
  description: z.string().trim().min(3).max(100),
  design: z
  .string()
  .transform((value) => (value === '' ? null : value))
  .nullable()
  .refine((value) => value === null || !isNaN(Number(value)), {
    message: '',
  })
  .transform((value) => (value === null ? null : Number(value))),
});

export type FormKeyboardValidateType = z.infer<typeof formKeyboardSchema>;
