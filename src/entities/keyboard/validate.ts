import * as z from "zod";
export const formKeyboardSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
});

export type FormKeyboardValidateType = z.infer<typeof formKeyboardSchema>;
