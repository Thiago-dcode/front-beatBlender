import * as z from "zod";
export const formRegisterSchema = z
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
export type FormRegisterValidateType = z.infer<typeof formRegisterSchema>;
export const formLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type FormLoginValidateType = z.infer<typeof formLoginSchema>;
