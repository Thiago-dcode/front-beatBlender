import { useQuery } from "@tanstack/react-query";
import { getFreeKeyboard } from "../api";
import { Data } from "../type";
export const useGetFreeKeyboard = (params: {
  name: string | undefined;
  initialData?: Data;
  enable: boolean;
  stale: number;
}) => {
  return useQuery<Data>({
    queryKey: ["free-keyboard", params.name],
    initialData: params?.initialData,
    refetchOnWindowFocus: false,
    enabled: params.enable,
    queryFn: () =>
      params.name ? getFreeKeyboard(params.name) : new Promise(() => {}),
  });
};
