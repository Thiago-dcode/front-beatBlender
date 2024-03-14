import * as z from "zod";
export const formKeyboardSchema = z.object({
  name: z.string().trim().min(3).max(12),
  description: z.string().trim().min(3).max(100),
  design: z.string().optional(),
});

export type FormKeyboardValidateType = z.infer<typeof formKeyboardSchema>;
