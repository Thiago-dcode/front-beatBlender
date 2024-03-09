import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { formKeyboardSchema, FormKeyboardValidateType } from "../validate";

const defaultValues = {
  name: "",
  description: "",
  design: undefined,
};
export function useKeyboardForm() {
  return useForm<FormKeyboardValidateType>({
    resolver: zodResolver(formKeyboardSchema),
    defaultValues,
  });
}

type formValues = "username" | "password" | `root.${string}`;

export function isFormValue(value: any): value is formValues {
  return (
    ["username", "password"].includes(value) ||
    (typeof value === "string" && value.startsWith("root."))
  );
}
