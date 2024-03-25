import { z } from "zod";

export const formKeyCreateSchema = z.object({
  key: z.string().toLowerCase(),
  displayName: z.string().optional(),
  soundId: z.coerce.number().optional(),
  order: z.coerce.number().optional(),
  bgColor: z.string().optional(),
  keyColor: z.string().optional()
});

export type FormKeyValidateType = z.infer<typeof formKeyCreateSchema>;

