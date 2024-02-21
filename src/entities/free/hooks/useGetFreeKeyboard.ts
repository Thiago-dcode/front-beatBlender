import { useQuery } from "@tanstack/react-query";
import { getFreeKeyboard } from "../api";
import { Data } from "../type";
export const useGetFreeKeyboard = (params: {
  id: number;
  initialData?: Data;
}) => {
  return useQuery<Data>({
    queryKey: ["free-keyboard", params.id],
    initialData: params?.initialData,
    queryFn: () => getFreeKeyboard(params.id),
  });
};
