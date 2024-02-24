import { useQuery } from "@tanstack/react-query";
import { getFreeKeyboard } from "../api";
import { Data } from "../type";
export const useGetFreeKeyboard = (params: {
  id: number| undefined;
  initialData?: Data;
  enable: boolean,
  stale: number
}) => {
  return useQuery<Data>({
    queryKey: ["free-keyboard", params.id],
    initialData: params?.initialData,
    refetchOnWindowFocus: false,
    enabled: params.enable,
    queryFn: () => params.id? getFreeKeyboard(params.id):new Promise(()=>{})
   ,
  });
};