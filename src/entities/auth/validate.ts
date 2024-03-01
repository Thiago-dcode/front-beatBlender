import * as z from "zod";
export const formSchema = z
  .object({
    email: z.string().email(),
    username: z.string().min(5),
    password: z.string().min(8),
    passwordConfirm: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: "Passwords do not match",
      path: ["passwordConfirm"],
    }
  );

export type FormValidateType = z.infer<typeof formSchema>;
