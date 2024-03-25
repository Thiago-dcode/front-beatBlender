import { useForm } from "react-hook-form";
import { FormKeyValidateType, formKeyCreateSchema } from "../validate";
import { zodResolver } from "@hookform/resolvers/zod";

const defaultValues = {
  key: "",
  displayName: undefined,
  soundId: undefined,
  order: undefined,
  bgColor: undefined,
  keyColor: undefined,
};
export function useKeyForm() {
  return useForm<FormKeyValidateType>({
    resolver: zodResolver(formKeyCreateSchema),
    defaultValues,
  });
}
